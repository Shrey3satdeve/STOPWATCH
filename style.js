let minutes = 0;
let seconds = 0;
let hundredths = 0;
let interval;

const timeDisplay = document.getElementById('time-display');
const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');

function updateDisplay() {
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(hundredths).padStart(2, '0')}`;
  timeDisplay.textContent = formattedTime;
}

function updateHands() {
  const secondDeg = (seconds + hundredths / 100) * 6; // Each second = 6 degrees (360/60)
  const minuteDeg = minutes * 6; // Each minute = 6 degrees

  secondHand.style.transform = `rotate(${secondDeg}deg)`;
  minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
}

function startTimer() {
  if (interval) return; // Prevent multiple intervals

  interval = setInterval(() => {
    hundredths++;
    if (hundredths === 100) {
      hundredths = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    updateDisplay();
    updateHands();
  }, 10); // Update every 10ms for smooth animation
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  stopTimer();
  minutes = 0;
  seconds = 0;
  hundredths = 0;
  updateDisplay();
  updateHands();
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

updateDisplay(); // Initial display update
