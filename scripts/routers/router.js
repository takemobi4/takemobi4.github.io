/*global Backbone */
var app = app || {};

(function () {
	'use strict';
    
	var MobiRouter = Backbone.Router.extend({
		routes: {
            'user': 'editUser',
            "search": "defaultRoute",
            "login": "loginRoute",
            "questions": "quesionsRoute",
            "": "defaultRoute" 
		},
        defaultRoute : function() {
            this.view = new app.SearchView();
        },
        loginRoute : function() {
            this.view = new app.LoginView();
        },
        quesionsRoute : function() {
            this.view = new app.UserQuestionsView();
        },
        editUser : function() {
            var user = $.cookie("userID");
            if(!user){
                this.loginRoute();
            }
            this.view = new app.UserView();
        }
	});

	app.MobiRouter = new MobiRouter();
	Backbone.history.start();
})();