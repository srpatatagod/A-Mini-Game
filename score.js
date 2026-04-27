let scores = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, score } = req.body;

    const existing = scores.find(p => p.username === username);

    if (existing) {
      existing.score = score;
    } else {
      scores.push({ username, score });
    }

    res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    scores.sort((a, b) => b.score - a.score);
    res.status(200).json(scores);
  }
}
