
let humanScore = 0;
let computerScore = 0;
let gameOver = false;


const btnRock = document.getElementById("btnRock");
const btnPaper = document.getElementById("btnPaper");
const btnScissors = document.getElementById("btnScissors");
const btnReset = document.getElementById("btnReset");
const resultsDiv = document.getElementById("results");


btnRock.addEventListener("click", () => playRound("rock"));
btnPaper.addEventListener("click", () => playRound("paper"));
btnScissors.addEventListener("click", () => playRound("scissors"));
btnReset.addEventListener("click", resetGame);

function getComputerChoice() {
    const randomNumber = Math.random();
    
    if (randomNumber < 0.33) {
        return "rock";
    } else if (randomNumber < 0.66) {
        return "paper";
    } else {
        return "scissors";
    }
}

function playRound(humanChoice) {
    if (gameOver) return;
    
    const computerChoice = getComputerChoice();
    humanChoice = humanChoice.toLowerCase();
    let roundResult = "";
    
    if (humanChoice === computerChoice) {
        roundResult = `It's a tie! Both chose ${humanChoice}`;
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        roundResult = `You win this round! ${humanChoice} beats ${computerChoice}`;
        humanScore++;
    } else {
        roundResult = `You lose this round! ${computerChoice} beats ${humanChoice}`;
        computerScore++;
    }
    
    
    displayRound(roundResult, humanChoice, computerChoice);
    

    if (humanScore === 5) {
        endGame("You win the game!");
    } else if (computerScore === 5) {
        endGame("Computer wins the game!");
    }
}

function displayRound(result, human, computer) {
    const roundHTML = `
        <p><strong>Round Result:</strong> ${result}</p>
        <p>You chose: <strong>${human}</strong> | Computer chose: <strong>${computer}</strong></p>
        <div class="score">
            Your Score: ${humanScore} | Computer Score: ${computerScore}
        </div>
        <hr>
    `;
    
    resultsDiv.innerHTML += roundHTML;
}

function endGame(message) {
    gameOver = true;
    const winnerClass = message.includes("win the game") ? "winner" : "loser";
    const endGameHTML = `<p class="${winnerClass}">${message}</p>`;
    resultsDiv.innerHTML += endGameHTML;
    

    btnRock.disabled = true;
    btnPaper.disabled = true;
    btnScissors.disabled = true;
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    gameOver = false;
    resultsDiv.innerHTML = '<p>Game reset! Make a selection to start playing!</p>';
    
    btnRock.disabled = false;
    btnPaper.disabled = false;
    btnScissors.disabled = false;
}