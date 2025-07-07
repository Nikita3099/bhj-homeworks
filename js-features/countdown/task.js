const timerElement = document.getElementById('timer');
let timeLeft = parseInt(timerElement.textContent);

const countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(countdown);
        alert('Вы победили в конкурсе!');
    }
}, 1000);
