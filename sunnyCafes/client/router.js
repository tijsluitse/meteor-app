Router.route('/', function () {
  	this.render('home');
});

Router.route('/addCafe', function () {
  	this.render('addCafe');
});

Router.route('/cafesList', function () {
  	this.render('cafesList');
});

Router.route('/cafesMap', function () {
  	this.render('cafesMap');
});

Router.route('singleCafe', {
  	path: '/singleCafe/:_id',
  	template: 'singleCafe',
  	data: function() {
    	return {id: this.params._id, singleCafe: Cafes.findOne(this.params._id)}
  	}
});
