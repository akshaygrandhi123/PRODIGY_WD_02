let startTime, intervalId, lapTime = 0, lapCount = 0;
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.querySelector('.laps');

function startStopwatch() {
  startTime = Date.now() - lapTime;
  intervalId = setInterval(updateTime, 10);
  startBtn.disabled = true;
  lapBtn.disabled = false;
  resetBtn.disabled = false;
}

function stopStopwatch() {
  clearInterval(intervalId);
  startBtn.disabled = false;
  lapBtn.disabled = true;
  resetBtn.disabled = false;
}

function resetStopwatch() {
  clearInterval(intervalId);
  lapTime = 0;
  lapCount = 0;
  lapsList.innerHTML = '';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  millisecondsElement.textContent = '00';
  startBtn.disabled = false;
  lapBtn.disabled = true;
  resetBtn.disabled = true;
}

function updateTime() {
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime + lapTime;
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

  millisecondsElement.textContent = milliseconds.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');
  minutesElement.textContent = minutes.toString().padStart(2, '0');
}

function recordLap() {
  const lapTimeElement = document.createElement('li');
  lapTimeElement.textContent = `Lap ${++lapCount}: ${minutesElement.textContent}:${secondsElement.textContent}:${millisecondsElement.textContent}`;
  lapsList.appendChild(lapTimeElement);
  lapTime = Date.now() - startTime;
}

startBtn.addEventListener('click', startStopwatch);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', resetStopwatch);