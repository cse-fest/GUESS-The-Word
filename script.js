// Game variables
let score = 0;
let questionIndex = 0;
const totalQuestions = 5; // Adjust as needed
let currentStudent = {};

// Questions (images and correct answers)
const questions = [
    { image: "https://www.infoworld.com/wp-content/uploads/2024/06/1200px-burmese_python_02-100637340-orig.jpg?quality=50&strip=all", answer: "python" },
    { image: "https://i.pinimg.com/originals/5d/55/dc/5d55dccc5a2aa18956ff248b36d68498.jpg", answer: "keyboard" },
    { image: "https://i.ibb.co.com/rb87RYw/pad.png", answer: "Mousepad" },
    { image: "https://i.ibb.co.com/HntN7Jw/pad-2.png", answer: "upload" },
    { image: "https://i.ibb.co.com/s9tqWnc/Untitled-design.png", answer: "network" },
    { image: "https://i.ibb.co.com/5xPSc8L/pad-3.png", answer: "download" },
    { image: "https://i.ibb.co.com/wwsvTBs/pad-4.png", answer: "Desktop" },
    { image: "https://i.ibb.co.com/SKv85Py/pad-5.png", answer: "homepage" },
    { image: "https://i.ibb.co.com/mDKcY5s/pad-1.png", answer: "Binary" },
    { image: "https://i.ibb.co.com/WfBWQPp/Brown-Simple-Digital-Marketing-Presentation.png", answer: "Assignment" },
    { image: "https://www.researchgate.net/publication/352805723/figure/fig1/AS:1137917024055298@1648311968840/Flowchart-of-Binary-Search-Algorithm.ppm", answer: "Binary Search" },
    { image: "https://media.baamboozle.com/uploads/images/323069/1621596383_236040.png", answer: "logout" },
    { image: "https://media.baamboozle.com/uploads/images/323069/1621569996_110294.png", answer: "youtube" },
    { image: "https://wat-images.s3.ap-south-1.amazonaws.com/images/course/ci6ldqnqthum/Quick_Sort_0.png", answer: "Quick Sort" },
    { image: "https://www.c-programming-simple-steps.com/images/merge-sort-visual.png", answer: "merge sort" },
   



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
// function submitAnswer() {
//     const guess = document.getElementById("imageGuess").value.trim().toLowerCase();
//     if (guess === questions[questionIndex].answer.toLowerCase()) {
//         score += 1;
//         document.getElementById("score").innerText = `Score: ${score}`;
//     }
//     questionIndex++;
//     loadQuestion();
// }

// Submit answer
function submitAnswer() {
    const guess = document.getElementById("imageGuess").value.trim().toLowerCase();
    if (guess === questions[questionIndex].answer.toLowerCase()) {
        score += 1;
        document.getElementById("score").innerText = `Score: ${score}`;
        questionIndex++;
        loadQuestion();
    } else {
        endGame(); // End the game if the answer is incorrect
    }
}







// End game and save score to Firebase
// function endGame() {
//     document.getElementById("quiz-section").style.display = "none";
//     saveScore();
//     showLeaderboard();
// }
// End game and save score to Firebase
function endGame() {
    saveScore(); // Save the score first
    document.getElementById("quiz-section").style.display = "none";
    showLeaderboard(); // Then display the leaderboard
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
