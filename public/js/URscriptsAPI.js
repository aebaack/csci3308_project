
$(document).ready(function() {
	// Build tempIDArray
	var tempIdArray = [];
	var ind0 = false;
	var ind1 = false;
	var ind2 = false;
	var ind3 = false;
	var ind4 = false;
	var ind5 = false;

	$.get('/users',(data)=> {
    	//console.log(data.api[1]);
    	for (var i = 0; i < data.api.length; i++) {
    		var tempId = "api" + i
    		if (data.api[i] == "Google") {
    			tempIdArray[i] = 0;
    			ind0 = true;
    		}
    		else if (data.api[i] == "Quote") {
    			tempIdArray[i] = 1;
    			ind1 = true;
    		}
    		else if (data.api[i] == "NASA") {
    			tempIdArray[i] = 2;
    			ind2 = true;
    		}
    		else if (data.api[i] == "Reddit") {
    			tempIdArray[i] = 3;
    			ind3 = true;
    		}
    		else if (data.api[i] == "Weather") {
    			tempIdArray[i] = 4;
    			ind4 = true;
    		}
    		else {
    			tempIdArray[i] = 5;
    			ind5 = true;
    		}
    	}

		if (ind0 == false) {
			tempIdArray.push(0);
		}
		if (ind1 == false) {
			tempIdArray.push(1);
		}
		if (ind2 == false) {
			tempIdArray.push(2);
		}
		if (ind3 == false) {
			tempIdArray.push(3);
		}
		if (ind4 == false) {
			tempIdArray.push(4);
		}
		if (ind5 == false) {
			tempIdArray.push(5);
		}

		console.log(tempIdArray)

	
	// Google News: 0; quote: 1; NASA: 2; reddit: 3; weather: 4; gif: 5
		var API_id0 = "";
		var API_id1 = "";
		var API_id2 = "";
		var API_id3 = "";
		var API_id4 = "";
		var API_id5 = "";

		for (var i = 0; i < tempIdArray.length; i++) {
			if ( tempIdArray[i] == 0 ) {
				API_id0 =  "API" + i;
				var url_gn  = 'https://newsapi.org/v2/top-headlines?' +
				'country=us&' +
				'apiKey=85582d6364bb492ca683e9cf18d34dd3';
				$.ajax({url:url_gn , dataType:"json"}).then(function(data_gn) {
					//console.log(data_gn); //Review all of the data returned

					document.getElementById(API_id0).innerHTML = '<h1 class="text-center card-header">Google News</h1> &nbsp';

					document.getElementById(API_id0).innerHTML += '<img class="card-img-top" src="' + data_gn.articles[0].urlToImage + '" alt="gImg"> &nbsp';

					document.getElementById(API_id0).innerHTML += '<h5 class="card-title text-center">' + data_gn.articles[0].title + '</h5>';
					document.getElementById(API_id0).innerHTML += '<p> Learn More: </p>';

					document.getElementById(API_id0).innerHTML += '<a target=:"_blank" href = "' + data_gn.articles[0].url + '"> Visit Website </a>';
				})
			}
			else if (tempIdArray[i] == 1 ) {
				API_id1 =  "API" + i;
				var url_quote  = 'https://quotes.rest/qod'
				$.ajax({url:url_quote , dataType:"json"}).then(function(data_quote) {
					//console.log(data_quote);
					document.getElementById(API_id1).innerHTML = '<h1 class="text-center card-header">Quote of The Day</h1> &nbsp';
					document.getElementById(API_id1).innerHTML += '<div class = "jumbotron"> <h5 class="card-title text-center">' + data_quote.contents.quotes[0].quote + '</h5><h5 class="text-right"> ~' + data_quote.contents.quotes[0].author + ' </h5> </div>'; 
				})
			}
			else if (tempIdArray[i] == 2 ) {
				API_id2 =  "API" + i;
				var url_NASA  = "https://api.nasa.gov/planetary/apod?api_key=aOGxRi5jcDnftQ8diN3uxun03nqaiP0leeYbJUvu"
				$.ajax({url:url_NASA , dataType:"json"}).then(function(data_NASA) {
					//console.log(data_NASA);
					document.getElementById(API_id2).innerHTML = '<h1 class="text-center card-header">NASA Pic of The Day</h1> &nbsp';
					document.getElementById(API_id2).innerHTML += '<h5 class="card-title text-center">' + data_NASA.title + '</h5>';
					document.getElementById(API_id2).innerHTML += '<img class="card-img" src="' + data_NASA.hdurl + '" alt="gImg"> &nbsp';
					document.getElementById(API_id2).innerHTML += '<p>' + data_NASA.explanation + '</p>';
				})
			}
			else if (tempIdArray[i] == 3 ) {
				API_id3 =  "API" + i;
				$.getJSON('https://www.reddit.com/r/all/top.json',function(data_red1){
					var data_red = data_red1.data.children;
					//console.log(data_red[1].data)
					document.getElementById(API_id3).innerHTML = '<h1 class="text-center card-header">Top 3 Reddit Posts</h1> &nbsp';
					for (var i = 0; i < 3; i++){
						console.log()
						document.getElementById(API_id3).innerHTML += "<div class = 'jumbotron reddit' > <img src='" + data_red[i].data.thumbnail + "' alt=' '><h4>" + data_red[i].data.title + "</h4> <a target='_blank' href ='https://www.reddit.com/" + data_red[i].data.permalink + "'>See Post</a></br> </div>";		//get title and link from reddit top, can be adjusted in format. To get author -> this.data.author/ get sub -> this.data.subreddit
					}
					document.getElementById(API_id3).innerHTML += '</ol>'
				})
			}
			else if (tempIdArray[i] == 4 ) {
				API_id4 =  "API" + i;
				$.get('/users', (user_data) => {
					var user_zip = user_data.zip_code;
					$.getJSON('https://api.geocod.io/v1.3/geocode?postal_code=' + user_zip + '&api_key=cc5dd5a9903e0669aaaad3de56c05cc6a3d8e3d',function(data_zip){
					//console.log(data_zip);
					var lat = data_zip.results[0].location.lat;
					var long = data_zip.results[0].location.lng;
					$.getJSON('https://api.weather.gov/points/' + lat + ',' + long + '/forecast', function(data_weath){
						//console.log(data_weath);
						var in_HTML = '<h1 class="text-center card-header">Weather Forecast</h1>';
						in_HTML += "&nbsp;"
						in_HTML += "<div class='container'><div class='row'><div class='card weather col-sm-4 mx-auto'><h3>" + data_weath.properties.periods[0].name + "</h3><p>" + data_weath.properties.periods[0].shortForecast + "</p><p>Temp: " + data_weath.properties.periods[0].temperature + " F</p><p>Wind: " + data_weath.properties.periods[0].windSpeed + " " + data_weath.properties.periods[0].windDirection + " </p></div>";
						in_HTML += "<div class='card weather col-sm-4 mx-auto'><h3>" + data_weath.properties.periods[1].name + "</h3><p>" + data_weath.properties.periods[1].shortForecast + "</p><p>Temp: " + data_weath.properties.periods[1].temperature + " F</p><p>Wind: " + data_weath.properties.periods[1].windSpeed + " " + data_weath.properties.periods[1].windDirection + " </p></div></div><br>";
						in_HTML += "<div class='row'><div class='card weather col-sm-4 mx-auto'><h3>" + data_weath.properties.periods[2].name + "</h3><p>" + data_weath.properties.periods[2].shortForecast + "</p><p>Temp: " + data_weath.properties.periods[2].temperature + " F</p><p>Wind: " + data_weath.properties.periods[2].windSpeed + " " + data_weath.properties.periods[2].windDirection + " </p></div>";
						in_HTML += "<div class='card weather col-sm-4 mx-auto'><h3>" + data_weath.properties.periods[3].name + "</h3><p>" + data_weath.properties.periods[3].shortForecast + "</p><p>Temp: " + data_weath.properties.periods[3].temperature + " F</p><p>Wind: " + data_weath.properties.periods[3].windSpeed + " " + data_weath.properties.periods[3].windDirection + " </p></div></div></div>";
						document.getElementById(API_id4).innerHTML = in_HTML;
						})
					})
				})
				
			}
			else if (tempIdArray[i] == 5 ) {
				API_id5 =  "API" + i;
				var user_gif_pref = "funny";
				$.getJSON('https://api.tenor.com/v1/random?q=' + user_gif_pref + '&key=DUOD1ML0KJP3&limit=1&ar_range=standard',function(data_gif){
					//console.log(data_gif);
					document.getElementById(API_id5).innerHTML = '<h1 class="text-center card-header">Random GIF</h1> &nbsp';
					document.getElementById(API_id5).innerHTML += "<div class='jumbotron reddit text-center'><img src='" + data_gif.results[0].media[0].mediumgif.url + "' alt='" + data_gif.results[0].itemurl + "'></div>";
				})
			}
		}
	})
});




function openNav0() {
	document.getElementById("API0z").innerHTML = document.getElementById("API0").innerHTML
	document.getElementById("myNav0").style.display = "block";
}

function openNav1() {
	document.getElementById("API1z").innerHTML = document.getElementById("API1").innerHTML
	document.getElementById("myNav1").style.display = "block";
}

function openNav2() {
	document.getElementById("API2z").innerHTML = document.getElementById("API2").innerHTML
	document.getElementById("myNav2").style.display = "block";
}

function openNav3() {
	document.getElementById("API3z").innerHTML = document.getElementById("API3").innerHTML
	document.getElementById("myNav3").style.display = "block";
}

function openNav4() {
	document.getElementById("API4z").innerHTML = document.getElementById("API4").innerHTML
	document.getElementById("myNav4").style.display = "block";
}

function openNav5() {
	document.getElementById("API5z").innerHTML = document.getElementById("API5").innerHTML
	document.getElementById("myNav5").style.display = "block";
}

function closeNav0() {
	document.getElementById("myNav0").style.display = "none";
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

function closeNav5() {
	document.getElementById("myNav5").style.display = "none";
}
