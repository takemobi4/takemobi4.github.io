/*global Backbone */
var app = app || {};

(function () {
    'use strict';
    app.SearchView = Backbone.View.extend({
        tagName: "div",
        el: '.app-container',
        initialize: function() {
            $("body").html(this.el);
            this.render();
        },
        render: function() {
            var el = this.$el;
            var that = this;            
            $.get('templates/search.hbs', function (data) {
                var template = Handlebars.compile(data);
                el.html(template([]));
                that.initializeFilterValues(that);
                that.delegateEvents();                
                that.setMaps(that); 
            }, 'html').done(function(){                
            })
            this.$el.removeClass();
            this.$el.addClass('search-view');
            this.$el.addClass('app-container');
        },
        plotCurrentLocation: function(map) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var currLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                    map.setCenter(currLocation);
                });
            }
        },
        setMaps: function(that){       
            var searchMap = new google.maps.Map(document.getElementById('search-map'), {
                zoom: 12,
                streetViewControl: false,
                mapTypeControl: false
            });                              
            var departureInput = document.getElementById('search-departure');
            var arrivalInput = document.getElementById('search-arrival');
            var departureAC = new google.maps.places.Autocomplete(departureInput);
            var arrivalAC = new google.maps.places.Autocomplete(arrivalInput);
            departureAC.bindTo('bounds', searchMap);      
            arrivalAC.bindTo('bounds', searchMap);
            that.plotCurrentLocation(searchMap);        
        },
        initializeFilterValues: function(that){
            $.each($("input[type='range']"), function(index, data){
                that.updateRangeValue(data, that);
            });
        },
        events : {
            "change .range-filter input[type='range']": "changeRange",
            "click .mode-filter": "toggleModeFilter"
        },
        toggleModeFilter: function(e){
            var el = e.target;
            var modeToggle = $(el).is(".mode-filter") ? $(el) : $(el).parents(".mode-filter");
            $(modeToggle).toggleClass("selected")
        },
        changeRange: function(e){
            var that = this;
            var element = e.target;
            this.updateRangeValue(element, that);  
        },
        updateRangeValue: function(element, that){
            var displayEL = $("." + $(element).attr("data-display"));
            var displayType = $(element).attr("data-display-type");
            var maxVal = parseFloat($(element).attr("max"));
            $(displayEL).text(that.formatValue(displayType, $(element).val(), maxVal, that));
        },
        formatValue: function(type, val, maxVal, that){
            switch(type){
                case 'hours':
                    return that.minTommss(val);
                case 'money':
                    return that.infinityOrValue("$" + parseFloat(val).toFixed(2), val, maxVal);
                case 'minutes':
                    return that.infinityOrValue(val + " minutes", val, maxVal);
                default:
                    return val;
            }
        },
        infinityOrValue: function(returnVal, val, maxValue){
            return val >= maxValue ? "infinity" : returnVal;
        },
        minTommss: function(hours){
            var hour = Math.floor(Math.abs(hours));
            var suffix = hour >= 12 ? "PM" : "AM";
            if(hour == 24){
                hour = 12;
                suffix = "AM";
            }
            else{                
                hour = hour > 12 ? hour - 12 : hour;
                hour = hour == 0 ? 12 : hour;
            }
            var min = Math.floor((Math.abs(hours) * 60) % 60);
            return hour + ":" + (min < 10 ? "0" : "") + min + " " + suffix;
        }
    });
})();
