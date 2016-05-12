Template.singleCafe.helpers ({
    weatherData: function() {
      	return Session.get("weather");
    },
  	Cafes: function(){
    	return Cafes.find({});
  	}
});