// Stopwatch state
let timerInterval = null;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 0;
let previousLapTime = 0;

// DOM elements
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const lapBtn = document.getElementById('lap-btn');
const resetBtn = document.getElementById('reset-btn');
const lapList = document.getElementById('lap-list');
const statusIndicator = document.getElementById('status-indicator');
const lapCountEl = document.getElementById('lap-count');

/**
 * Pad number with leading zeros
 * @param {number} num - The number to pad
 * @param {number} digits - Number of digits (default 2)
 * @returns {string} Padded string
 */
function padZero(num, digits = 2) {
  return String(num).padStart(digits, '0');
}

/**
 * Convert milliseconds to formatted time object
 * @param {number} ms - Milliseconds elapsed
 * @returns {Object} Formatted time components
 */
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;

  return {
    hours: padZero(hours),
    minutes: padZero(minutes),
    seconds: padZero(seconds),
    milliseconds: padZero(milliseconds, 3)
  };
}

/**
 * Update the timer display with current elapsed time
 */
function updateDisplay() {
  const time = formatTime(elapsedTime);
  hoursEl.textContent = time.hours;
  minutesEl.textContent = time.minutes;
  secondsEl.textContent = time.seconds;
  millisecondsEl.textContent = time.milliseconds;
}

/**
 * Update status indicator badge
 * @param {string} status - 'ready', 'running', or 'paused'
 */
function setStatus(status) {
  statusIndicator.className = 'status-indicator';
  statusIndicator.classList.add(`status-${status}`);

  const statusText = statusIndicator.querySelector('.status-text');
  const labels = { ready: 'Ready', running: 'Running', paused: 'Paused' };
  statusText.textContent = labels[status];
}

/**
 * Update the lap count display
 */
function updateLapCount() {
  lapCountEl.textContent = `${lapCount} lap${lapCount !== 1 ? 's' : ''}`;
}

/**
 * Start the stopwatch timer
 */
function startTimer() {
  if (isRunning) return;

  isRunning = true;
  const startTime = Date.now() - elapsedTime;

  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);

  setStatus('running');
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lapBtn.disabled = false;
}

/**
 * Pause the stopwatch timer
 */
function pauseTimer() {
  if (!isRunning) return;

  isRunning = false;
  clearInterval(timerInterval);
  timerInterval = null;

  setStatus('paused');
  startBtn.disabled = false;
  startBtn.textContent = 'Resume';
  pauseBtn.disabled = true;
}

/**
 * Reset the stopwatch to initial state
 */
function resetTimer() {
  isRunning = false;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  elapsedTime = 0;
  lapCount = 0;
  previousLapTime = 0;

  updateDisplay();
  setStatus('ready');
  updateLapCount();

  startBtn.disabled = false;
  startBtn.textContent = 'Start';
  pauseBtn.disabled = true;
  lapBtn.disabled = true;

  lapList.innerHTML = '<p class="no-laps">No laps recorded yet</p>';
}

/**
 * Record a new lap time
 */
function recordLap() {
  if (!isRunning && elapsedTime === 0) return;

  lapCount++;
  updateLapCount();

  // Remove empty state message
  const noLaps = lapList.querySelector('.no-laps');
  if (noLaps) noLaps.remove();

  // Calculate lap difference from previous
  const currentLapDiff = elapsedTime - previousLapTime;
  previousLapTime = elapsedTime;

  const totalTime = formatTime(elapsedTime);
  const lapDiff = formatTime(currentLapDiff);

  // Create lap item element
  const lapItem = document.createElement('div');
  lapItem.className = 'lap-item';
  lapItem.innerHTML = `
    <span class="lap-number">Lap ${lapCount}</span>
    <span class="lap-time">${totalTime.hours}:${totalTime.minutes}:${totalTime.seconds}.${totalTime.milliseconds}</span>
    <span class="lap-diff">+${lapDiff.minutes}:${lapDiff.seconds}.${lapDiff.milliseconds}</span>
  `;

  // Insert newest lap at top
  lapList.insertBefore(lapItem, lapList.firstChild);
}

// Event listeners for buttons
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Skip if typing in input field
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  switch (e.key.toLowerCase()) {
    case ' ':
    case 's':
      e.preventDefault();
      if (isRunning) pauseTimer();
      else startTimer();
      break;
    case 'r':
      e.preventDefault();
      resetTimer();
      break;
    case 'l':
      e.preventDefault();
      recordLap();
      break;
  }
});

