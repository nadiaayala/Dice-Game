/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

--- NEW REQUIREMENTS BELOW---

1. If the user gets two 6 in a row, they lose their score.
2. Add an input field in the HTML so the users can define the winning score by themselves.
3. Add a second dice to the game. In this scenario, the player loses his score when one of them is a one.

*/

const rollDiceBtn = document.getElementsByClassName('btn-roll')[0];
const holdBtn = document.getElementsByClassName('btn-hold')[0];
const newGameBtn = document.getElementsByClassName('btn-new')[0];
let firstDice = document.querySelector("#dice-1");
let secondDice = document.querySelector("#dice-2");
let winningScore;
let player0 = "";
let player1 = "";
let scores = [0,0]
let currentSumValue = 0;
let activePlayer = 0;
let gamePlaying = false;
let lastDice = 0;

// firstDice.style.display = "block";

//Starting a new game
newGameBtn.addEventListener('click', function(){
    init();
});
//Rolling the dice
rollDiceBtn.addEventListener('click', function(){
    if(gamePlaying){
        rollDice();
    }
});
//Hold button pressed
holdBtn.addEventListener('click', function(){
    if(gamePlaying){
        hold();
    }
});

function init(){
    gamePlaying = true;
    activePlayer = 0;
    askPlayersNames();
    updateNames();
    resetScores();
    resetSum();
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}
function askPlayersNames(){
    while(player0 == null || player0 == ''){
        player0 = prompt("First player\'s name: ");
    }
    while(player1 == null || player1 == ''){
        player1 = prompt("Second player\'s name: ");
    }
}
function resetScores(){
    scores[0] = 0;
    scores[1] = 0;
    document.querySelector('#score-0').textContent = scores[0];
    document.querySelector('#score-1').textContent = scores[1];
}
function resetScore(){
    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
}
function resetSum(){
    document.querySelector('#current-' + activePlayer).textContent = '0';
    currentSumValue = 0;
}
function rollDice() {
    console.log(lastDice);
    let num1 = Math.floor(Math.random() * 6) + 1;
    let num2 = Math.floor(Math.random() * 6) + 1;
    updateDices(num1, num2);
    if (num1 !== 1 & num2 !== 1) {
            increaseSum(num1, num2);
            updateSumLabel(increaseSum); 
    }
    else{
        console.log('Rolled a 1! :(');
        setTimeout(switchTurn, 1000);
        currentSumValue = 0;
        resetSum();
    }
}

//Increase sum variable to keep track of it
function increaseSum(val1, val2){
    if (val1 !== 1 && val2 !== 1){
        let sum = val1 + val2 ;
        currentSumValue += sum ;
        return currentSumValue;
    }
}
function switchTurn(){
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    changeBackground();
}
function hold(){
    updateScore();
}
function updateScore(){
    scores[activePlayer] = scores[activePlayer] += currentSumValue;
    resetSum();
    updateScoreField();
    //Checking if the user won the game
    let input = document.querySelector(".final-score").value;
    input !== "" ? winningScore = input : winningScore = 20;
    if(scores[activePlayer] >= winningScore){
        checkWinner();
    }
    else{
        switchTurn();
    }
}
function checkWinner(){
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
        gamePlaying = false;
        document.querySelector(".dice").style.display = "none";
}

//UI updating functions

//Updating the names
function updateNames(){
    document.querySelector('#name-0').textContent = player0;
    document.querySelector('#name-1').textContent = player1;
}

//Updating the current sum value
function updateSumLabel(value){
    document.querySelector('#current-' + activePlayer).textContent = currentSumValue;
}

//Updating the dice value
function updateDices(val1, val2){
    firstDice.style.display = "block";
    firstDice.src = `dice-${val1}.png`;
    secondDice.style.display = "block";
    secondDice.src = `dice-${val2}.png`;
}

function updateScoreField(){
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
}

//Chaging the background color
function changeBackground(){
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

