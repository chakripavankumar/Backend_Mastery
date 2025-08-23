import express from "express";
import dotenv from "dotenv";
import { ConnectDb } from "./db";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 1000 * 10 },
  })
);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/user", user);

ConnectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port no http://localhost:${PORT}`);
  });
});
