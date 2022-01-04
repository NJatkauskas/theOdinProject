const rounds = 5;
let playerScore = 0;
let computerScore = 0;

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
  // console.log(playerSelection + " and " + computerSelection);
  if (playerSelection) {
    if (playerSelection.toUpperCase() === computerSelection.toUpperCase()) {
      return "tie";
    } else if (
      (playerSelection.toUpperCase() === "ROCK" &&
        computerSelection.toUpperCase() === "SCISSORS") ||
      (playerSelection.toUpperCase() === "SCISSORS" &&
        computerSelection.toUpperCase() === "PAPER") ||
      (playerSelection.toUpperCase() === "PAPER" && computerSelection.toUpperCase() === "ROCK")
    ) {
      playerScore += 1;
      return `You Win! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`;
    } else {
      computerScore += 1;
      return `You Lose! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}`;
    }
  } else {
    return "Player selection is empty";
  }
}

function game() {
  for (let i = 0; i < rounds; i++) {
    console.log(playRound(prompt("Pick one: Rock, Paper, Scissors"), computerPlay()));
  }
  if (playerScore > computerScore) {
    return "You Win the game! " + playerScore + " > " + computerScore;
  } else if (playerScore === computerScore) {
    return "It's a tie! " + playerScore + " = " + computerScore;
  } else {
    return "You lose the game! " + playerScore + " < " + computerScore;
  }
}

console.log(game());
