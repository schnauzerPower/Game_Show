const overlay = document.getElementById('overlay');
const title = document.querySelector('.title');

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
            if(startButton.textContent === 'Start Game') {
                overlay.style.display = 'none';
                activePhrase.addPhraseToDisplay();
            }
            else {
                console.log("It works");
            }
            
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
            overlay.classList.add('win');
            title.textContent = "You win!!";
            this.updateOverlay();
            /*setTimeout(function(){alert("Congrats!!!")}, 200);*/
        }
    }
    
    removeLife() {
        const lostHeart = document.getElementsByClassName('tries')[this.missed - 1];
        const hearts = document.getElementsByClassName('tries');
        let heartsRemaining = 5;
        lostHeart.style.display = 'none';
        for(let heart of hearts) {
            if(heart.style.display === 'none') {
                heartsRemaining--;
            }    
        }
        if(heartsRemaining === 0) {
            this.gameOver();
        }
    }
    
    gameOver() {
        overlay.classList.add('lose');
        title.textContent = "You ran out of hearts!!";
        this.updateOverlay();
    }
    
    updateOverlay() {
        overlay.classList.remove('start');
        document.getElementById('btn__reset').textContent = "Play again"
        overlay.style.display = 'flex';
        
    }
}
