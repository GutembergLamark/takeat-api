import "dotenv/config";
import express from "express";
import "express-async-errors";
import { Request, Response } from "express";
import appRoutes from "../routes";

var cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

appRoutes(app);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello World",
  });
});

export default app;
