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
const inputDateSelector = document.querySelector('#inputDate');
const useNowCheckbox = document.querySelector('#useNow');
let updateDateInterval;

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
	functionNames.forEach(name => {
		document.querySelector(`#${name}Output`).innerText = inputDate[name]();
	});
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

useNowCheckbox.addEventListener('change', toggleUseNow);
inputDateSelector.addEventListener('input', computeInputDate);
