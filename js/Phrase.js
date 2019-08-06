class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
        this.chars = this.phrase.split('');
    }
    
    addPhraseToDisplay() { 
        const ul = document.querySelector('ul');
        for(let char of this.chars) {
            char !== " " ? ul.innerHTML += "<li class=letter>" + char + "<li>" : ul.innerHTML += "<li class=space><li>";
        }
        
        return ul;   
    }
    
    checkLetter(letter) {
      for(let char of this.chars) {
          if(char === letter) {
              this.showMatchedLetter();
          }
      }
    }
    
    showMatchedLetter() {
        
    }
}