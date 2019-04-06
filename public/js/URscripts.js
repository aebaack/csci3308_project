

function noIntrests(id1,id2,id3,id4)
{
	if (document.getElementById(id1).disabled == false)
	{
		document.getElementById(id1).disabled = true;
		document.getElementById(id2).disabled = true;
		document.getElementById(id3).disabled = true;
		document.getElementById(id4).disabled = true;
	}

	else if (document.getElementById(id1).disabled == true)
	{
		document.getElementById(id1).disabled = false;
		document.getElementById(id2).disabled = false;
		document.getElementById(id3).disabled = false;
		document.getElementById(id4).disabled = false;
	}
}

function openNav1() {
  document.getElementById("myNav1").style.display = "block";
}

function openNav2() {
  document.getElementById("myNav2").style.display = "block";
}

function openNav3() {
  document.getElementById("myNav3").style.display = "block";
}

function openNav4() {
  document.getElementById("myNav4").style.display = "block";
}

function closeNav1() {
  document.getElementById("myNav1").style.display = "none";
}

function closeNav2() {
  document.getElementById("myNav2").style.display = "none";
}

function closeNav3() {
  document.getElementById("myNav3").style.display = "none";
}

function closeNav4() {
  document.getElementById("myNav4").style.display = "none";
}


				