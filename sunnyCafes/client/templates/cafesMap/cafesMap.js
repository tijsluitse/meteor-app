Meteor.startup(function() {  
  	GoogleMaps.load();
});

Template.cafesMap.helpers({  
  	mapOptions: function() {
	    if (GoogleMaps.loaded()) {
	      	return {
	        	center: new google.maps.LatLng(52.359952, 4.891319),
	        	zoom: 12
	      	};
	    }
  	},
  	activeMenu: function() {
  		document.getElementById("cafesMapMenu").classList.add("active");
  	}

});

Template.cafesMap.onCreated(function() {  
  	GoogleMaps.ready('map', function(map) {
    	console.log("I'm ready!");

    	var allPlaces = Cafes.find().fetch();
    	allPlaces.forEach(function(singlePlace){

    		var marker = new google.maps.Marker({
		       	draggable: false,
		       	animation: google.maps.Animation.DROP,
		       	class: "maps-marker",
		       	position: new google.maps.LatLng(singlePlace.lat, singlePlace.lng),
		       	map: map.instance,		       
		       	icon: "images/pin.png"
		   	});

		    var content = 
			    '<div id="content">'+
	            '<h1 id="firstHeading" class="firstHeading">'+ singlePlace.name +'</h1>'+
	            '<p>Address: ' + singlePlace.address + '</p>' +
	            '<div id="bodyContent">'+
	     		'<img id="infoWindowImage" src="' + singlePlace.imgUrl + '" alt="' + singlePlace.name + '"/>' +
	     		'<p>Sunrise: ' + singlePlace.sunrise + '</p>' +
	     		'<p>Sunset: ' + singlePlace.sunset + '</p>' +
	            '</div>'+
	            '</div>';

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
		   	
    	})

  	});
});



