let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "It's a draw! Try again 😊";
  msg.style.backgroundColor = "#081b31";
  animateMessage();
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    animateScore(userScorePara);
    msg.innerText = `🎉 You win! ${capitalize(userChoice)} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    animateScore(compScorePara);
    msg.innerText = `😞 You lose! ${capitalize(compChoice)} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
  animateMessage();
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;

    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }

    showWinner(userWin, userChoice, compChoice);
  }
};

// Add event listeners
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// Helper to capitalize first letter
const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

// Animate score update
const animateScore = (element) => {
  const parent = element.parentElement;
  parent.classList.add("flash");
  setTimeout(() => {
    parent.classList.remove("flash");
  }, 400);
};

// Animate message appearance
const animateMessage = () => {
  msg.style.animation = "none"; // Reset animation
  void msg.offsetWidth; // Trigger reflow
  msg.style.animation = "fadeIn 0.5s ease forwards";
};
