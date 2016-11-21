/*global Backbone */
var app = app || {};

(function () {
    'use strict';
    app.UserEditView = Backbone.View.extend({
        tagName: "div",
        el: '.app-container',
        initialize: function() {
            $("body").html(this.el);
            this.render();
        },
        events : {
            "click .submit": "editProfile",
        },
        editProfile : function(){
            var useremail = $("#email").val();
            var that = this;
            if(this.isValidEmail(useremail)){
                app.API.request("/Profile/UpdateProfile", "USEREMAIL=" + useremail, function(){ that.backToProfile();})
            }
            else{
                $(".error").text("Please enter a valid email address");
            }
        },
        backToProfile: function(){
            app.MobiRouter.navigate('user/editSuccess', { trigger: true });
        },
        isValidEmail: function(email){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        render: function() {
            var el = this.$el; 
            var that = this;
            app.API.request("/Profile/RetrieveProfile", "",
            function(response){  
                if(response.ERROR){
                    return window.location.hash = 'login';                        
                }
                if(!response.HASCHARLIECARD && !response.HASCHARLIEPASS && !response.HASHUBWAYMEMBERSHIP && !response.HASZIPCARPLAN10){
                    response.HASNOMEMBERSHIPS = true;
                }
                that.renderView(el, response, that);
            }, function(){
                return window.location.hash = 'login';  
            });
        },
        renderView: function(el, userData,  that){  
            $.get('templates/user-edit.hbs', function (data) {
                var template = Handlebars.compile(data);
                $("body").removeClass("modal-open"); 
                el.html(template(userData));
                el.removeClass();
                el.addClass('user-view')
                el.addClass('app-container')
                el.addClass('question-view')
                that.delegateEvents();          
            }, 'html')
        }
    });
})();
