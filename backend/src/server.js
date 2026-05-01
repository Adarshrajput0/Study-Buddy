import express from "express";
import { ENV } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

console.log("Mongo URI:", process.env.MONGO_URI);
app.listen(ENV.PORT, () => {
  console.log(`Server running at http://localhost:${ENV.PORT}`);
});
