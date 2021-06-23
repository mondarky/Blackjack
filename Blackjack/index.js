let playerCards = [],dealerCards = [];
let backJack = false;
let isAlive = false;
let message = "";
let player = {
    name : "Player",
    chips : 150
}
let suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = new Array();


let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardEl = document.getElementById("card-el");
let buttonEl = document.getElementById("button-el");
let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + " : " + player.chips;

function startGame(){
    displayPlayButton();
    createDeck();
    clearRenderCard();
    isAlive = true;
    backJack = false;
    playerCards = [];
    playerCards.push(drawCard());
    playerCards.push(drawCard());
    renderGame();
}
function renderGame(){
    let sumCard = 0;
    let stringCard = "";
    for(c in playerCards){
        renderCardPlayer(c,playerCards[c]);
        sumCard += playerCards[c].Weight;
        stringCard += String(playerCards[c].Value) + " "
        
    }
    sumEl.textContent = "Sum: " + String(sumCard);
    cardEl.textContent = "playerCards: " + stringCard;
    gameCaculation(sumCard);
    
    messageEl.textContent = message;
    
}
function renderCardPlayer(c,playerCards){
    let id = "player" +String(c);
    let card = document.getElementById(id);
    let suit ='';
    if (playerCards.Suit == 'Hearts')
        icon='&hearts;';
    else if (playerCards.Suit == 'Spades')
        icon = '&spades;';
    else if (playerCards.Suit == 'Diamonds')
        icon = '&diams;';
    else
        icon = '&clubs;';
    
    card.innerHTML = playerCards.Value + '</br>' + icon;

}
function clearRenderCard(){
    for(i=0 ; i<5; i++){
        let id = "player" +String(i);
        let card = document.getElementById(id);
        card.innerHTML = ' ';

    }
} 
function gameCaculation(sum){
    if (sum < 21){
        message = "Hit?";
        isAlive = true;
    }else if (sum === 21){
        cardBackJack();
    }else {
        cardBust();
    }
}
function hitCard(){
    playerCards.push(drawCard());
    renderGame();
}
function stayCard(){
    displayNewGameButton();
}

function drawCard(){
    let draw = deck.pop();
    return draw;
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

function createDeck(){
    // 4 suits, A - K
    deck = new Array();
    for(var x = 0; x < suits.length; x++){
        for (var i = 0 ; i < values.length; i++){
            var weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                weight = 10;
            if (values[i] == "A")
                weight = 11;
            var card = { Value: values[i], Suit: suits[x], Weight: weight };
            deck.push(card);
        }
    }
    shuffle();
}
function shuffle(){
        // for 1000 turns
        // switch the values of two random playerCards
        for (var i = 0; i < 1000; i++){
            var location1 = Math.floor((Math.random() * deck.length));
            var location2 = Math.floor((Math.random() * deck.length));
            var tmp = deck[location1];

            deck[location1] = deck[location2];
            deck[location2] = tmp;
        }
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

