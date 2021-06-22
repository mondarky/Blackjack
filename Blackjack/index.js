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
        message = "Blackjack!";
        backJack = true;
        isAlive = false;
    }else {
        isAlive = false;
        message = "Bust!";
    }
    messageEl.textContent = message;
    
}
function hitCard(){
    if(isAlive === true && backJack === false){
        cards.push(getRandomCard());
        renderGame();
    }
    
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

