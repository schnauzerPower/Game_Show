const startButton = document.getElementById('btn__reset');
startButton.addEventListener('click', function() {
    game = new Game();
    game.startGame();
           
});  

const qwerty = document.getElementById('qwerty');
qwerty.addEventListener('click', function(event) {
    game.handleInteraction(event.target.textContent);
})