import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { logMiddleware } from "./middleware/log.middleware.js";
import PublicRoutes from "./routes/public.routes.js";
import privateRoutes from "./routes/private.routes.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (!fs.existsSync(path.join(__dirname, "logs"))) {
  fs.mkdirSync(path.join(__dirname, "logs"));
}

app.use(logMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to logger api🔥");
});

app.use("/api/v1/public", PublicRoutes);
app.use("/api/v1/private", privateRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
