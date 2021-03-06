let playerCards = [],dealerCards = [];
let sumCardPlayer = 0,sumCardDealer = 0;
let stringCardPlayer = "",stringCardDealer = "";
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
let sumPlayerEl = document.getElementById("sumPlayer-el");
let cardPlayerEl = document.getElementById("cardPlayer-el");
let sumDealerEl = document.getElementById("sumDealer-el");
let cardDealerEl = document.getElementById("cardDealer-el");
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
    dealerCards = []
    playerCards.push(drawCard());
    dealerCards.push(drawCard());
    playerCards.push(drawCard());
    dealerCards.push(drawCard());
    renderGame();
}
function renderGame(){
    sumCardPlayer = 0;
    sumCardDealer = 0;
    stringCardPlayer = "";
    stringCardDealer = "";
    for(c in playerCards){
        renderCardPlayer(c,playerCards[c],"player");
        sumCardPlayer += playerCards[c].Weight;
        stringCardPlayer += String(playerCards[c].Value) + " ";
        
    }
    for(c in dealerCards){
        renderCardPlayer(c,dealerCards[c],"dealer");
        sumCardDealer += dealerCards[c].Weight;
        stringCardDealer += String(dealerCards[c].Value) + " ";
    }
    sumPlayerEl.textContent = "Sum: " + String(sumCardPlayer);
    cardPlayerEl.textContent = "playerCards: " + stringCardPlayer;
    sumDealerEl.textContent = "Sum: " + String(sumCardDealer);
    cardDealerEl.textContent = "playerCards: " + stringCardDealer;
    gameCaculation(sumCardPlayer);
    if(playerCards.length == 5){
        finalCalcutation()
        playerEl.textContent = player.name + " : " + player.chips;
        displayNewGameButton();  
    }
    messageEl.textContent = message;
    
}
function renderCardPlayer(c,playerCards,player){
    let id = String(player) +String(c);
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
        let idDealer = "dealer" +String(i);
        let card = document.getElementById(id);
        let dealer = document.getElementById(idDealer);
        card.innerHTML = ' ';
        dealer.innerHTML = ' ';

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
    finalCalcutation()
    playerEl.textContent = player.name + " : " + player.chips;
    displayNewGameButton();    
}
function finalCalcutation(){
    if(sumCardDealer <= 16){
        sumCardDealer = 0;
        stringCardDealer = "";
        dealerCards.push(drawCard());
        for(c in dealerCards){
            renderCardPlayer(c,dealerCards[c],"dealer");
            sumCardDealer += dealerCards[c].Weight;
            stringCardDealer += String(dealerCards[c].Value) + " ";
        }
        sumDealerEl.textContent = "Sum: " + String(sumCardDealer);
        cardDealerEl.textContent = "playerCards: " + stringCardDealer;
        finalCalcutation();
    }else if(sumCardDealer > 21){
        messageEl.textContent = "Dealer Bust! You win!";
        player.chips +=10;
    }
    else{
        if(sumCardDealer < sumCardPlayer){
            if(backJack){
                messageEl.textContent = "Blackjack! You win!";
                player.chips +=30;
            }else{
                messageEl.textContent = "You win!";
                player.chips +=10;
            }
            
        }else if(sumCardDealer > sumCardPlayer){
            messageEl.textContent = "You lose!";
            player.chips -=10;
        }else{
            messageEl.textContent = "Draw!";
        }
    }
}

function drawCard(){
    let draw = deck.pop();
    return draw;
}
function cardBackJack(){
    backJack = true;
    isAlive = false;
    finalCalcutation()
    playerEl.textContent = player.name + " : " + player.chips;
    displayNewGameButton()
}
function cardBust(){
    message = "Bust! You lose!";
    isAlive = false;
    player.chips -=10
    playerEl.textContent = player.name + " : " + player.chips;
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

