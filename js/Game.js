class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [new Phrase("A dime a dozen"), new Phrase("The early bird gets the worm"), new Phrase("Keep your shirt on"), new Phrase("A watched pot never boils"), new Phrase("Every dog has his day")]; 
        this.activePhrase = null;
    }
    
    startGame() {
        const startButton = document.getElementById('btn__reset');
        const overlay = document.getElementById('overlay');
        this.getRandomPhrase();
        const activePhrase = this.activePhrase;
        startButton.addEventListener('click', function() {
            overlay.style.display = 'none';
            activePhrase.addPhraseToDisplay();
        });  
    }
    
    getRandomPhrase() {
        const phrases = this.phrases;
        const randomPhrase = Math.floor(Math.random() * 5);
        this.activePhrase = phrases[randomPhrase];
        /*return phrases[randomPhrase];*/
    }
    
    handleInteraction() {
        
    }
    
    checkForWin() {
        
    }
    
    removeLife() {
        
    }
    
    gameOver() {
        console.log("Game Over");
    }
}
