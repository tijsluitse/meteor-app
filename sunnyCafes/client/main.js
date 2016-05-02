import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
// import data from "../../public/data/cafes.json";

// var cafes = data;
// Meteor.call('addExternCafes', data); 

Meteor.subscribe('Cafes');

