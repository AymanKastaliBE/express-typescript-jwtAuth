import express from "express";
import { router } from './routes'
import cookieParser from "cookie-parser";
import deserializeUser from "./middleware/deserializeUser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);
app.use(router)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on PORT:${port}`);
});
