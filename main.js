const output = document.getElementById('output');
const inputDateSelector = document.getElementById('inputDate');
const useNowCheckbox = document.getElementById('useNow');
const inputLocale = document.getElementById('locale');
const timeZoneInput = document.getElementById('timeZone');
const inputDateForm = document.getElementById('inputDateForm');

let inputDate;
let updateDateInterval;
let locales;
let timeZone;

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
  output.innerText = inputDate.toLocaleString(locales, Object.assign({timeZone, ...formatOptions}));
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

function updateLocale() {
  try {
    if (inputLocale.value) {
      const inputLocales = inputLocale.value?.split(/,\s*/).filter(s => s !== '');
      const supportedLocales = Intl.DateTimeFormat.supportedLocalesOf(inputLocales);
      if (supportedLocales.length) {
        locales = supportedLocales;
        inputLocale.classList.remove('error');
      }
    } else {
      inputLocale.classList.remove('error');
    }
  } catch {
    inputLocale.classList.add('error');
  }
  updateOutput();
}

function updateTimeZone() {
  try {
    if (timeZoneInput.value) {
      Intl.DateTimeFormat(undefined, {timeZone: timeZoneInput.value});
      timeZone = timeZoneInput.value;
      timeZoneInput.classList.remove('error');
    } else {
      timeZoneInput.classList.remove('error');
    }
  } catch {
    timeZoneInput.classList.add('error');
  }
  updateOutput();
}

function preventSubmit(event) {
  if (event.code === 'Enter') {
    event.preventDefault();
  }
}

useNowCheckbox.addEventListener('change', toggleUseCurrentTime);
inputDateSelector.addEventListener('input', computeInputDate);
inputLocale.addEventListener('input', updateLocale);
inputLocale.addEventListener('keydown', preventSubmit);
timeZoneInput.addEventListener('input', updateTimeZone);
timeZoneInput.addEventListener('keydown', preventSubmit);

// Initialize values
inputDate = new Date();
inputDateSelector.value = inputDate.toISOString().substring(0, 19);
inputLocale.setAttribute('placeholder', `(e.g. "${navigator.languages[0]}")`);
updateOutput();
