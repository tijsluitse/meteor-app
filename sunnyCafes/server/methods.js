Cafes = new Mongo.Collection('Cafes');
var SunCalc = require('suncalc');

Meteor.methods({
    addCafe: function(Name, Adres, Image, Lattitude, Longtitude, setTemp, setWeather, setWind, sunriseDataSub, sunsetDataSub){
        if(!Meteor.userId()){
            throw new Meteor.Error('No Access!');
        }
        Cafes.insert({
            Name: Name,
            Adres: Adres,
            Image: Image,
            Lattitude: Lattitude,
            Longtitude: Longtitude,
            temprature: setTemp,
            weather: setWeather,
            wind: setWind,
            sunrise: sunriseDataSub,
            sunset: sunsetDataSub
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
    }

});




