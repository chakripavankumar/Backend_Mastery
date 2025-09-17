import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("heyyyyyy there ");
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running at port no http://localhost:${PORT}`);
});
    
