// Game variables
let score = 0;
let questionIndex = 0;
const totalQuestions = 5; // Adjust as needed
let currentStudent = {};

// Questions (images and correct answers)
const questions = [
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtkzZMTh_n9DE3CznuCnA8wVdQI7IQT9sDng&s", answer: "apple" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlLl7Ube9nrVCDvTsMrl2asFiNfNBYzc0A3Q&s", answer: "football" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1_uezKvEshssVMuGfAaPdqCIeqLl8H2_Qjg&s", answer: "tree" },
    { image: "https://static.vecteezy.com/system/resources/thumbnails/002/839/176/small_2x/chemistry-model-of-molecule-water-h2o-scientific-elements-integrated-particles-hydrogen-and-oxygen-natural-inorganic-compound-3d-molecular-structure-illustration-isolated-on-white-background-vector.jpg", answer: "water" },
    { image: "https://media.baamboozle.com/uploads/images/124918/1620234130_36275.jpeg", answer: "mango" },
    { image: "https://media.baamboozle.com/uploads/images/124918/1620231866_32996.jpeg", answer: "boxing" },
    { image: "https://media.baamboozle.com/uploads/images/124918/1620231373_34398.jpeg", answer: "table tennis" },
    { image: "https://media.baamboozle.com/uploads/images/124918/1620232553_33115.jpeg", answer: "Fanta" },
    { image: "https://media.baamboozle.com/uploads/images/124918/1620233341_34098.jpeg", answer: "turkey" },
    { image: "https://media.baamboozle.com/uploads/images/124918/1620233460_35778.jpeg", answer: "monkey" },


    // Add more questions as needed
];

// Start game function
function startGame() {
    const name = document.getElementById("studentName").value;
    const id = document.getElementById("studentID").value;

    if (!name || !id) {
        alert("Please enter your name and ID");
        return;
    }

    currentStudent = { name, id };
    document.getElementById("login-section").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";
    loadQuestion();
}

// Load question
function loadQuestion() {
    if (questionIndex < questions.length) {
        document.getElementById("quizImage").src = questions[questionIndex].image;
        document.getElementById("imageGuess").value = "";
    } else {
        endGame();
    }
}

// Submit answer
function submitAnswer() {
    const guess = document.getElementById("imageGuess").value.trim().toLowerCase();
    if (guess === questions[questionIndex].answer.toLowerCase()) {
        score += 5;
        document.getElementById("score").innerText = `Score: ${score}`;
    }
    questionIndex++;
    loadQuestion();
}

// End game and save score to Firebase
function endGame() {
    document.getElementById("quiz-section").style.display = "none";
    saveScore();
    showLeaderboard();
}

// Save score in Firestore
function saveScore() {
    db.collection("leaderboard").add({
        name: currentStudent.name,
        id: currentStudent.id,
        score: score
    });
}

// Show leaderboard
function showLeaderboard() {
    document.getElementById("leaderboard-section").style.display = "block";
    const leaderboardRef = db.collection("leaderboard").orderBy("score", "desc").limit(10);

    leaderboardRef.get().then(snapshot => {
        const rows = snapshot.docs.map((doc, index) => {
            const { name, id, score } = doc.data();
            return `<tr><td>${index + 1}</td><td>${name}</td><td>${id}</td><td>${score}</td></tr>`;
        }).join("");
        document.getElementById("leaderboard-rows").innerHTML = rows;
    });
}
