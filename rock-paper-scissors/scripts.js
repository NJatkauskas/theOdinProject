const score_to_win = 5;
let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;
let current_round = document.querySelector(".current_round_result");
let player_score = document.querySelector(".player_score");
let computer_score = document.querySelector(".computer_score");
let round_num = document.querySelector(".round_num");

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
    round_num.innerText = roundNumber += 1;
  } else if (
    (playerSelection.toUpperCase() === "ROCK" && computerSelection.toUpperCase() === "SCISSORS") ||
    (playerSelection.toUpperCase() === "SCISSORS" && computerSelection.toUpperCase() === "PAPER") ||
    (playerSelection.toUpperCase() === "PAPER" && computerSelection.toUpperCase() === "ROCK")
  ) {
    current_round.innerText = `You Win! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`;
    player_score.innerText = playerScore += 1;
    round_num.innerText = roundNumber += 1;
  } else {
    current_round.innerText = `You Lose! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}`;
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
  }
}

function addClickEvent(element) {
  element.addEventListener("click", function (e) {
    playRound(e.path[0].innerText, computerPlay());
  });
}

let cards = document.querySelectorAll(".pick");
cards.forEach(addClickEvent);
