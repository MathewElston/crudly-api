import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello peepoo");
});

const PORT = process.env.API_SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
