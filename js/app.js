//Begin new game when start button is clicked
let game = new Game();
const startButton = document.getElementById('btn__reset');

startButton.addEventListener('click', function() {
    game.startGame();   
});  

//Interaction method is called when a letter on the keyboard is clicked
const qwerty = document.getElementById('qwerty');
qwerty.addEventListener('click', function(event) {
    game.handleInteraction(event.target.textContent);
})