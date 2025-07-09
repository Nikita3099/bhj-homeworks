const cookie = document.getElementById('cookie');
const counter = document.getElementById('clicker__counter');

let clickCount = 0;
let isShrunken = false;

let lastClickTime = Date.now();
let clickSpeedElem = document.createElement('div');
clickSpeedElem.className = 'clicker__status';
clickSpeedElem.textContent = 'Скорость клика: 0 кликов/сек';

cookie.parentElement.insertBefore(clickSpeedElem, cookie);


cookie.onclick = () => {
  
  clickCount++;
  counter.textContent = clickCount;

  
  if (isShrunken) {
    cookie.style.width = '200px';
    cookie.style.height = 'auto';
  } else {
    cookie.style.width = '180px';
    cookie.style.height = 'auto';
  }
  isShrunken = !isShrunken;

  
  const now = Date.now();
  const timeDiff = (now - lastClickTime) / 1000; // в секундах
  const speed = timeDiff > 0 ? (1 / timeDiff).toFixed(2) : 0;
  clickSpeedElem.textContent = `Скорость клика: ${speed} кликов/сек`;
  lastClickTime = now;
};
