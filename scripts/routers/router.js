/*global Backbone */
var app = app || {};

(function () {
	'use strict';
    
	var MobiRouter = Backbone.Router.extend({
		routes: {
            'user(/:action)': 'editUser',
            "search": "defaultRoute",
            "login": "loginRoute",
            "questions": "quesionsRoute",
            "edit-user": "editUserRoute",
            "": "defaultRoute" 
		},
        defaultRoute : function() {
            this.view = new app.SearchView();
        },
        loginRoute : function() {
            var mustLogIn = true;
            this.view = new app.SearchView(mustLogIn);
        },
        quesionsRoute : function() {
            this.view = new app.UserQuestionsView();
        },
        editUserRoute : function() {
            this.view = new app.UserEditView();
        },
        editUser : function(action) {
            var user = $.cookie("userID");
            if(!user){
                this.loginRoute();
            }
            this.view = new app.UserView({action: action});
        }
	});

	app.MobiRouter = new MobiRouter();
	Backbone.history.start();
})();