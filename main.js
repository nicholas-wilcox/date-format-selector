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

let inputDate;
const computeDateButton = document.querySelector('#computeDateButton');
const useNowCheckbox = document.querySelector('#useNow');
let updateDateInterval;

function computeDate() {
	clearInterval(updateDateInterval);
	const form = document.querySelector('#dateFormatSelectorForm');
	const formData = new FormData(form);
	inputDate = new Date(formData.get('inputDate'));
	updateOutput();
}

function updateOutput() {
	functionNames.forEach(name => {
		document.querySelector(`#${name}Output`).innerText = inputDate[name]();
	});
}

function toggleUseNow() {
	clearInterval(updateDateInterval);
	if (useNowCheckbox.checked) {
		setInputDateToNow();
		updateDateInterval = setInterval(setInputDateToNow, 1000);
	}
}

function setInputDateToNow() {
	inputDate = new Date();
	updateOutput();
}

computeDateButton.addEventListener('click', computeDate);
useNowCheckbox.addEventListener('change', toggleUseNow);
