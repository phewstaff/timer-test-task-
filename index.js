const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

let intervalId; // to store the interval ID
let remainingTime = 0; // to store the remaining time

const createTimerAnimator = () => {
  return (seconds) => {
    remainingTime = seconds;
    intervalId = setInterval(() => {
      remainingTime--;
      if (remainingTime <= 0) {
        clearInterval(intervalId);
      }
      const hours = Math.floor(remainingTime / 3600)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((remainingTime % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const secs = (remainingTime % 60).toString().padStart(2, "0");
      timerEl.textContent = `${hours}:${minutes}:${secs}`;
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  inputEl.value = inputEl.value.replace(/[^0-9]/g, "");
  if (inputEl.value.trim() === "") {
    buttonEl.disabled = true;
  } else {
    buttonEl.disabled = false;
  }
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);
  animateTimer(seconds);
  inputEl.value = "";
});

// Pause button
const pauseButtonEl = document.createElement("button");
pauseButtonEl.textContent = "Pause";
document.body.appendChild(pauseButtonEl);

pauseButtonEl.addEventListener("click", () => {
  clearInterval(intervalId);
});

// Continue button
const continueButtonEl = document.createElement("button");
continueButtonEl.textContent = "Continue";
continueButtonEl.disabled = true;
document.body.appendChild(continueButtonEl);

continueButtonEl.addEventListener("click", () => {
  animateTimer(remainingTime);
});

// Clear button
const clearButtonEl = document.createElement("button");
clearButtonEl.textContent = "Clear";
document.body.appendChild(clearButtonEl);

clearButtonEl.addEventListener("click", () => {
  clearInterval(intervalId);
  timerEl.textContent = "00:00:00";
  continueButtonEl.disabled = true;
});

// update Continue button status based on remainingTime
setInterval(() => {
  if (remainingTime > 0) {
    continueButtonEl.disabled = false;
  } else {
    continueButtonEl.disabled = true;
  }
}, 1000);
