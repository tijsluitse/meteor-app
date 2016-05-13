import data from "../../../public/data/cafes.json";
var cafes = data;

Meteor.call('addExternCafes', data);    

Template.cafesList.helpers ({
  	Cafes: function(){
    	return Cafes.find({
    		
    	});
  	}
});

Template.cafesList.events ({
  	"click .removeCafe": function(event){
    	if(confirm('Are you sure you want to delete?')){
      		Meteor.call('deleteCafe', this._id)
    	}
    	return false;
  	}
});