document.addEventListener("DOMContentLoaded", () => {
	const rippleElements = document.querySelectorAll(
		'.header__photo, .header__info, .header__languages, ' +
    '.experience, .tools, .education, .interests, .contacts'
	);

	rippleElements.forEach(element => {
		element.classList.add('ripple');

		element.addEventListener('click', event => {
			const rect = element.getBoundingClientRect();
			const rippleElement = document.createElement('div');
			const size = Math.max(rect.width, rect.height);
			const left = event.clientX - rect.left - size / 2;
			const top = event.clientY - rect.top - size / 2;

			rippleElement.style.width = `${size}px`;
			rippleElement.style.height = `${size}px`;
			rippleElement.style.left = `${left}px`;
			rippleElement.style.top = `${top}px`;
			rippleElement.classList.add('ripple-effect');

			element.appendChild(rippleElement);

			rippleElement.addEventListener('animationend', () => {
				rippleElement.remove();
			});
		});
	});
});