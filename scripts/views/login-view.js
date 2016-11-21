/*global Backbone */
var app = app || {};

(function () {
    'use strict';
    app.LoginView = Backbone.View.extend({
        tagName: "div",
        el: '.app-container',
        initialize: function() {
            $("body").html(this.el);
            this.render();
        },
        events : {
            "click input[type='submit']": "submitForm"
        },
        render: function() {
            var that = this;
            $.get('templates/login.hbs', function (data) {
                var template = Handlebars.compile(data);
                that.$el.html(template([]));
                that.delegateEvents()
            }, 'html');
            $("body").removeClass("modal-open"); 
            this.$el.removeClass();
            this.$el.addClass('login-view')
            this.$el.addClass('app-container')
        },
        submitForm: function(e){
            e.preventDefault();
            var userName = $("#username").val();
            var password = $("#password").val();
            var loginType = $('input[name=account-type]:checked', 'form').val();
            if(loginType == "login"){
                this.login(userName, password);
            }
            else{
                this.createAccount(userName, password);                
            }
        },
        login: function(user, pass){
            var that = this;
            $.ajax({
                url: "http://api.takemobi.com:8080/profilemanager/V2/Authentication/Login?userID=" + user + "&password=" + pass
            }).done(function(response) {
                if(response.ERROR){
                    return alert("Your login credentials are incorrect, please try again.");                 
                }
                var key = response.KEY;
                that.setUserAndRedirect(user, key);
            }).fail(function (jqXHR, textStatus) { 
                return alert("Your login credentials are incorrect, please try again.");     
            });
        },
        createAccount: function(user, pass){
            var that = this;
            $.ajax({
                url: "http://api.takemobi.com:8080/profilemanager/V2/Authentication/CreateUser?userID=" + user + "&password=" + pass
            }).done(function(response) {
                if(response.ERROR){
                    return alert("There was an error creating your account");                       
                }
                var key = response.key;
                that.setUserAndRedirect(user);
            });
        },
        setUserAndRedirect: function(user, key){
            $.cookie('userID', user);
            $.cookie('userKey', key);
            window.location.hash = 'user';                
        }
    });
})();
