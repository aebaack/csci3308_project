$(document).ready(() => {
	$.get('/hangman', (data) => {
		console.log(data);
		puzz = data.puzzle + " ";
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
			while (i<ind) {
				if (puzz[i] == " ") {
					row += "<td><div class='tile'><h1></h1></div></td>";
				}
				else {
					row += "<td><div class='" + puzz[i] + "'><h1>_</h1></div></td>";
				}
				i++;
			}
			row += "</tr>";
			puzz = puzz.substring(ind, puzz.length);
			console.log(puzz);
			ind = 0;
		}
		$("#puzz").html(row);
		row="";
		alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		i=0;
		row += "<tr>";
		for (i=0; i<9; i++) {
			row += "<td><button type='button' class='btn btn-success active' id='" + alph[i] + "' onclick='letter_check(\"" + alph[i] + "\")'><h3>" + alph[i] + "</h3></button></td>";					
		}
		row += "</tr>";
		row += "<tr>";
		for (i=9; i<18; i++) {
			row += "<td><button type='button' class='btn btn-success active' id='" + alph[i] + "' onclick='letter_check(\"" + alph[i] + "\")'><h3>" + alph[i] + "</h3></button></td>";					
		}
		row += "</tr>";
		row += "<tr>";
		for (i=18; i<26; i++) {
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
			matches[i].innerHTML = "<h1>" + let + "</h>";
		}
		var btn = document.getElementById(let);
		btn.setAttribute("class", "btn btn-success disabled");
	}
	else {
		var btn = document.getElementById(let);
		btn.setAttribute("class", "btn btn-danger disabled");
	}

}