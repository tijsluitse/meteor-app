var SunCalc = require('suncalc');

Template.cafesMap.helpers ({
  	Cafes: function(){
    	return Cafes.find({});
  	}
})

Meteor.startup(function() {    	
	GoogleMaps.load();
});

Template.cafesMap.helpers({ 
  	mapOptions: function() {
	    if (GoogleMaps.loaded()) {
	      	return {
	        	center: new google.maps.LatLng(52.367153, 4.893645),
	        	zoom: 12
	      	};
	    }
  	}
});

Template.cafesMap.onCreated(function() {  
  	GoogleMaps.ready('map', function(map) {
    	console.log("Map is ready");

    	var allPlaces = Cafes.find().fetch();
    	var latPosition = Session.get('latPos');
	    var lngPosition = Session.get('lngPos');
	    var date = new Date();

	    var currentPosition = new google.maps.Marker({
	       	draggable: false,
	       	animation: google.maps.Animation.DROP,
	       	class: "maps-marker current-position",
	       	position: new google.maps.LatLng(latPosition, lngPosition),
	       	map: map.instance	       
	   	});

    	allPlaces.forEach(function(singlePlace){

    		var sunTimes = SunCalc.getTimes(new Date(), singlePlace.Lattitude, singlePlace.Longtitude);
    		
    		Meteor.call('checkCurrentWeather', singlePlace.Lattitude, singlePlace.Longtitude, callback);

    		function callback (err, res) {
                if (err) {
                    console.log("error: " + err);
                    return false;
                }
                Session.set('weather', res);               
                var weatherData = Session.get('weather');
                
                var setWeather = weatherData.weather[0].description;
                var setTemp = weatherData.main.temp;
                var setWind = weatherData.wind.speed;

                Meteor.call('setWeather', singlePlace._id, setTemp, setWeather, setWind);
            }

            // var sunriseData = singlePlace.sunrise;
            // var subString = sunriseData.substring(1,5);
            // console.log(subString);

            // console.log(singlePlace.sunrise);

    		Meteor.call('setSunTimes', singlePlace._id, sunTimes.sunrise, sunTimes.sunset);		

    		var marker = new google.maps.Marker({
		       	draggable: false,
		       	animation: google.maps.Animation.DROP,
		       	class: "maps-marker",
		       	position: new google.maps.LatLng(singlePlace.Lattitude, singlePlace.Longtitude),
		       	map: map.instance,		       
		       	icon: "images/pin.png"
		   	});

		    var content = 
			    '<a class="cafeMapItem" href="' + '/singleCafe/' + singlePlace._id + '">' +
			    '<div id="content">' +
	            '<h1 id="firstHeading" class="firstHeading">'+ singlePlace.Name + '</h1>' +	       
	            '<p id="coordinates">Coordinates: ' + '<span id="lat">' + singlePlace.Lattitude + '</span>, <span id="lng"> ' + singlePlace.Longtitude + '</span></p>' + 
	            '<div id="bodyContent">' +
	     		'<img id="infoWindowImage" src="' + singlePlace.Image + '" alt="' + singlePlace.Name + '"/>' +
	     		'<span class="weatherItem"><img class="smallImg" src="images/pin.svg"><p>Address: ' + singlePlace.Adres + '</p></span>' +
	     		'<span class="weatherItem"><img class="smallImg" src="images/sunrise.svg"><p>Sun: ' + singlePlace.sunrise + '</p></span>' +
	     		'<span class="weatherItem"><img class="smallImg" src="images/sunset.svg"><p>Till: ' + singlePlace.sunset + '</p></span>' +
	     		'<span class="weatherItem"><img class="smallImg" src="images/temp.svg"><p>Temp: ' + singlePlace.temprature + '</p></span>' +
	            '</div>' +
	            '</div>' +
	            '</a>';

		    var infoWindow = new google.maps.InfoWindow({
		      	content: content,
		      	marker: marker
		  	});

		    marker.addListener('click', function() {
		        infoWindow.open(map.instance, marker);
		    });
	
		    marker.addListener('mouseout', function() {
		        // infoWindow.close();
		    });
		   	
    	});

  	});
});


