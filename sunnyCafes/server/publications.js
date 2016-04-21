Meteor.publish('Cafes', function() {
	return Cafes.find();
});

Meteor.publish('ExternCafes', function() {
	return ExternCafes.find();
});