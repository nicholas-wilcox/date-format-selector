const FORMAT_PROPERTIES = [
  'weekday',
  'era',
  'year',
  'month',
  'day',
  'dayPeriod',
  'hour',
  'minute',
  'second',
  'fractionalSecondDigits',
  'timeZoneName',
];

const DATE_FORMAT_PROPERTIES = [
  'era',
  'weekday',
  'year',
  'month',
  'day',
];

const STYLE_PROPERTIES = [
  'dateStyle',
  'timeStyle',
];

let formatOptions = {};

function clearProperties(...props) {
  props.forEach(key => {
    delete formatOptions[key];
    const rg = document.querySelector(`radio-group[name="${key}"]`);
    rg?.clear();
  });
}

function onRadioGroupInput(event) {
  if (STYLE_PROPERTIES.includes(event.detail.name)) {
    clearProperties.apply(null, FORMAT_PROPERTIES);
  }
  if (FORMAT_PROPERTIES.includes(event.detail.name)) {
    clearProperties.apply(null, STYLE_PROPERTIES);
  }
  formatOptions = Object.assign(formatOptions, { [event.detail.name]: event.detail.value || undefined });
  updateOutput();
}

document.querySelectorAll('radio-group').forEach(rg => rg.addEventListener('radioGroupInput', onRadioGroupInput));
