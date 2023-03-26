export const removeStyles = function (list) {
	for (let i = 0; i < list.length; i++) {
		list[i].classList.remove('selectedTicker');
	}
}

