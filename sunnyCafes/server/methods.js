Cafes = new Mongo.Collection('Cafes');

Meteor.methods({
    addCafe: function(Name, Address, Image, Lattitude, Longtitude, sunrise, sunset){
        if(!Meteor.userId()){
            throw new Meteor.Error('No Access!');
        }
        Cafes.insert({
            Name: Name,
            Address: Address,
            Image: Image,
            Lattitude: Lattitude,
            Longtitude: Longtitude,
            sunrise: sunrise, 
            sunset: sunset
        });
    },
  
    deleteCafe: function(cafeId){
        Cafes.remove(cafeId);
    },

    checkCurrentWeather: function (Lattitude, Longtitude) {
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + Lattitude + "&lon=" + Longtitude + "&units=metric&lang=nl&appid=992bfff1b942695c9266d29b8f3a0ab7";
        var result = Meteor.http.call("GET", url);
        
        if(result.statusCode == 200) {
            var data = JSON.parse(result.content);
            console.log("Response received")
            console.log(data);
            return data;
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorData = JSON.parse(result.content);
            throw new Meteor.Error(result.satusCode, errorData.error);
        }
    },

    addExternCafes: function(cafes) {
        if (Cafes.find().fetch().length == 0) {
            cafes.forEach(function(cafe) {
                Cafes.insert(cafe);
            });
        }
    },

    setWeather: function(cafeId, temprature, weather, wind) {
        Cafes.update({
            _id: cafeId}, 
            { $set: {
                temprature: temprature,
                weather: weather,
                wind: wind
            }
        });
    },

    setSunTimes: function(cafeId, sunriseTime, sunsetTime) {
        Cafes.update({
            _id: cafeId}, 
            { $set: {
                sunrise: sunriseTime,
                sunset: sunsetTime
            }
        });
    }

})




