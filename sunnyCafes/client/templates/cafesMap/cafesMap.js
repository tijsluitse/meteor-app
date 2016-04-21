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
	        	zoom: 12,
	        	scrollwheel: false
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

	    // map.instance.set('styles', [
		   //    {
		   //      featureType: 'road',
		   //      elementType: 'geometry',
		   //      stylers: [
		   //        { color: '#F38181' },
		   //        { weight: 0 }
		   //      ]
		   //    }, {
		   //      featureType: 'road',
		   //      elementType: 'labels',
		   //      stylers: [
		   //        { color: '#F38181' },
		   //        { saturation: 1 },
		   //        { visibility: 'on' }
		   //      ]
		   //    }, {
		   //      featureType: 'landscape',
		   //      elementType: 'all',
		   //      stylers: [
		   //        { color: 'rgb(227,227,277)' },
		   //        { gamma: 0 },
		   //        { saturation: -10000 },
		   //        { lightness: 0 }
		   //      ]
		   //    }, {
		   //      featureType: 'water',
		   //      elementType: 'all',
		   //      stylers: [
		   //        { color: '#95E1D3' },
		   //        { gamma: 0 },
		   //        { saturation: 1 },
		   //        { lightness: 0 }
		   //      ]
		   //    }
		   //  ]);

    	allPlaces.forEach(function(singlePlace){

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
	            '<h1 id="firstHeading" class="firstHeading">'+ singlePlace.Name +'</h1>' +
	            '<p>Address: ' + singlePlace.Adres + '</p>' +
	            '<div id="bodyContent">'+
	     		'<img id="infoWindowImage" src="' + singlePlace.Image + '" alt="' + singlePlace.Name + '"/>' +
	     		'<p>Sunrise: ' + singlePlace.sunrise + '</p>' +
	     		'<p>Sunset: ' + singlePlace.sunset + '</p>' +
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
	
		    map.instance.addListener('click', function() {	            
		        infoWindow.close();
		    });
		   	
    	});

    	var currentPosition = new google.maps.Marker({
	       	draggable: false,
	       	animation: google.maps.Animation.DROP,
	       	class: "maps-marker current-position",
	       	position: new google.maps.LatLng(latPosition, lngPosition),
	       	map: map.instance	       
	       	// icon: "images/pin.png"
	   	});

  	});
});

Template.cafesMap.events({
	"click .cafeMapItem": function(event) {
		
		var lat = document.getElementById("lat").innerHTML;
		var lng = document.getElementById("lng").innerHTML;

		Meteor.call('checkCurrentWeather', lat, lng, callback)

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


