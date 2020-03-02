/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const rollDiceBtn = document.getElementsByClassName('btn-roll')[0];
const holdBtn = document.getElementsByClassName('btn-hold')[0];
const newGameBtn = document.getElementsByClassName('btn-new')[0];
var diceImage = document.getElementsByClassName('dice')[0];
const currentSumLabelOne = document.getElementsByClassName('player-current-score')[0];
const currentSumLabelTwo = document.getElementsByClassName('player-current-score')[1];
const playerOne = document.getElementById('name-0');
const playerTwo = document.getElementById('name-1');
const playerOneScore = document.getElementsByClassName('player-score')[0];
const playerTwoScore = document.getElementsByClassName('player-score')[1];
const divPlayerOne = document.getElementsByClassName('player-0-panel')[0];
const divPlayerTwo = document.getElementsByClassName('player-1-panel')[0];
var firstPlayer,secondPlayer;
var firstPlayerScore = 0;
var secondPlayerScore = 0;
var firstPlayerIsPlaying, secondPlayerIsPlaying;

let currentSumValue = 0;


newGameBtn.addEventListener('click', function(){
    firstPlayer = "";
    secondPlayer = "";
    askPlayersNames();
    updateNames();
    resetScores();
    resetSumPlayerOne();
    resetSumPlayerTwo();
    firstPlayerIsPlaying = true;
});

rollDiceBtn.addEventListener('click', function(){
    rollDice();
});

holdBtn.addEventListener('click', function(){
    hold();
});

//Starting a new game
function askPlayersNames(){
    while(firstPlayer == null || firstPlayer == ''){
        firstPlayer = prompt("First player\'s name: ");
    }
    while(secondPlayer == null || secondPlayer == ''){
        secondPlayer = prompt("Second player\'s name: ");
    }
}
function getPlayersNames(){
    return [firstPlayer,secondPlayer];
}
function updateNames(){
    playerOne.textContent = firstPlayer;
    playerTwo.textContent = secondPlayer;
}
function resetScores(){
    playerOneScore.textContent = '0';
    playerTwoScore.textContent = '0';
}
function resetSumPlayerOne(){
    currentSumLabelOne.textContent = '0';
}
function resetSumPlayerTwo(){
    currentSumLabelTwo.textContent = '0';
}
function resetSumCurrentPlayer(){
    if(firstPlayerIsPlaying){
        currentSumLabelOne.textContent = '0';
    }
    else if (secondPlayerIsPlaying){
        currentSumLabelTwo.textContent = '0';
    }
}
function resetSumVariable(){
    currentSumValue = 0;
}
function rollDice(){
    var num = Math.floor(Math.random()  *  6) + 1 ;
    diceValue = num;
    diceImage.src = `dice-${num}.png`;
    if (num !== 1){
        increaseSum(num);
        updateSumLabel(num);
    }
    else{
        console.log('Rolled a 1! :(');
        currentSumValue = 0;
        resetSumCurrentPlayer();
        switchTurn();
    }
    
}
function increaseSum(val){
    if (val !== 1){
        currentSumValue += val;
    }
};
function updateSumLabel(value){
    if (firstPlayerIsPlaying){
        currentSumLabelOne.textContent = currentSumValue;
        console.log(`${firstPlayer} rolled a ${value}`);
    }
    else if (secondPlayerIsPlaying){
        currentSumLabelTwo.textContent = currentSumValue;
        console.log(`${secondPlayer}  rolled a ${value}`);
    }
};

function switchTurn(){
    if(firstPlayerIsPlaying){
        firstPlayerIsPlaying = false;
        secondPlayerIsPlaying = true;
    }
    else if (secondPlayerIsPlaying){
        firstPlayerIsPlaying = true;
        secondPlayerIsPlaying = false;
    }
    changeBackground();
};

function hold(){
    if(firstPlayerIsPlaying && secondPlayerIsPlaying !== true){
        let newScore = firstPlayerScore += currentSumValue;
        console.log(newScore);
        playerOneScore.textContent = newScore;
    }
    else if(secondPlayerIsPlaying && firstPlayerIsPlaying !== true ){
        let newScore = secondPlayerScore += currentSumValue;
        playerTwoScore.textContent = newScore;
    }
    resetSumCurrentPlayer();
    resetSumVariable();
    switchTurn();
    
}
function changeBackground(){
    divPlayerOne.classList.toggle('active');
    divPlayerTwo.classList.toggle('active');
}

