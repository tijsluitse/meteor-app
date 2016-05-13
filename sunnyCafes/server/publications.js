Meteor.publish('Cafes', function() {
	return Cafes.find();
});