var $ = require('jquery');
var Ractive = require('ractive');

var App = require('../app');


$(function() {
    var app = new App(document.querySelector('#todoapp'));
});
