const params = new URLSearchParams(window.location.search);
//const inputDateSelector = document.querySelector('#inputDate');
//const useNowCheckbox = document.querySelector('#useNow');
//const inputDateForm = document.querySelector('#inputDateForm');
//const outputVisibilityForm = document.querySelector('#outputVisibilityForm');
const outputContainer = document.querySelector('#output');

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

function updateOutputVisibility() {
	const showList = params.getAll('s');
	let shouldHide;
	if (showList.length === 0) {
		shouldHide = code => false;
	} else {
		shouldHide = code => !showList.includes(code);
	}

	const formData = new FormData(outputVisibilityForm);
	const hasSetShowNonLocale = formData.get('showNonLocale') !== null;
	const hasSetShowRedundant = formData.get('showRedundant') !== null;
	const hasSetEither = hasSetShowNonLocale || hasSetShowRedundant;
	const hideNonLocale = (formData.get('showNonLocale') ?? 'true') === 'false';
	const hideRedundant = (formData.get('showRedundant') ?? 'true') === 'false';
	const getOutputRow = code => document.querySelector(`.dateStringOutputRow[row-code=${code}]`);

	[
		['ts', hasSetShowNonLocale ? hideNonLocale : shouldHide('ts')],
		['tds', hasSetEither ? hideNonLocale || hideRedundant : shouldHide('tds')],
		['tts', hasSetEither ? hideNonLocale || hideRedundant : shouldHide('tts')],
		['tis', hasSetShowNonLocale ? hideNonLocale : shouldHide('tis')],
		['tus', hasSetShowNonLocale ? hideNonLocale : shouldHide('tus')],
		['tls', shouldHide('tls')],
		['tlds', hasSetShowRedundant ? hideRedundant : shouldHide('tlds')],
		['tlts', hasSetShowRedundant ? hideRedundant : shouldHide('tlts')],
	].forEach(([code, value]) => getOutputRow(code).classList.toggle('hidden', value));
}

useNowCheckbox.addEventListener('change', toggleUseNow);
inputDateSelector.addEventListener('input', computeInputDate);
document.querySelectorAll('#outputVisibilityForm input[type=radio]')
	.forEach(radio => radio.addEventListener('input', updateOutputVisibility));
//document.querySelectorAll('#formatOptionsForm input[type=radio]')
//	.forEach(radio => radio.addEventListener('input', onFormatOptionRadioInput));

// Initialize values
inputDate = new Date();
inputDateSelector.value = inputDate.toISOString().substring(0, 19);
updateOutput();
updateOutputVisibility();
outputContainer.classList.toggle('hidden', false);
