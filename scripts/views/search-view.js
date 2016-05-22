/*global Backbone */
var app = app || {};

(function () {
    'use strict';
    app.SearchView = Backbone.View.extend({
        tagName: "div",
        el: '.app-container',
        initialize: function(mustLogIn) {
            $("body").html(this.el);
            this.render();
            this.markers = [];
            if(mustLogIn){
                this.logUserIn();
            }
        },
        events : {
            "change .range-filter input[type='range']": "changeRange",
            "click .mode-filter": "toggleModeFilter",
            "click .user-login": "logUserIn",
            "submit #Login-modal form": "submitForm"
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
            $("body").removeClass("modal-open"); 
            this.$el.removeClass();
            this.$el.addClass('search-view');
            this.$el.addClass('app-container');
        },
        logUserIn: function(){
            if(app.Global.loggedIn()){
                window.location.hash = 'user';    
                return false;
            }
            else{
                setTimeout(function(){
                    $('#Login-modal').modal('show');
                }, 500)
            }
        },
        plotCurrentLocation: function(that, map) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var currLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                    map.setCenter(currLocation);
                    that.plotMBTAStops(that, map, position.coords.latitude, position.coords.longitude);
                    that.plotZipCars(that, map, position.coords.latitude, position.coords.longitude);
                    that.plotHubway(that, map, position.coords.latitude, position.coords.longitude);
                    map.addListener('bounds_changed', function() {
                        var cachedLat = map.getCenter().lat();
                        var cachedLon = map.getCenter().lng();                        
                        window.setTimeout(function() {
                            var mapPos = map.getCenter();
                            if(mapPos.lat() == cachedLat && mapPos.lng() == cachedLon){                                
                                for (var i = 0; i < that.markers.length; i++) {
                                    that.markers[i].setMap(null);
                                }
                                that.markers = [];
                                that.plotZipCars(that, map, mapPos.lat(), mapPos.lng());           
                                that.plotHubway(that, map, mapPos.lat(), mapPos.lng());           
                                that.plotMBTAStops(that, map, mapPos.lat(), mapPos.lng());                                
                            }
                        }, 500);
                    });
                });
            }
        },
        setMaps: function(that){       
            var searchMap = new google.maps.Map(document.getElementById('search-map'), {
                zoom: 14,
                streetViewControl: false,
                mapTypeControl: false
            });                              
            var departureInput = document.getElementById('search-departure');
            var arrivalInput = document.getElementById('search-arrival');
            var departureAC = new google.maps.places.Autocomplete(departureInput);
            var arrivalAC = new google.maps.places.Autocomplete(arrivalInput);
            departureAC.bindTo('bounds', searchMap);      
            arrivalAC.bindTo('bounds', searchMap);
            that.plotCurrentLocation(that, searchMap);        
        },
        getRadius: function(map){
            var bounds = map.getBounds();
            if(!bounds){
                return 4;
            }
            var center = bounds.getCenter();
            var ne = bounds.getNorthEast();
            var r = 3963.0;  
            var lat1 = center.lat() / 57.2958; 
            var lon1 = center.lng() / 57.2958;
            var lat2 = ne.lat() / 57.2958;
            var lon2 = ne.lng() / 57.2958;
            var dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
            return Math.round(dis);
        },
        plotZipCars: function(that, map, lat, lon){
            app.API.location_request("/Zipcar/GetLocations", "lat=" + lat + "&lon=" + lon + "&radius=" + that.getRadius(map), function(response) {
                $.each(response.locations, function(index, data){                      
                    var myLatLng = {lat: parseFloat(data.lat), lng: parseFloat(data.lon)};                 
                    var marker = new google.maps.Marker({
                        position: myLatLng,                  
                        icon: "/img/zipcar-ico.png",
                        map: map,
                        title: data.location_name + " - " + data.num_vehicles + " cars",
                    });
                    that.markers.push(marker);
                })
            }, new function(){});
        },
        plotHubway: function(that, map, lat, lon){
            app.API.location_request("/Hubway/GetStations", "lat=" + lat + "&lon=" + lon + "&radius=" + that.getRadius(map), function(response) {
                $.each(response.stations, function(index, data){                      
                    var myLatLng = {lat: parseFloat(data.lat), lng: parseFloat(data.lon)};                 
                    var marker = new google.maps.Marker({
                        position: myLatLng,                  
                        icon: "/img/hubway-ico.png",
                        map: map,
                        title: data.station_name + " - " + data.available_bikes + " available bikes",
                    });
                    that.markers.push(marker);
                })
            }, new function(){});
        },
        plotMBTAStops: function(that, map, lat, lon){
            app.API.location_request("/MBTA/GetStations", "lat=" + lat + "&lon=" + lon + "&radius=" + that.getRadius(map), function(response) {
                $.each(response.stations, function(index, data){                      
                    var myLatLng = {lat: parseFloat(data.lat), lng: parseFloat(data.lon)};                 
                    var marker = new google.maps.Marker({
                        position: myLatLng,                       
                        icon: "/img/mbta-ico.png",
                        map: map,
                        title: data.stop_name
                    });
                    that.markers.push(marker);
                })
            }, new function(){});
        },
        initializeFilterValues: function(that){
            $.each($("input[type='range']"), function(index, data){
                that.updateRangeValue(data, that);
            });
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
                that.login(user, pass);
            });
        },
        setUserAndRedirect(user, key){
            $.cookie('userID', user);
            $.cookie('userKey', key);
            window.location.hash = 'user';                
        }
    });
})();
