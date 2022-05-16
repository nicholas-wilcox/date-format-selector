const functionNames = [
	'toString',
	'toDateString',
	'toTimeString',
	'toISOString',
	'toUTCString',
	'toLocaleString',
	'toLocaleDateString',
	'toLocaleTimeString',
];

const omitFromDateOptions = [
	"timeStyle",
];

const omitFromTimeOptions = [
	"dateStyle",
];

const inputDateSelector = document.querySelector('#inputDate');
const useNowCheckbox = document.querySelector('#useNow');

let inputDate;
let updateDateInterval;
let formatOptions = {};

function computeInputDate() {
	useNowCheckbox.checked = false;
	clearInterval(updateDateInterval);
	const form = document.querySelector('#dateFormatSelectorForm');
	const formData = new FormData(form);
	if (formData.get('inputDate')) {
		inputDate = new Date(formData.get('inputDate'));
		updateOutput();
	}
}

function updateOutput() {
	setOutput('toString', inputDate.toString());
	setOutput('toDateString', inputDate.toDateString());
	setOutput('toTimeString', inputDate.toTimeString());
	setOutput('toISOString', inputDate.toISOString());
	setOutput('toUTCString', inputDate.toUTCString());
	setOutput('toLocaleString', inputDate.toLocaleString([], formatOptions));

	const dateFormatOptions = Object.assign({}, formatOptions);
	omitFromDateOptions.forEach(property => delete dateFormatOptions[property]);
	setOutput('toLocaleDateString', inputDate.toLocaleDateString([], dateFormatOptions));

	const timeFormatOptions = Object.assign({}, formatOptions);
	omitFromTimeOptions.forEach(property => delete timeFormatOptions[property]);
	setOutput('toLocaleTimeString', inputDate.toLocaleTimeString([], timeFormatOptions));
}

function setOutput(name, value) {
	document.querySelector(`#${name}Output`).innerText = value;
}

function toggleUseNow() {
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

function onRadioInput(event) {
	formatOptions = Object.assign(formatOptions, { [event.target.name]: event.target.value });
	updateOutput();
	console.log(formatOptions);
}

useNowCheckbox.addEventListener('change', toggleUseNow);
inputDateSelector.addEventListener('input', computeInputDate);
document.querySelectorAll('input[type=radio]').forEach(radio => radio.addEventListener('input', onRadioInput));

// Initialize values
inputDate = new Date();
inputDateSelector.value = inputDate.toISOString().substring(0, 19);
updateOutput();
