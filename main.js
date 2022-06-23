const output = document.querySelector('#output');
const inputDateSelector = document.querySelector('#inputDate');
const useNowCheckbox = document.querySelector('#useNow');
const inputDateForm = document.querySelector('#inputDateForm');

let inputDate;
let updateDateInterval;

function computeInputDate() {
  useNowCheckbox.checked = false;
  clearInterval(updateDateInterval);
  const formData = new FormData(inputDateForm);
  if (formData.get('inputDate')) {
    inputDate = new Date(formData.get('inputDate'));
    updateOutput();
  }
}

function updateOutput() {
  output.innerText = inputDate.toLocaleString([], formatOptions);
}

function toggleUseCurrentTime() {
  clearInterval(updateDateInterval);
  if (useNowCheckbox.checked) {
    inputDateSelector.value = "";
    setInputDateToNow();
    updateDateInterval = setInterval(setInputDateToNow, 1000);
  }
}

function setInputDateToNow() {
  inputDate = new Date();
  updateOutput();
}

useNowCheckbox.addEventListener('change', toggleUseCurrentTime);
inputDateSelector.addEventListener('input', computeInputDate);

// Initialize values
inputDate = new Date();
inputDateSelector.value = inputDate.toISOString().substring(0, 19);
updateOutput();
