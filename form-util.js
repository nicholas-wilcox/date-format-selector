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

const STYLE_PROPERTIES = [
	'dateStyle',
	'timeStyle',
];

const inputDateSelector = document.querySelector('#inputDate');
const useNowCheckbox = document.querySelector('#useNow');
const inputDateForm = document.querySelector('#inputDateForm');
const outputVisibilityForm = document.querySelector('#outputVisibilityForm');

let formatOptions = {};

function clearProperties(...props) {
	props.forEach(key => {
		delete formatOptions[key];
		document.querySelectorAll(`input[name=${key}]`).forEach(input => input.checked = false);
	});
}

function onFormatOptionChange(event) {
	if (STYLE_PROPERTIES.includes(event.target.name)) {
		clearProperties.apply(null, FORMAT_PROPERTIES);
	}
	if (FORMAT_PROPERTIES.includes(event.target.name)) {
		clearProperties.apply(null, STYLE_PROPERTIES);
	}
	formatOptions = Object.assign(formatOptions, { [event.target.name]: event.target.value || undefined });
	updateOutput();
}

document.querySelectorAll('#formatOptionsForm input[type=radio]')
	.forEach(radio => radio.addEventListener('input', onFormatOptionChange));
document.querySelectorAll('#formatOptionsForm select')
	.forEach(selector => selector.addEventListener('change', onFormatOptionChange));
