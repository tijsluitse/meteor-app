Cafes = new Mongo.Collection('Cafes');
Attendants = new Mongo.Collection('Attendants');

Meteor.methods({
  addCafe: function(name, address, imgUrl, lat, lng, sunrise, sunset){
    if(!Meteor.userId()){
      throw new Meteor.Error('No Access!');
    }
    Cafes.insert({
      name: name,
      address: address,
      imgUrl: imgUrl,
      lat: lat,
      lng: lng,
      sunrise: sunrise, 
      sunset: sunset
    });
  },
  
  deleteCafe: function(alarmId){
    Cafes.remove(alarmId);
  },

  checkCurrent: function (lat, lng) {
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&units=metric&lang=nl&appid=992bfff1b942695c9266d29b8f3a0ab7";
        var result = Meteor.http.call("GET", url);
        if(result.statusCode==200) {
            var data = JSON.parse(result.content);
            console.log("Response received")
            console.log(data);
            return data;
        } else {
            console.log("Response issue: ", result.statusCode);
            var errorData = JSON.parse(result.content);
            throw new Meteor.Error(result.satusCode, errorData.error);
        }
    }

})