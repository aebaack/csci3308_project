$(document).ready(() => {
	$.get('/hangman', (data) => {
		console.log(data);
	})
})