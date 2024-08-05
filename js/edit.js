document.addEventListener("DOMContentLoaded", () => {

	const editableElements = document.querySelectorAll(
		'.header__info__greeting, .header__info__name, .header__info__role, ' +
    '.header__languages__title, .header__languages__name,' +
    '.experience__position, .experience__place, .experience__featuredPoints__point, .experience__title,' +
    '.experience__item__time, .tools__title, .tools__item__title__text, ' +
    '.education__title, .education__item__year, .education__item__title, .education__tags li, .education__item__footer,' +
    '.interests__title, .interests__tag, .contacts__text, .contacts__title, .contacts__text'
	);

	let currentEditableElement = null;

	function makeEditable(element) {
		element.setAttribute('contenteditable', true);
		element.classList.add('editable');
		currentEditableElement = element;
	}

	function saveChanges(element) {
		element.setAttribute('contenteditable', false);
		element.classList.remove('editable');
		element.classList.add('saved');
		currentEditableElement = null;
		localStorage.setItem(element.dataset.id, element.innerHTML);
		setTimeout(() => {
			element.classList.remove('saved');
		}, 500);
	}

	function cancelEditing(element) {
		element.setAttribute('contenteditable', false);
		element.classList.remove('editable');
		currentEditableElement = null;
	}

	editableElements.forEach((element, index) => {
		element.dataset.id = `editableElement-${  index}`;

		const savedContent = localStorage.getItem(element.dataset.id);
		if (savedContent) {
			element.innerHTML = savedContent;
		}

		element.addEventListener('dblclick', () => {
			makeEditable(element);
			element.focus();
		});

		element.addEventListener('blur', () => {
			saveChanges(element);
		});

		element.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				saveChanges(element);
				element.blur();
			} else if (event.key === 'Escape') {
				cancelEditing(element);
				element.blur();
			}
		});
	});

	document.addEventListener('click', (event) => {
		if (currentEditableElement && !currentEditableElement.contains(event.target)) {
			cancelEditing(currentEditableElement);
		}
	});
});