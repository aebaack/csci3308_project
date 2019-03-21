Google News:

	API Key: 85582d6364bb492ca683e9cf18d34dd3
	Must add link to newsapi.org attributing to them

	var url = 'https://newsapi.org/v2/top-headlines?' +
	          'country=us&' +
	          'apiKey=85582d6364bb492ca683e9cf18d34dd3';
	var req = new Request(url);
	fetch(req)
	    .then(function(response) {
	        console.log(response.json());
	    })

	returns JSON, just need "title" and "url", maybe urlToImage

Weather:

	https://api.weather.gov/points/39.7456,-97.0892/forecast

	Would just need "temperature", "shortForecast", "name", "windSpeed"
	for day and night for today and tomorrow?

Latitude and Longitude:
	
	Do not want to use location services, so if user wants weather,
	they need to input their zip code as part of registration.
	Have "Zip Codes.txt" file with lat/long of every zip code,
	need to load that into database, search for lat/long based on
	user zip code. Could not find free api for doing this.

Twitter:

	There do not appear to be any good ways to accomplish this.

Quote of the Day:

	https://quotes.rest/qod

	returns XML, just need "quote" and "author" fields.

This day in history:

	must provide attribution with a link to http://www.hiztory.org/.

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');

	"http://api.hiztory.org/date/event/"+mm+"/"+dd+"/api.xml"
	"http://api.hiztory.org/date/birth/"+mm+"/"+dd+"/api.xml"
	"http://api.hiztory.org/date/death/"+mm+"/"+dd+"/api.xml"

NASA Astronomy Picture of the Day:
	
	API Key: aOGxRi5jcDnftQ8diN3uxun03nqaiP0leeYbJUvu
	https://api.nasa.gov/planetary/apod?api_key=aOGxRi5jcDnftQ8diN3uxun03nqaiP0leeYbJUvu

	returns JSON?
	Just have to pull "url", is link to image, and "title"

Random Cat GIFs:

	https://api.gfycat.com/v1/gfycats/trending?count=1
	https://cataas.com/cat/gif

Tenor GIF Database API:

	Key: DUOD1ML0KJP3
	Random Cat GIF: https://api.tenor.com/v1/random?q=cat&key=DUOD1ML0KJP3&limit=1&ar_range=standard
	Random Dog GIF: https://api.tenor.com/v1/random?q=dog&key=DUOD1ML0KJP3&limit=1&ar_range=standard
	Random Funny GIF: https://api.tenor.com/v1/random?q=funny&key=DUOD1ML0KJP3&limit=1&ar_range=standard
	Random Fail GIF: https://api.tenor.com/v1/random?q=fail&key=DUOD1ML0KJP3&limit=1&ar_range=standard
	Random Cute GIF: https://api.tenor.com/v1/random?q=cute&key=DUOD1ML0KJP3&limit=1&ar_range=standard

	For attribution, include the Tenor Logo.jpg under or in the corner of the GIF