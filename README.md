# Image Quiz Game

## Overview
This project is a simple image quiz game where students enter their name and ID, guess the names of images, and score points for each correct answer. The game ends after a set number of questions, and the leaderboard displays the top scores.

## Features
- Quiz based on images and text answers.
- Scores awarded for correct answers.
- Leaderboard showing name, ID, score, and rank.

## Installation
1. Clone the repository.
2. Configure Firebase in `firebase-config.js` with your Firebase project credentials.
3. Add images to your project directory and update image paths in `script.js`.

## Firebase Setup
1. Enable Firebase Authentication (Anonymous).
2. Enable Firestore and create a "leaderboard" collection.

## Usage
1. Open `index.html` in your browser.
2. Enter a name and ID to start the quiz.
3. Answer the questions by typing the image name.
4. View the leaderboard at the end of the game.

## License
MIT License
