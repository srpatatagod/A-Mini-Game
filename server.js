import express from "express";

const app = express(); // 👈 ESTO FALTABA
const port = process.env.PORT || 3000;

app.use(express.json());

let scores = [];

app.post("/score", (req, res) => {
  const { username, score } = req.body;

  const existing = scores.find(p => p.username === username);

  if (existing) {
    existing.score = score;
  } else {
    scores.push({ username, score });
  }

  res.json({ success: true });
});

app.get("/score", (req, res) => {
  scores.sort((a, b) => b.score - a.score);
  res.json(scores);
});

// Servir frontend
app.use(express.static("public"));

app.listen(port, () => {
  console.log("Server running on port " + port);
});
