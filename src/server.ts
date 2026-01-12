import express from "express";

const app = express();

app.use(express.json());

app.get("/api/data", (req, res) => {
  res.json({ message: "Request allowed" });
});

app.listen(3008, () => {
  console.log("Server running on 3008");
});
