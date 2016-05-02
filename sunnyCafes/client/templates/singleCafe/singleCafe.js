Template.singleCafe.helpers ({
    weatherData: function() {
      	return Session.get("weather");
    },
  	Cafes: function(){
    	return Cafes.find({});
  	}
    // suncalcData: function() {
    // 	var allPlaces = Cafes.find().fetch();
    // 	allPlaces.forEach(function(singlePlace){
    // 		var sunTimes = SunCalc.getTimes(date, singlePlace.Lattitude, singlePlace.Longtitude);
    // 		Cafes.update({
	   //          _id: cafeId}, 
	   //          { $push: {
	   //              sunrise: sunriseTime
	   //          }
	   //      });

    // 	}
    // }
});

// Template.singleCafe.events({
// 	'submit .addSunriseField': function(event){
// 		event.preventDefault();
		
// 		var cafeId = this.id;
// 		var sunriseTime = event.target.sunrise.value;

// 		Meteor.call('sunriseInput', cafeId, sunriseTime);

// 		event.target.sunrise.value = '';

// 	},

// 	'submit .addSunsetField': function(event){
// 		event.preventDefault();
		
// 		var cafeId = this.id;
// 		var sunsetTime = event.target.sunset.value;

// 		Meteor.call('sunsetInput', cafeId, sunsetTime);

// 		event.target.sunset.value = '';

// 	}
// })

