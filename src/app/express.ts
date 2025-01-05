import "dotenv/config";
import express from "express";
import "express-async-errors";
import appRoutes from "../routes";

var cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

appRoutes(app);

export default app;
