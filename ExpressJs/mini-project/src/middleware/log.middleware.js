import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const logMiddleware = (req, res, next) => {
  const log = `[${new Date()}] ${req.method} ${req.url}\n`;
  const logFile = path.join(__dirname, "../logs/request.log");

  fs.appendFile(logFile, log, (err) => {
    if (err) console.error(`Failed to log request`, err);
  });

  next();
};
