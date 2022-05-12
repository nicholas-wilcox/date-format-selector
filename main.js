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

function setOutput(name, dateString) {
	document.querySelector(`#${name}Output`).innerText = dateString;
}

function computeDate() {
	const form = document.querySelector('#dateFormatSelectorForm');
	const formData = new FormData(form);
	const inputDate = new Date(formData.get('inputDate'));
	functionNames.forEach(name => {
		setOutput(name, inputDate[name]());
	});
}

document.querySelector('#computeDateButton').onclick = computeDate;
