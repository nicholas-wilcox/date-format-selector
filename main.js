// Option properties, split between style shorthand and explicit format options
const STYLE_PROPERTIES = ["dateStyle", "timeStyle"];
const FORMAT_PROPERTIES = [
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "dayPeriod",
  "hour",
  "minute",
  "second",
  "fractionalSecondDigits",
  "timeZoneName",
];

// Element handles
const dateInput = document.getElementById("dateInput");
const useNowCheckbox = document.getElementById("useNow");
const localesInput = document.getElementById("localesInput");
const timeZoneInput = document.getElementById("timeZoneInput");
const output = document.getElementById("output");
const optionsForm = document.getElementById("formatOptionsForm");

// Global state variables
let date;
let updateDateInterval;
let locales;
let timeZone;
let formatOptions;

function setFormatOption(name, value) {
  // If value is falsy, then just remove the property by assigning to undefined.
  Object.assign(formatOptions, { [name]: value || undefined });
}

/** Unsets any given format options */
function clearProperties(...props) {
  props.forEach((key) => {
    delete formatOptions[key];
    const rg = document.querySelector(`radio-group[name="${key}"]`);
    rg?.clear();
  });
}

function updateOutput() {
  output.innerText = date.toLocaleString(locales, {
    timeZone,
    ...formatOptions,
  });
}

function setInputDateToNow() {
  date = new Date();
  updateOutput();
}

function preventSubmitOnEnter(event) {
  if (event.code === "Enter") {
    event.preventDefault();
  }
}

// When the user toggles on "Use Current Time" checkbox,
// then start an interval to reset the time to the current time.
useNowCheckbox.addEventListener("change", () => {
  clearInterval(updateDateInterval);
  if (useNowCheckbox.checked) {
    dateInput.value = "";
    setInputDateToNow();
    updateDateInterval = setInterval(setInputDateToNow, 1000);
  }
});

// Use a manually input date value.
dateInput.addEventListener("input", () => {
  useNowCheckbox.checked = false;
  clearInterval(updateDateInterval);
  date = new Date(dateInput.value);
  updateOutput();
});

const commaSeparationRegex = /,\s*/;

// Handle locale input.
localesInput.addEventListener("input", () => {
  // Per the ECMA-402 spec on the Internationalization API (https://tc39.es/ecma402),
  // the supportedLocalesOf function will throw a RangeError when given a bad locale input.
  try {
    if (localesInput.value) {
      const inputLocales = localesInput.value
        ?.split(commaSeparationRegex)
        .filter((s) => s !== "");
      const supportedLocales =
        Intl.DateTimeFormat.supportedLocalesOf(inputLocales);

      // Set global state and remove error when we get valid input.
      if (supportedLocales.length) {
        locales = supportedLocales;
        localesInput.classList.remove("error");
      }
    } else {
      // Empty out the state variable when the input is empty
      locales = undefined;
      localesInput.classList.remove("error");
    }
  } catch {
    localesInput.classList.add("error");
  }
  updateOutput();
});

// Handle time zone input.
timeZoneInput.addEventListener("input", () => {
  // Similar situation as above, bad input will throw an error.
  try {
    if (timeZoneInput.value) {
      Intl.DateTimeFormat(undefined, { timeZone: timeZoneInput.value });
      timeZone = timeZoneInput.value;
      timeZoneInput.classList.remove("error");
    } else {
      timeZone = undefined;
      timeZoneInput.classList.remove("error");
    }
  } catch {
    timeZoneInput.classList.add("error");
  }
  updateOutput();
});

// Prevent form submission.
localesInput.addEventListener("keydown", preventSubmitOnEnter);
timeZoneInput.addEventListener("keydown", preventSubmitOnEnter);

// Handle radio input.
optionsForm.addEventListener("radioGroupInput", (event) => {
  // Ensure that setting style options erases all format options and vice-versa.
  if (STYLE_PROPERTIES.includes(event.detail.name)) {
    clearProperties(...FORMAT_PROPERTIES);
  } else if (FORMAT_PROPERTIES.includes(event.detail.name)) {
    clearProperties(...STYLE_PROPERTIES);
  }

  setFormatOption(event.detail.name, event.detail.value);
  updateOutput();
});

// Initialize values
formatOptions = {};
date = new Date();
localesInput.setAttribute("placeholder", `(e.g. "${navigator.languages[0]}")`);

// Need to manually create a date whose local time in UTC is the same as the current time in the local time zone.
const offsetDate = new Date();
offsetDate.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
dateInput.value = offsetDate.toISOString().substring(0, 19);

updateOutput();
