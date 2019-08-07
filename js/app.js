game = new Game();
game.startGame();

const qwerty = document.getElementById('qwerty');
qwerty.addEventListener('click', function(event) {
    game.handleInteraction(event.target.textContent);
})