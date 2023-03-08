import { Request, Response } from "express";
import { createSession, getUser, invalidateSession } from "../db";
import { signJWT } from "../utils/jwt.utils";

// login Controller
export function createSessionController(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = getUser(email);

  if (!user || user.password !== password) {
    return res.status(401).send("Invalid email or password");
  }

  const session = createSession(email, user.name);

  // create access token
  const accessToken = signJWT(
    { email: user.email, name: user.name, sessionId: session.sessionId },
    "10s"
  );

  const refreshToken = signJWT({ sessionId: session.sessionId }, "20s");

  // set access token in cookie
  res.cookie("accessToken", accessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
  });

  // send user back
  return res.send(session);
}

// get the session session
export function getSessionController(req: Request, res: Response) {
  // @ts-ignore
  return res.send(req.user);
}

// log out handler
export function deleteSessionController(req: Request, res: Response) {
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  // @ts-ignore
  const session = invalidateSession(req.user.sessionId);

  return res.send(session);
}
