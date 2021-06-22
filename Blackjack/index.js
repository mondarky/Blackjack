let cards = [];
let backJack = false;
let isAlive = false;
let message = "";
let player = {
    name : "James",
    chips : 150
}


let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardEl = document.getElementById("card-el");
let buttonEl = document.getElementById("button-el");
let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + " : " + player.chips;
function startGame(){
    displayPlayButton()
    isAlive = true;
    backJack = false;
    cards = [];
    cards.push(getRandomCard());
    cards.push(getRandomCard());
    renderGame();
}
function renderGame(){
    let sumCard = 0;
    let stringCard = "";
    for(c in cards){
        sumCard += cards[c];
        stringCard += String(cards[c]) + " "
    }
    sumEl.textContent = "Sum: " + String(sumCard);
    cardEl.textContent = "Cards: " + stringCard;
    
    if (sumCard < 21){
        message = "Hit?";
        isAlive = true;
    }else if (sumCard === 21){
        cardBackJack();
    }else {
        cardBust()
    }
    messageEl.textContent = message;
    
}
function hitCard(){
    cards.push(getRandomCard());
    renderGame();
}
function stayCard(){

}

function getRandomCard(){
    let randomNumber = Math.floor(Math.random()*13) + 1
    if(randomNumber > 10){
        return 10;
    } else if (randomNumber === 1){
        return 11;
    } else {
        return randomNumber;
    }
    
}
function cardBackJack(){
    message = "Blackjack!";
    backJack = true;
    isAlive = false;
    displayNewGameButton()
}
function cardBust(){
    message = "Bust!";
    isAlive = false;
    displayNewGameButton()
}
function displayStartButton(){
    document.getElementById('button-el').innerHTML = `
    <button class='start-button' onclick="startGame()" >START GAME</button>
    `;
}
function displayNewGameButton(){
    document.getElementById('button-el').innerHTML = `
    <button class='start-button' onclick="startGame()" >NEW GAME</button>
    `;
}
function displayPlayButton(){
    document.getElementById('button-el').innerHTML = `
    <button class='hit-button' onclick="hitCard()" >HIT</button>
    <button class='stay-button' onclick="stayCard()" >STAY</button>`;
}

