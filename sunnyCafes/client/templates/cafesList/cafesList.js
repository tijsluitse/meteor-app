import data from "../../../public/data/cafes.json";
var cafes = data;

Meteor.call('addExternCafes', data);    

Template.cafesList.helpers ({
  	Cafes: function(){
    	return Cafes.find({});
  	}
});

Template.cafesList.events ({
  	"click .removeCafe": function(event){
    	if(confirm('Are you sure you want to delete?')){
      		Meteor.call('deleteCafe', this._id)
    	}
    	return false;
  	}
});

Template.cafesList.events ({
	"click .cafeItem": function(event) {
		
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
});