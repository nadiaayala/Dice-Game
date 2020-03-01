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
var firstPlayer,secondPlayer;
var firstPlayerScore, secondPlayerScore;
var diceValue, firstPlayerIsplaying;

var currentSumValue = 0;


newGameBtn.addEventListener('click', function(){
    getPlayersNames();
    updateNames();
    resetScores();
    resetSumPlayerOne();
    resetSumPlayerTwo();
    firstPlayerIsplaying = true;
});

rollDiceBtn.addEventListener('click', function(){
    rollDice();
});

//Starting a new game
function getPlayersNames(){
    firstPlayer = prompt("First player\'s name: ");
    secondPlayer = prompt("Second player\'s name: ");
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

function rollDice(){
    var num = Math.floor(Math.random()  *  6) + 1 ;
    diceValue = num;
    diceImage.src = `dice-${num}.png`;
    increaseSum(num);
    updateSumLabel();
}
function increaseSum(val){
    currentSumValue += val;
    console.log(currentSumValue);
}
function updateSumLabel(value){
    if (firstPlayerIsplaying){
        currentSumLabelOne.textContent = currentSumValue;
    }
    else{
        currentSumLabelTwo.textContent = currentSumValue;
    }
}

