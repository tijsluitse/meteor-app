Template.singleCafe.helpers ({
    weatherData: function() {
      return Session.get("weather");
    }
})

Template.singleCafe.events({
	'submit .addSunriseField': function(event){
		event.preventDefault();
		
		var cafeId = this.id;
		var sunriseTime = event.target.sunrise.value;

		Meteor.call('sunriseInput', cafeId, sunriseTime);

		event.target.sunrise.value = '';

	},

	'submit .addSunsetField': function(event){
		event.preventDefault();
		
		var cafeId = this.id;
		var sunsetTime = event.target.sunset.value;

		Meteor.call('sunsetInput', cafeId, sunsetTime);

		event.target.sunset.value = '';

	}
})

