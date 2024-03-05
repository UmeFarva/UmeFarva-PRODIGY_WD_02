let timer;
let isRunning = false;
let startTime;
let lapTimes = [];
let lapNumber = 1; 

function start() {
  if (!isRunning) {
    startTime = Date.now() - (lapTimes.length > 0 ? lapTimes.reduce((acc, lap) => acc + lap, 0) : 0);
    timer = setInterval(updateDisplay, 10);
    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;
    isRunning = true;
  }
}

function stop() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
    isRunning = false;
  }
}

function lap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        lapTimes.push(lapTime);
        const lapDisplay = document.createElement("li");
        lapDisplay.innerText = `Lap ${lapNumber++}: ${formatTime(lapTime)}`;
        const lapList = document.getElementById("lapList");
        if (lapList) {
            lapList.appendChild(lapDisplay);
        } else {
            console.error("lapList not found in the document");
        }
    } else {
        console.error("The stopwatch is not running. Lap can only be recorded when the stopwatch is running.");
    }
}

  
function reset() {
  clearInterval(timer);
  document.getElementById("display").innerText = "00:00:00";
  document.getElementById("startButton").disabled = false;
  document.getElementById("stopButton").disabled = true;
  lapTimes = [];
  lapNumber = 1;
  document.getElementById("lapList").innerHTML = ""; // Clear lap list
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  document.getElementById("display").innerText = formatTime(elapsedTime);
}

function formatTime(time) {
  const date = new Date(time);
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}
