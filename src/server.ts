import * as dotenv from "dotenv";
import path = require("path");
import app from "./app";
import express = require("express");

// Setting up the environment
const envPATH = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPATH });

const PORT = Number(process.env.PORT) || 3002;
app.use("/public", express.static(path.join(__dirname, "../public")));
app.listen(PORT, () => console.info(`API app listening on port ${PORT}!`));
