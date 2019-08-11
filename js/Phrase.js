class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
        this.chars = this.phrase.split('');
    }
    
    //Adds selected phrase to the display
    addPhraseToDisplay() { 
        const ul = document.querySelector('ul');
        let x = 0
        for(let char of this.chars) {
            if(char !== " ") {
                ul.innerHTML += "<li class=letter>" + char + "</li>";
                const li = document.querySelectorAll('.letter')[x];
                li.classList.add(char);
                x++;
            }
            else {
                ul.innerHTML += "<li class=space><li>";
            }
            
        }  
    }
    
    //Checks to see if guessed letter is found in the phrase
    checkLetter(letter) {
      if(this.chars.indexOf(letter) >= 0) {
          return 'hit';
      }
      else {
          return 'missed';
      }
    }
    
    //Shows the guessed letter(s) if found in the phrase
    showMatchedLetter(letter) {
        const lettersToShow = document.getElementsByClassName(letter);
        for(let letterToShow of lettersToShow) {
            letterToShow.classList.add('show');
        }
        
    }
}