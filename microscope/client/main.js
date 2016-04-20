import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
var SunCalc = require('suncalc');

import './main.html';

Template.cafesList.helpers ({
    Cafes: function(){
        return Cafes.find({});
    }
});

var times = SunCalc.getTimes(new Date(), 51.5, -0.1);

console.log(times);