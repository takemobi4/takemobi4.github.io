/*global $ */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

(function () {
	'use strict';
});

app.Global = new function(){
    return {
        loggedIn: function(){             
            return $.cookie("userID");
        }
    }
};    


