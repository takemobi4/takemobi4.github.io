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
            $(displayEL).text(that.formatValue(displayType, $(element).val(), that));
        },
        formatValue: function(type, val, that){
            var formattedValue = '';
            switch(type){
                case 'hours':
                    return formattedValue = that.minTommss(val);
                case 'money':
                    return formattedValue = "$" + parseFloat(val).toFixed(2);
                case 'minutes':
                    return formattedValue = val + " minutes";
                default:
                    return val;
            }
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
