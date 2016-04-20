Template.addCafe.events ({
    "submit .add-cafe": function(event){
        event.preventDefault()
        
        var name = event.target.name.value,
        address = document.getElementById("address").value,
        imgUrl = event.target.imgUrl.value,
        lat = event.target.lat.value,
        lng = event.target.lng.value,
        sunrise = event.target.sunrise.value,
        sunset = event.target.sunset.value;

        Meteor.call('addCafe', name, address, imgUrl, lat, lng, sunrise, sunset);

        alert("Cafe Toegevoegd");

        event.target.name.value = '';
        event.target.imgUrl.value = '';
        event.target.lat.value = '';
        event.target.lng.value = '';
        event.target.sunrise.value = '';
        event.target.sunset.value = '';

        return Router.go('/');

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
    // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
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