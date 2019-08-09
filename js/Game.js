const overlay = document.getElementById('overlay');
const title = document.querySelector('.title');
const activePhrase = this.activePhrase;
const keys = document.getElementsByClassName('key');
const hearts = document.getElementsByClassName('tries');


class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [new Phrase("A dime a dozen"), new Phrase("The early bird gets the worm"), new Phrase("Keep your shirt on"), new Phrase("A watched pot never boils"), new Phrase("Every dog has his day")]; 
        this.activePhrase = null;
    }
    
    startGame() {
        const startButton = document.getElementById('btn__reset');
        const overlay = document.getElementById('overlay');
        this.activePhrase = this.getRandomPhrase();
        const activePhrase = this.activePhrase;
        startButton.addEventListener('click', function() {
            overlay.style.display = 'none';
            if(startButton.textContent === 'Start Game') {
                activePhrase.addPhraseToDisplay();
            }
           
        });  
    }
    
    getRandomPhrase() {
        const phrases = this.phrases;
        const randomPhrase = Math.floor(Math.random() * 5);
        return phrases[randomPhrase];
    }
    
    handleInteraction(letter) {
        for(let key of keys) {
                if(key.textContent === letter) {
                    key.disabled = true;
                    if(this.activePhrase.checkLetter(letter) === 'missed') {
                        this.missed++;
                        key.classList.add('wrong');
                        this.removeLife();   
                    }
                    else {
                        key.classList.add('chosen');
                    }
                }
        }
        this.checkForWin();
    }
    
    checkForWin() {
        const letters = document.getElementsByClassName('letter');
        let lettersNotGuessed = 0;
        for(let letter of letters) {
            if(!letter.classList.contains('show')) {
                lettersNotGuessed++;
                break;
            }
        }
        if(lettersNotGuessed === 0) {
            this.updateOverlay('winner');
        }
    }
    
    removeLife() {
        const lostHeart = document.getElementsByClassName('tries')[this.missed - 1];
        let heartsRemaining = 5;
        lostHeart.style.display = 'none';
        for(let heart of hearts) {
            if(heart.style.display === 'none') {
                heartsRemaining--;
            }    
        }
        if(heartsRemaining === 0) {
            this.gameOver();
            heartsRemaining = 5;
            this.missed = 0;
        }
    }
    
    gameOver() {
        this.updateOverlay('loser')
    }
    
    updateOverlay(winnerOrLoser) {
        overlay.classList.remove('start');
        document.getElementById('btn__reset').textContent = "Play again"
        if(winnerOrLoser === 'winner') {
            overlay.classList.remove('lose');
            overlay.classList.add('win');
            title.textContent = "You win!!";
        }
        else {
            overlay.classList.remove('win');
            overlay.classList.add('lose');
            title.textContent = "You ran out of hearts!!";
        }
        overlay.style.display = 'flex';
        this.prepareNewGame();
    }
    
    prepareNewGame() {
        this.activePhrase = this.getRandomPhrase();
        const activePhrase = this.activePhrase;
        const ul = document.querySelector('ul');
        while(ul.firstChild) {
            ul.removeChild(ul.firstChild);           
        }
        activePhrase.addPhraseToDisplay();
        for(let heart of hearts) {
            heart.style.display = 'inline';
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
