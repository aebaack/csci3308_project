var letters_left = 0;
var wrong_lets = 0;
var d = new Date();
var start_time = d.getTime();
console.log("start time = " + start_time);
var end_time;

window.onload = function() {
    document.getElementById("my_audio").play();
}

$(document).ready(() => {
	$.get('/hangman', (data) => {
		console.log(data);
		puzz = data.puzzle + " ";
		window.letters_left = puzz.replace(/\s/g, "").length;
		console.log("letters_left = " + window.letters_left);
		console.log(puzz);
		clue = data.category;
		console.log(clue);
		$("#clue").text(clue);
		var i = 0;
		var ind = 0;
		var row = "";
		while (puzz.length > 1){
			i = 0;
			while (i<15 && i<puzz.length) {
				if (puzz[i] == ' ') {
					ind = i;
				}
				i++;
			}
			i = 0;
			row += "<tr>";
			var vowels = "AEIODTNH";
			while (i<ind) {
				if (puzz[i] == " ") {
					row += "<td><div class='tile'><h1></h1></div></td>";
				}
				// else if (i%4 == 0) {
				// 	row += "<td><div class='" + puzz[i] + "'><h1>" + puzz[i] + "</h1></div></td>";
				// 	window.letters_left -= 1;
				// }
				else if (vowels.includes(puzz[i])) {
					row += "<td><div class='" + puzz[i] + "'><h1>" + puzz[i] + "</h1></div></td>";
					window.letters_left -= 1;
				}
				else {
					row += "<td><div class='" + puzz[i] + "'><h1>_</h1></div></td>";
				}
				i++;
			}
			row += "</tr>";
			puzz = puzz.substring(ind + 1, puzz.length);
			console.log(puzz);
			ind = 0;
		}
		$("#puzz").html(row);
		row="";
		// alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		alph = "BCFGJKLMPQRSUVWXYZ";
		i=0;
		row += "<tr>";
		for (i=0; i<6; i++) {
			row += "<td><button type='button' class='btn btn-success active' id='" + alph[i] + "' onclick='letter_check(\"" + alph[i] + "\")'><h3>" + alph[i] + "</h3></button></td>";
		}
		row += "</tr>";
		row += "<tr>";
		for (i=6; i<12; i++) {
			row += "<td><button type='button' class='btn btn-success active' id='" + alph[i] + "' onclick='letter_check(\"" + alph[i] + "\")'><h3>" + alph[i] + "</h3></button></td>";
		}
		row += "</tr>";
		row += "<tr>";
		for (i=12; i<18; i++) {
			row += "<td><button type='button' class='btn btn-success active' id='" + alph[i] + "' onclick='letter_check(\"" + alph[i] + "\")'><h3>" + alph[i] + "</h3></button></td>";
		}
		row += "</tr>";
		$("#keyboard").html(row);
	})
})

function letter_check(let) {
	var matches = document.getElementsByClassName(let);
	if (matches.length > 0) {
		var i;
		for (i=0; i<matches.length; i++) {
			if(matches[i].innerHTML != "<h1>" + let + "</h1>") {
				matches[i].innerHTML = "<h1>" + let + "</h1>";
				letters_left = letters_left - 1;
			}
		}
		console.log("letters_left = " + letters_left);
		var btn = document.getElementById(let);
		btn.setAttribute("class", "btn btn-success disabled");
		document.getElementById(let).disabled = true;
	}
	else {
		var btn = document.getElementById(let);
		btn.setAttribute("class", "btn btn-danger disabled");
		window.wrong_lets = window.wrong_lets + 1;
	}
	$(document).ready(() => {
		if (letters_left == 0) {
			document.getElementById("my_audio").pause();
			var d2 = new Date();
			var end_time = d2.getTime();
			console.log("end time = " + end_time);
			var total_time = end_time - start_time;
			console.log("total time = " + total_time);
			console.log("wrong_lets = " + wrong_lets);
			var score = 50 - (total_time/1000) - wrong_lets*4;

			$.get('/users', (user_data) => {
				var old_score = user_data.score;
				var new_score = Math.round(score) + old_score;
				if (score >= 0) {
					$.post("/users/score", {"score": new_score});
				}
			})
			if (Math.round(score) > 0) {
				document.getElementById("modal-body").innerHTML = "<p>You earned " + Math.round(score) + " points.</p>";
			}
			else {
				document.getElementById("modal-body").innerHTML = "<p>You earned 0 points.</p>";
			}
			var modal = document.getElementById('myModal');
			modal.style.display = "block";
		}
	})
}
