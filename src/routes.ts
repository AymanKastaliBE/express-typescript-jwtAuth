import express from "express";
import {
  createSessionController,
  getSessionController,
  deleteSessionController,
} from "./controllers/session.controller";
import { requireUser } from "./middleware/requireUser";

export const router = express.Router()

  // login
  router.post("/api/session", createSessionController);
  
  // get the current session
  router.get("/api/get-session", requireUser, getSessionController);
  
  // logout
  router.delete("/api/delete-session", requireUser, deleteSessionController);

