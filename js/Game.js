//Global variables used in more than one method
const overlay = document.getElementById('overlay');
const keys = document.getElementsByClassName('key');
const hearts = document.getElementsByTagName('img');


class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [new Phrase("A dime a dozen"), new Phrase("The early bird gets the worm"), new Phrase("Keep your shirt on"), new Phrase("A watched pot never boils"), new Phrase("Every dog has his day")]; 
        this.activePhrase = null;
    }
    
    //Hides initial screen to reveal gameboard, selects a random phrase and calls addPhraseToDisplay method
    startGame() {
        const startButton = document.getElementById('btn__reset');
        const overlay = document.getElementById('overlay');
        this.activePhrase = this.getRandomPhrase();
        const activePhrase = this.activePhrase;
        overlay.style.display = 'none';
        activePhrase.addPhraseToDisplay();  
    }
    
    //selects a random phrase from the phrases property
    getRandomPhrase() {
        const phrases = this.phrases;
        const randomPhrase = Math.floor(Math.random() * 5);
        return phrases[randomPhrase];
    }
    
    //Disables selected letters. Determines if selected letter is found in phrase or not and calls appropriate methods. 
    handleInteraction(letter) {
        for(let key of keys) {
            if(key.textContent === letter) {
                key.disabled = true;
                if(this.activePhrase.checkLetter(letter) === 'missed') {
                    key.classList.add('wrong');
                    this.removeLife();   
                }
                else {
                    key.classList.add('chosen');
                    this.activePhrase.showMatchedLetter(letter);
                    if(this.checkForWin() === "winner") {
                        this.gameOver("winner");
                    }
                        
                }
            }
        }    
    }
    
    //Checks to see if all letters in the phrase have been guessed
    checkForWin() {
        const letters = document.getElementsByClassName('letter');
        let lettersNotGuessed = 0;
        for(let letter of letters) {
            if(!letter.classList.contains('show')) {
                lettersNotGuessed++;
                return 'not yet';
            }
        }
        if(lettersNotGuessed === 0) {
            return 'winner';
        }
    }
    
    //Removes a heart of player guesses wrong
    removeLife() {
        this.missed++;
        const lostHeart = document.getElementsByTagName('img')[this.missed - 1];
        lostHeart.setAttribute('src', 'images/lostHeart.png');
        if(hearts[4].getAttribute('src') === 'images/lostHeart.png') {
            this.gameOver('loser');
            this.missed = 0;
        }
    }
    
    //Updates the overlay depending on win or loss and calls the resetGameboard() method to prepare a new game
    gameOver(winnerOrLoser) {
        const gameOverMessage = document.querySelector('#game-over-message');
        overlay.classList.remove('start');
        document.getElementById('btn__reset').textContent = "Play again"
        if(winnerOrLoser === 'winner') {
            overlay.classList.remove('lose');
            overlay.classList.add('win');
            gameOverMessage.textContent = "You win!!";
        }
        else {
            overlay.classList.remove('win');
            overlay.classList.add('lose');
            gameOverMessage.textContent = "You ran out of hearts!!";
        }
        overlay.style.display = 'flex';
        this.resetGameboard();
    }
    
    //Prepares a new game
    resetGameboard() {
        const ul = document.querySelector('ul');
        while(ul.firstChild) {
            ul.removeChild(ul.firstChild);           
        }
        for(let heart of hearts) {
            heart.setAttribute('src', 'images/liveHeart.png');
        }
        for(let key of keys) {
            key.disabled = false;
            if(key.classList.contains('chosen')) {
                key.classList.remove('chosen');
                
            }
            else {
                key.classList.remove('wrong');
            }
        }
        
        
    }
}