// Initialize display
updateDisplay();
setStatus('ready');
// Stopwatch state
let timerInterval = null;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 0;
let previousLapTime = 0;

// DOM elements
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const lapBtn = document.getElementById('lap-btn');
const resetBtn = document.getElementById('reset-btn');
const lapList = document.getElementById('lap-list');
const statusIndicator = document.getElementById('status-indicator');
const lapCountEl = document.getElementById('lap-count');

/**
 * Pad number with leading zeros
 * @param {number} num - The number to pad
 * @param {number} digits - Number of digits (default 2)
 * @returns {string} Padded string
 */
function padZero(num, digits = 2) {
  return String(num).padStart(digits, '0');
}

/**
 * Convert milliseconds to formatted time object
 * @param {number} ms - Milliseconds elapsed
 * @returns {Object} Formatted time components
 */
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;

  return {
    hours: padZero(hours),
    minutes: padZero(minutes),
    seconds: padZero(seconds),
    milliseconds: padZero(milliseconds, 3)
  };
}

/**
 * Update the timer display with current elapsed time
 */
function updateDisplay() {
  const time = formatTime(elapsedTime);
  hoursEl.textContent = time.hours;
  minutesEl.textContent = time.minutes;
  secondsEl.textContent = time.seconds;
  millisecondsEl.textContent = time.milliseconds;
}

/**
 * Update status indicator badge
 * @param {string} status - 'ready', 'running', or 'paused'
 */
function setStatus(status) {
  statusIndicator.className = 'status-indicator';
  statusIndicator.classList.add(`status-${status}`);

  const statusText = statusIndicator.querySelector('.status-text');
  const labels = { ready: 'Ready', running: 'Running', paused: 'Paused' };
  statusText.textContent = labels[status];
}

/**
 * Update the lap count display
 */
function updateLapCount() {
  lapCountEl.textContent = `${lapCount} lap${lapCount !== 1 ? 's' : ''}`;
}

/**
 * Start the stopwatch timer
 */
function startTimer() {
  if (isRunning) return;

  isRunning = true;
  const startTime = Date.now() - elapsedTime;

  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);

  setStatus('running');
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lapBtn.disabled = false;
}

/**
 * Pause the stopwatch timer
 */
function pauseTimer() {
  if (!isRunning) return;

  isRunning = false;
  clearInterval(timerInterval);
  timerInterval = null;

  setStatus('paused');
  startBtn.disabled = false;
  startBtn.textContent = 'Resume';
  pauseBtn.disabled = true;
}

/**
 * Reset the stopwatch to initial state
 */
function resetTimer() {
  isRunning = false;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  elapsedTime = 0;
  lapCount = 0;
  previousLapTime = 0;

  updateDisplay();
  setStatus('ready');
  updateLapCount();

  startBtn.disabled = false;
  startBtn.textContent = 'Start';
  pauseBtn.disabled = true;
  lapBtn.disabled = true;

  lapList.innerHTML = '<p class="no-laps">No laps recorded yet</p>';
}

/**
 * Record a new lap time
 */
function recordLap() {
  if (!isRunning && elapsedTime === 0) return;

  lapCount++;
  updateLapCount();

  // Remove empty state message
  const noLaps = lapList.querySelector('.no-laps');
  if (noLaps) noLaps.remove();

  // Calculate lap difference from previous
  const currentLapDiff = elapsedTime - previousLapTime;
  previousLapTime = elapsedTime;

  const totalTime = formatTime(elapsedTime);
  const lapDiff = formatTime(currentLapDiff);

  // Create lap item element
  const lapItem = document.createElement('div');
  lapItem.className = 'lap-item';
  lapItem.innerHTML = `
    <span class="lap-number">Lap ${lapCount}</span>
    <span class="lap-time">${totalTime.hours}:${totalTime.minutes}:${totalTime.seconds}.${totalTime.milliseconds}</span>
    <span class="lap-diff">+${lapDiff.minutes}:${lapDiff.seconds}.${lapDiff.milliseconds}</span>
  `;

  // Insert newest lap at top
  lapList.insertBefore(lapItem, lapList.firstChild);
}

// Event listeners for buttons
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Skip if typing in input field
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  switch (e.key.toLowerCase()) {
    case ' ':
    case 's':
      e.preventDefault();
      if (isRunning) pauseTimer();
      else startTimer();
      break;
    case 'r':
      e.preventDefault();
      resetTimer();
      break;
    case 'l':
      e.preventDefault();
      recordLap();
      break;
  }
});

// Initialize display
updateDisplay();
setStatus('ready');
