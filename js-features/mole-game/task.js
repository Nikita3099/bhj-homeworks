let dead = 0;
let lost = 0;

function getHole(index) {
  return document.getElementById(`hole${index}`);
}

function resetGame() {
  dead = 0;
  lost = 0;
  updateScore();
}

function updateScore() {
  document.getElementById('dead').textContent = dead;
  document.getElementById('lost').textContent = lost;
}

for (let i = 1; i <= 9; i++) {
  const hole = getHole(i);
  hole.onclick = () => {
    if (hole.classList.contains('hole_has-mole')) {
      dead++;
    } else {
      lost++;
    }

    updateScore();

    if (dead === 10) {
      alert('Победа!');
      resetGame();
    }

    if (lost === 5) {
      alert('Вы проиграли!');
      resetGame();
    }
  };
}
