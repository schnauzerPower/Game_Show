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
            activePhrase.addPhraseToDisplay();
        });  
    }
    
    getRandomPhrase() {
        const phrases = this.phrases;
        const randomPhrase = Math.floor(Math.random() * 5);
        return phrases[randomPhrase];
    }
    
    handleInteraction(letter) {
        const keys = document.getElementsByClassName('key');
        for(let key of keys) {
                if(key.textContent === letter) {
                    key.disabled = true;
                    if(this.activePhrase.checkLetter(letter) === 'missed') {
                        this.missed++;
                        this.removeLife();
                        key.classList.add('wrong');
                    }
                    else {
                        key.classList.add('chosen');
                    }
                }
        }
    }
    
    /*handleInteraction(letter) {
        const keys = document.getElementsByClassName('key');
        if(this.activePhrase.checkLetter(letter) === 'missed') {
            this.missed++;
            this.removeLife();
            for(let key of keys) {
                if(key.textContent === letter) {
                    key.disabled = true;
                    key.classList.add('wrong');
                }
            }
        }
        else {
            for(let key of keys) {
                if(key.textContent === letter) {
                    key.disabled = true;
                    key.classList.add('chosen');
                }
            }
        }
    }*/
    
    checkForWin() {
        
    }
    
    removeLife() {
        const lostHeart = document.getElementsByClassName('tries')[this.missed - 1];
        lostHeart.style.display = 'none';
        
        
    }
    
    gameOver() {
        console.log("Game Over");
    }
}
