const dateInput = document.getElementById('dateInput');
const useNowCheckbox = document.getElementById('useNow');
const localesInput = document.getElementById('localesInput');
const timeZoneInput = document.getElementById('timeZoneInput');
const output = document.getElementById('output');
const dateForm = document.getElementById('dateForm');

let date;
let updateDateInterval;
let locales;
let timeZone;

function computeInputDate() {
  useNowCheckbox.checked = false;
  clearInterval(updateDateInterval);
  date = new Date(dateInput.value);
  updateOutput();
}

function updateOutput() {
  output.innerText = date.toLocaleString(locales, {timeZone, ...formatOptions});
}

function toggleUseCurrentTime() {
  clearInterval(updateDateInterval);
  if (useNowCheckbox.checked) {
    dateInput.value = "";
    setInputDateToNow();
    updateDateInterval = setInterval(setInputDateToNow, 1000);
  }
}

function setInputDateToNow() {
  date = new Date();
  updateOutput();
}

function updateLocale() {
  try {
    if (localesInput.value) {
      const inputLocales = localesInput.value?.split(/,\s*/).filter(s => s !== '');
      const supportedLocales = Intl.DateTimeFormat.supportedLocalesOf(inputLocales);
      if (supportedLocales.length) {
        locales = supportedLocales;
        localesInput.classList.remove('error');
      }
    } else {
      localesInput.classList.remove('error');
    }
  } catch {
    localesInput.classList.add('error');
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
dateInput.addEventListener('input', computeInputDate);
localesInput.addEventListener('input', updateLocale);
localesInput.addEventListener('keydown', preventSubmit);
timeZoneInput.addEventListener('input', updateTimeZone);
timeZoneInput.addEventListener('keydown', preventSubmit);

// Initialize values
date = new Date();
localesInput.setAttribute('placeholder', `(e.g. "${navigator.languages[0]}")`);

// Need to manually create a date whose local time in UTC is the same as the current time in the local time zone.
const offsetDate = new Date();
offsetDate.setTime(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));
dateInput.value = offsetDate.toISOString().substring(0, 19);

updateOutput();
