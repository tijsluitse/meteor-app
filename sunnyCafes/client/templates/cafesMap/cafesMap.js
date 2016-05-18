var SunCalc = require('suncalc');

Template.cafesMap.helpers ({
  	Cafes: function(){
    	return Cafes.find({});
  	}
});

Meteor.startup(function() {    	
	GoogleMaps.load();
});

Template.cafesMap.helpers({ 
  	mapOptions: function() {
	    if (GoogleMaps.loaded()) {
	      	return {
	        	center: new google.maps.LatLng(52.367153, 4.893645),
	        	zoom: 12,
	        	disableDefaultUI: true
	      	};
	    }
  	}
});

Template.cafesMap.onCreated(function() {  
  	GoogleMaps.ready('map', function(map) {

    	var allPlaces = Cafes.find().fetch();
    	var latPosition = Session.get('latPos');
	    var lngPosition = Session.get('lngPos');
	    var date = new Date();

	    var currentPosition = new google.maps.Marker({
	       	draggable: false,
	       	animation: google.maps.Animation.DROP,
	       	class: "maps-marker current-position",
	       	position: new google.maps.LatLng(52.367153, 4.893645),
	       	map: map.instance,
	       	icon: 'images/pin_self.png'      
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

            var sunriseDate = sunTimes.sunrise;
    		var sunriseDataSub = sunriseDate.toLocaleTimeString();
    		var sunsetDate = sunTimes.sunset;
    		var sunsetDataSub = sunsetDate.toLocaleTimeString();

    		Meteor.call('setSunTimes', singlePlace._id, sunriseDataSub, sunsetDataSub);		

    		var marker = new google.maps.Marker({
		       	draggable: false,		       	
		       	animation: google.maps.Animation.DROP,
		       	class: "maps-marker",
		       	position: new google.maps.LatLng(singlePlace.Lattitude, singlePlace.Longtitude),
		       	map: map.instance,		       
		       	icon: "images/pin.png",
		       	id: singlePlace._id
		   	});

		   	if (singlePlace.Image == "") {
		   		singlePlace.Image = "https://bytesizemoments.com/wp-content/uploads/2014/04/placeholder.png";
		   	}

		    var content = 
			    '<a class="cafeMapItem" href="' + '/singleCafe/' + singlePlace._id + '">' +
			    '<div id="content">' +	               
	            '<p id="coordinates">Coordinates: ' + '<span id="lat">' + singlePlace.Lattitude + '</span>, <span id="lng"> ' + singlePlace.Longtitude + '</span></p>' + 
	            '<div id="bodyContent">' +
	            '<div id="imageHolder">' +
	     		'<img id="infoWindowImage" src="' + singlePlace.Image + '" alt="' + singlePlace.Name + '"/>' +
	     		'</div>' + 
	     		'<h1 id="firstHeading" class="firstHeading">'+ singlePlace.Name + '</h1>' +	
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
	
		    marker.addListener('mouseleave', function() {
		        infoWindow.close();
		    });
		   	
    	});

    	Cafes.find().observeChanges({
		added: function(id, fields){
			var newCafe = Cafes.findOne({_id: id});
			
			var sunTimes = SunCalc.getTimes(new Date(), newCafe.Lattitude, newCafe.Longtitude);
    		
    		Meteor.call('checkCurrentWeather', newCafe.Lattitude, newCafe.Longtitude, callback);

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

                Meteor.call('setWeather', newCafe._id, setTemp, setWeather, setWind);
            } 

            var sunriseDate = sunTimes.sunrise;
    		var sunriseDataSub = sunriseDate.toLocaleTimeString();
    		var sunsetDate = sunTimes.sunset;
    		var sunsetDataSub = sunsetDate.toLocaleTimeString();

    		Meteor.call('setSunTimes', newCafe._id, sunriseDataSub, sunsetDataSub);		

    		var marker = new google.maps.Marker({
		       	draggable: false,		       	
		       	animation: google.maps.Animation.DROP,
		       	class: "maps-marker",
		       	position: new google.maps.LatLng(newCafe.Lattitude, newCafe.Longtitude),
		       	map: map.instance,		       
		       	icon: "images/pin.png",
		       	id: id
		   	});

		   	if (newCafe.Image == "") {
		   		newCafe.Image = "https://bytesizemoments.com/wp-content/uploads/2014/04/placeholder.png";
		   	}

		    var content = 
			    '<a class="cafeMapItem" href="' + '/singleCafe/' + newCafe._id + '">' +
			    '<div id="content">' +	                
	            '<p id="coordinates">Coordinates: ' + '<span id="lat">' + newCafe.Lattitude + '</span>, <span id="lng"> ' + newCafe.Longtitude + '</span></p>' + 
	            '<div id="bodyContent">' +
	            '<div id="imageHolder">' +
	     		'<img id="infoWindowImage" src="' + newCafe.Image + '" alt="' + newCafe.Name + '"/>' +
	     		'</div>' + 
	     		'<h1 id="firstHeading" class="firstHeading">'+ newCafe.Name + '</h1>' +	 
	     		'<span class="weatherItem"><img class="smallImg" src="images/pin.svg"><p>Address: ' + newCafe.Adres + '</p></span>' +
	     		'<span class="weatherItem"><img class="smallImg" src="images/sunrise.svg"><p>Sun: ' + newCafe.sunrise + '</p></span>' +
	     		'<span class="weatherItem"><img class="smallImg" src="images/sunset.svg"><p>Till: ' + newCafe.sunset + '</p></span>' +
	     		'<span class="weatherItem"><img class="smallImg" src="images/temp.svg"><p>Temp: ' + newCafe.temprature + '</p></span>' +
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
	
		    marker.addListener('mouseleave', function() {
		        infoWindow.close();
		    });		    

		}
	});

  	});
});





