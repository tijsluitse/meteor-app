var SunCalc = require('suncalc');

Template.cafesMap.helpers ({
  	Cafes: function(){
    	return Cafes.find({});
  	}
})

Meteor.startup(function() {  
  	GoogleMaps.load();
  	setInterval(function(){
  		navigator.geolocation.getCurrentPosition(function (data) { 
            
	        var latPos = data['coords']['latitude'];
	        var lngPos = data['coords']['longitude'];

	        Session.set('latPos', latPos);
	        Session.set('lngPos', lngPos);

	    }); 
  	}, 5000);
});

Template.cafesMap.helpers({  
  	mapOptions: function() {
	    if (GoogleMaps.loaded()) {
	    	var latPosition = Session.get('latPos');
	    	var lngPosition = Session.get('lngPos');
	      	return {
	        	center: new google.maps.LatLng(latPosition, lngPosition),
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

    	allPlaces.forEach(function(singlePlace){

    		var sunTimes = SunCalc.getTimes(date, singlePlace.Lattitude, singlePlace.Longtitude);
    		
    		Meteor.call('checkCurrentWeather', singlePlace.Lattitude, singlePlace.Longtitude, callback);
    		Meteor.call('setSunTimes', singlePlace._id, sunTimes.sunrise, sunTimes.sunset)

    		function callback (err, res) {
		    	if (err) {
		       	 	console.log(err);
		        	return false;
		    	}
		    	Session.set('weather', res);
			}

			weatherData = Session.get('weather');

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
	     		'<span class="weatherItem"><img class="smallImg" src="images/sunrise.svg"><p>Sun: ' + sunTimes.sunrise + '</p></span>' +
	     		'<span class="weatherItem"><img class="smallImg" src="images/sunset.svg"><p>Till: ' + sunTimes.sunset + '</p></span>' +
	     		'<span class="weatherItem"><img class="smallImg" src="images/temp.svg"><p>Temp: ' + weatherData.main.temp + '</p></span>' +
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

    	var currentPosition = new google.maps.Marker({
	       	draggable: false,
	       	animation: google.maps.Animation.DROP,
	       	class: "maps-marker current-position",
	       	position: new google.maps.LatLng(latPosition, lngPosition),
	       	map: map.instance	       
	   	});

  	});
});

Template.cafesMap.events({
	"click .cafeMapItem": function(event) {
		
		var lat = document.getElementById("lat").innerHTML;
		var lng = document.getElementById("lng").innerHTML;

		Meteor.call('checkCurrentWeather', lat, lng, callback);

		function callback (err, res) {
	    	if (err) {
	       	 	console.log(err);
	        	return false;
	    	}

	    	Session.set('weather', res);
	    	weatherData = Session.get('weather');
		}
	}
})


