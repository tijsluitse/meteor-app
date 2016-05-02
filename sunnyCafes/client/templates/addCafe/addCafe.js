Template.addCafe.events ({
    "submit .add-cafe": function(event){
        event.preventDefault()
        
        var Name = event.target.name.value,
        Adres = document.getElementById("address").value,
        Image = event.target.imgUrl.value,
        Lattitude = event.target.lat.value,
        Longtitude = event.target.lng.value,
        sunrise = event.target.sunrise.value,
        sunset = event.target.sunset.value;

        Meteor.call('addCafe', Name, Adres, Image, Lattitude, Longtitude, sunrise, sunset);

        alert("Cafe Toegevoegd");

        event.target.name.value = '';
        event.target.imgUrl.value = '';
        event.target.lat.value = '';
        event.target.lng.value = '';
        event.target.sunrise.value = '';
        event.target.sunset.value = '';

        return Router.go('/cafesMap');

    },

    "click #btn": function(event){
        var address = document.getElementById('address').value;
        getLatitudeLongitude(showResult, address)
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