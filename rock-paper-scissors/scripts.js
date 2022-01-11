const score_to_win = 5;
let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;
let current_round = document.querySelector(".current_round_result");
let player_score = document.querySelector(".player_score");
let computer_score = document.querySelector(".computer_score");
let round_num = document.querySelector(".round_num");
let cards = document.querySelectorAll(".pick");
let reset_button = document.querySelector(".reset_button");

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

function computerPlay() {
  const computerMoves = ["Rock", "Paper", "Scissors"];
  const random = Math.floor(Math.random() * computerMoves.length);
  return computerMoves[random];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection.toUpperCase() === computerSelection.toUpperCase()) {
    current_round.innerText = "Tie";
    current_round.style.color = "#efe7ef";
    round_num.innerText = roundNumber += 1;
  } else if (
    (playerSelection.toUpperCase() === "ROCK" && computerSelection.toUpperCase() === "SCISSORS") ||
    (playerSelection.toUpperCase() === "SCISSORS" && computerSelection.toUpperCase() === "PAPER") ||
    (playerSelection.toUpperCase() === "PAPER" && computerSelection.toUpperCase() === "ROCK")
  ) {
    current_round.innerText = `You Win! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`;
    current_round.style.color = "#85FFC7";
    player_score.innerText = playerScore += 1;
    round_num.innerText = roundNumber += 1;
  } else {
    current_round.innerText = `You Lose! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}`;
    current_round.style.color = "#ff005d";
    computer_score.innerText = computerScore += 1;
    round_num.innerText = roundNumber += 1;
  }
  checkWinner(playerScore, computerScore);
}

function checkWinner(player, opponent) {
  if (player === score_to_win || opponent === score_to_win) {
    if (player > opponent) {
      current_round.innerText = `You Win the game! ${player} > ${opponent}`;
    } else {
      current_round.innerText = `You lose the game! ${player} < ${opponent}`;
    }
    cards.forEach(endGame);
  }
}

function runRound(e) {
  let pick;
  e.path.length > 6 ? (pick = 1) : (pick = 0);
  playRound(e.path[pick].innerText, computerPlay());
}

function endGame(element) {
  element.removeEventListener("click", runRound);
  reset_button.style.opacity = 1;
}

function runGame(element) {
  element.addEventListener("click", runRound);
}

function resetGame() {
  current_round.innerText = "Let's play!";
  current_round.style.color = "#efe7ef";
  player_score.innerText = playerScore = 0;
  computer_score.innerText = computerScore = 0;
  round_num.innerText = roundNumber = 0;
  reset_button.style.opacity = 0;
  cards.forEach(runGame);
}

cards.forEach(runGame);

reset_button.addEventListener("click", resetGame);
