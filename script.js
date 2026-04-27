let score = 0;
let username = prompt("Enter your name:");

function addPoint() {
  score++;
  document.getElementById("score").innerText = score;

  fetch("/api/score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, score })
  });
}

async function loadLeaderboard() {
  const res = await fetch("/api/score");
  const data = await res.json();

  const list = document.getElementById("leaderboard");
  list.innerHTML = "";

  data.forEach(player => {
    const li = document.createElement("li");
    li.textContent = player.username + ": " + player.score;
    list.appendChild(li);
  });
}

setInterval(loadLeaderboard, 2000);
