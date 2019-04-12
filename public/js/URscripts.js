

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


				