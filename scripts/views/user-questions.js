/*global Backbone */
var app = app || {};

(function () {
    'use strict';
    app.UserQuestionList = [
        "What in a trip do you value most?",
        "How much would you pay for a door-to-door service to get to and from work?",
        "How much money do you spend on transportation a year",
        "What do you love most about how you currently get around the city?",
        "What drives you the most nuts?",
        "Are you flexible about when you leave for work or return home?",
        "What type of food do you like?",
        "Where do you usually stop for coffee?",
        "Do you have kids? How do they get to school?",
        "How much do you value one hour of your time?"
    ]
    app.UserQuestionsView = Backbone.View.extend({
        tagName: "div",
        el: '.app-container',
        initialize: function() {
            $("body").html(this.el);
            this.render();
        },
        events : {
            "click .submit": "answerQuestion",
            "click .skip": "skipQuestion"
        },
        render: function() {
            var el = this.$el;
            var that = this;   
            this.renderView(el, this);   
        },
        renderView: function(el, that){  
            that.getQuestions(el, that);                 
            $("body").removeClass("modal-open"); 
            el.removeClass();
            el.addClass('user-view');
            el.addClass('question-view');
            el.addClass('app-container');
        },
        answerQuestion: function(){
            var that = this;
            var q = $("#question").text();
            var a = $("#answer").val();
            if(!a){
                alert("You must provide an answer");
            }
            var index = "Q" + (app.UserQuestionList.indexOf(q) + 1)
            app.API.request("/QA/UpdateAnswer", "qIdx=" + index + "&answer=" + a, function(){
                that.getQuestions(that.$el, that);
            })
        },
        getQuestions: function(el, that){
            app.API.request("/QA/RetrieveAnswers", "", function(responses) {
                if(responses.ERROR){
                    return window.location.hash = '#user';                        
                }
                var question = that.getNextQuestion(responses);
                that.renderQuestion(el, that, question);
            })
        },
        renderQuestion: function(el, that, question){          
            if(!question){                
                return $.get('templates/user-question-finished.hbs', function (response) {
                    var template = Handlebars.compile(response);
                    el.html();
                }, 'html');
            }
            $.get('templates/user-question.hbs', function (response) {
                var template = Handlebars.compile(response);
                el.html(template({Question: question}));
                that.delegateEvents();
            }, 'html');
        },
        getNextQuestion: function(responses){
            var nonAnsweredQuestions = [];
            for(var i = 0; i < app.UserQuestionList.length; i++){
                var qIndex = i + 1;
                if(!responses.hasOwnProperty("Q" + qIndex)){
                    nonAnsweredQuestions.push(app.UserQuestionList[i]);
                }
            }
            return _.first(nonAnsweredQuestions);
        }
    });
})();
