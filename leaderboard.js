// Fetch leaderboard data and display it
const leaderboardRef = db.collection("leaderboard").orderBy("score", "desc").limit(100);

leaderboardRef.get().then(snapshot => {
    const rows = snapshot.docs.map((doc, index) => {
        const { name, id, score } = doc.data();
        return `<tr><td>${index + 1}</td><td>${name}</td><td>${id}</td><td>${score}</td></tr>`;
    }).join("");
    document.getElementById("leaderboard-rows").innerHTML = rows;
});
