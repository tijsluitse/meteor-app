var SunCalc = require('suncalc');

Template.addCafe.events ({
    "submit .add-cafe": function(event){
        event.preventDefault()
        
        var Name = event.target.name.value,
            Adres = document.getElementById("address").value,
            Image = event.target.imgUrl.value,
            Lattitude = event.target.lat.value,
            Longtitude = event.target.lng.value; 

        Meteor.call('checkCurrentWeather', Lattitude, Longtitude, callback);
        
        function callback (err, res) {
            if (err) {
                console.log("error: " + err);
                return false;
            }
            Session.set('weather', res);
            var weatherData = Session.get('weather');               
        } 

        var weatherData = Session.get('weather'),           
            setWeather = weatherData.weather[0].description,
            setTemp = weatherData.main.temp,
            setWind = weatherData.wind.speed,
            sunTimes = SunCalc.getTimes(new Date(), Lattitude, Longtitude),
            sunriseDate = sunTimes.sunrise,
            sunriseDataSub = sunriseDate.toLocaleTimeString(),
            sunsetDate = sunTimes.sunset,
            sunsetDataSub = sunsetDate.toLocaleTimeString();

        Meteor.call('addCafe', Name, Adres, Image, Lattitude, Longtitude, setTemp, setWeather, setWind, sunriseDataSub, sunsetDataSub);

        alert("Cafe Toegevoegd");

        event.target.name.value = '';
        event.target.imgUrl.value = '';
        event.target.lat.value = '';
        event.target.lng.value = '';

        window.location = "/cafesMap";

    },

    "click #btn": function(event){
        event.preventDefault()
        var address = document.getElementById('address').value;
        getLatitudeLongitude(showResult, address);
    }

});

function showResult(result) {
    document.getElementById('latitude').value = result.geometry.location.lat();
    document.getElementById('longtitude').value = result.geometry.location.lng();
};

function getLatitudeLongitude(callback, address) {
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0]);
            }
        });
    }
};