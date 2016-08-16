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
            "submit #Login-modal form": "submitForm",
            "click .search-button": "search",
            "click .results-bar .mode-filter": "search",
            "change .results-bar .leave-by": "search",
            "click .search-result": "chooseResult"
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
        search: function(){
            var origin = this.path["origin"];
            var destination = this.path["destination"];
            if(!origin || !destination){
                console.log("search not ready!")
                return false;
            }
            if(app.Global.loggedIn()){
                var searchUser = this.getResultsForUser(this, getResults);
            }
            $(".search-button i").removeClass("fa-search").addClass("fa-spinner").addClass("fa-spin")
            var results = this.getResults(this, origin, destination);
        },
        getResultsForUser: function(that){
            app.API.request("/Profile/RetrieveProfile", "",
            function(user){  
                if(user.ERROR){
                    return [];                        
                }
                return getResults(that, origin, destination, user)
            }, function(){ return false; });                        
        },
        getResults(that, origin, destination, user){
            var params = "";
            var locationParams = app.SearchParamBuilder.getLocationSearchParams(origin, destination);
            var searchUIParams = app.SearchParamBuilder.getUISearchParams();
            var userParams = app.SearchParamBuilder.getUISearchParams(user);
            app.API.search(locationParams + searchUIParams + userParams,
            function(results){                  
                $(".search-button i").addClass("fa-search").removeClass("fa-spinner").removeClass("fa-spin")
                if(results.ERROR){
                    return [];                        
                }
                that.renderResults(that, results);
            }, function(){ return false; });                        
        },
        renderResults: function(that, fullResults, cb){
            that.setResultViewState();

            that.clearMarkersAndPolys(that.markers);
            //This is some real hacky stuff
            var realDestinations = $.map(fullResults.destinations[0], function(val){ 
                if(val.constructor == Array){
                    return val;
                }
            });
            var results = [];
            that.fullResults = fullResults;
            results.destinations = realDestinations;
            window.searchTime = fullResults.StartTime;
            that.searchTime = fullResults.StartTime;
            $.get('templates/tripSearchResults.hbs', function (data) {
                var template = Handlebars.compile(data);
                $(".results-area").html(template(results));
                that.delegateEvents()
                if(cb){
                    cb();
                }
            }, 'html');
            
            that.setMapPolyLinesandNodes(that, results.destinations);
        },
        setMapPolyLinesandNodes: function(that, destinations){
            that.clearMarkersAndPolys(that.allDestinationPolylines);
            that.clearMarkersAndPolys(that.allActivityMarkers);
            that.allDestinationPolylines = [];
            that.destinationPolyById = [];
            that.destinations = [];
            var defaultOpacity = .15;
            var activeOpacity = 1;
            that.allActivityMarkers = [];
            $.each(destinations, function(index, destination){
                var destinationPolylines = [];
                var destinationId = destination.id;
                $.each(destination.activities, function(index, activity){
                    var activityCoords = that.mapPolylineToCoordinateArray(activity.polyline);
                    var activityLine = new google.maps.Polyline({
                        path: activityCoords,
                        geodesic: true,
                        strokeColor: that.getPolyColor(that, activity.type),
                        strokeOpacity: defaultOpacity,
                        strokeWeight: 4
                    });
                    
                    google.maps.event.addListener(activityLine, 'click', function() {
                        that.chooseResultById(that, destination.id);                        
                    });
                    activityLine.setMap(that.searchMap);
                    that.allDestinationPolylines.push(activityLine);
                    destinationPolylines.push(activityLine);
                });
                that.destinationPolyById[destination.id] = destinationPolylines;
                that.destinations[destination.id] = destination;
            });
        },
        chooseResultById: function(that, destinationId){
            var defaultOpacity = .15;
            var activeOpacity = 1;
            that.clearMarkersAndPolys(that.markers);
            $(".search-result").removeClass("selected");
            $(".search-result").addClass("collapsed");
            $.each(that.allDestinationPolylines, function(){
                this.setOptions({strokeOpacity: defaultOpacity});
            });
            var destinationPolylines = that.destinationPolyById[destinationId];
            var destination = that.destinations[destinationId];
            $.each(destinationPolylines, function(){                             
                this.setOptions({strokeOpacity: activeOpacity});
            });
            $("#" + destinationId + "").removeClass("collapsed").addClass("selected");
            that.renderResults(that, that.fullResults, that.renderSelected.bind(that, that, "#" + destinationId + "", destination));
            $.each(destination.activities, function(i, act){
                var actCoords = that.mapPolylineToCoordinateArray(act.polyline);
                var destMarker = that.setMarkerForActivity(that, act, actCoords);
                that.markers.push(destMarker);
            });
            var finalDestination = destination.activities[destination.activities.length - 1];
            var duration = destination.duration;
            if(destination.activities[0].type == "WAIT"){
                duration += destination.activities[0].lowerbound;
            }
            that.setDestinationMarker(finalDestination.endLat, finalDestination.endLon, duration, that);
        },
        renderSelected: function(that, el, destination){
            $.get('templates/selectedResult.hbs', function (data) {
                var template = Handlebars.compile(data);
                $(el).html(template(destination));
                $(el).addClass("selected");
                that.delegateEvents()
            }, 'html');
        },
        setDestinationMarker: function(lat, lon, duration,that){
            var startTime = that.searchTime;
            var eta = startTime + (duration * 60);

            var today = new Date();
            var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
            var x = new Date(myToday.getTime() + (eta * 1000))            
            var ampm = x.getHours() >= 12 ? "pm" : "am";
            this.markers.push(new google.maps.Marker({
                position: new google.maps.LatLng(lat, lon),
                map: that.searchMap,
            }));            
            this.markers.push(new MapLabel({
                text:(x.getHours() > 12 ? x.getHours() - 12 : x.getHours()) + ":" +  (x.getMinutes() < 10 ? x.getMinutes() + "0" : x.getMinutes() )+ " " + ampm,
                position: new google.maps.LatLng(lat, lon),
                map: that.searchMap,
                fontSize: 22,
                align: 'left'
            }));
        },
        chooseResult: function(e){
            var id = $(e.target).closest(".search-result").attr("id");
            this.chooseResultById(this, id);
        },
        clearMarkersAndPolys: function(coll){
            if(coll){
                $.each(coll, function(i, d){
                    if(d && d.map != null){
                        d.setMap(null);
                    }
                });
            }
        },
        setMarkerForActivity: function(that, activity, activityCoords){
            var FAIconType = that.getFAIconTypeForActivity(activity.type.toLowerCase());
            if(FAIconType){
                return new google.maps.Marker({
                    map: that.searchMap,
                    icon: {
                        path: fontawesome.markers[FAIconType],
                        scale: 0.25,
                        strokeWeight: 0.2,
                        strokeColor: 'black',
                        strokeOpacity: 1,
                        fillColor: that.getPolyColor(that, activity.type.toLowerCase()),
                        fillOpacity: 1,
                    },
                    clickable: false,
                    position: new google.maps.LatLng(activityCoords[0].lat, activityCoords[0].lng)
                });
            }
            else if(that.getIconByType(activity.type.toLowerCase())){
                return new google.maps.Marker({
                    position: new google.maps.LatLng(activityCoords[0].lat, activityCoords[0].lng),
                    icon: that.getIconByType(activity.type.toLowerCase()),
                    map: that.searchMap,
                });
            }
        },
        getFAIconTypeForActivity: function(activityType){
            switch(activityType){
                case "car":
                    return "CAR"
                case "drive":
                    return "CAR"
                case "bike":
                    return "BICYCLE"
                case "taxi":
                    return "TAXI"
                default:
                    return "";
            }
        },
        getPolyColor: function(that, type){
            switch(that.getColorName(type.toLowerCase())){
                case "car":
                    return "#3366CC"
                case "bicycle":
                    return "#33CCCC"
                case "train":
                    return "#660066"
                case "walk":
                    return "#FF0066"
                case "transit":
                    return "#660066"
                default:
                    return "#222"                
            }            
        },        
        getColorName: function(type){
            switch(type){
                case "drive":
                    return "car"
                case "bike":
                    return "bicycle"
                default:
                    return type;
            }
        },
        mapPolylineToCoordinateArray: function(poly){
            var polyArr = poly.split(",");
            var coords = [];
            for(var i = 0; i < (polyArr.length - 1); i += 2){
                coords.push({lat: parseFloat(polyArr[i]), lng: parseFloat(polyArr[i + 1])});
            }
            return coords;
        },
        setResultViewState: function(){
            $(".search-bar").addClass("results-bar");
            $(".bubble-option-list").addClass("flat");
            $(".results-area").removeClass("hidden");
            $($(".range-filter").splice(1)).hide();            
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
                                                   
                    var currLocationmarker = new google.maps.Marker({
                        position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
                        map: that.searchMap,
                        icon: {
                            path: fontawesome.markers.MAP_MARKER,
                            scale: 0.60,
                            strokeWeight: 0.2,
                            strokeColor: '#31b0d5',
                            strokeOpacity: 1,
                            fillColor: '#31b0d5',
                            fillOpacity: 1,
                        },
                        clickable: false,
                    });
                            
                    map.setCenter(currLocation);
                    that.plotMBTAStops(that, map, position.coords.latitude, position.coords.longitude);
                    that.plotZipCars(that, map, position.coords.latitude, position.coords.longitude);
                    that.plotHubway(that, map, position.coords.latitude, position.coords.longitude);
                    /*that.listenerHandle = map.addListener('bounds_changed', function() {
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
                    });*/
                });
            }
        },
        setMaps: function(that){       
            var searchMap = new google.maps.Map(document.getElementById('search-map'), {
                zoom: 14,
                streetViewControl: false,
                mapTypeControl: false
            });     
            that.searchMap = searchMap;                         
            var departureInput = document.getElementById('search-departure');
            var destinationInput = document.getElementById('search-arrival');
            var departureAC = new google.maps.places.Autocomplete(departureInput);
            var destinationAC = new google.maps.places.Autocomplete(destinationInput);
            that.updatePlaceChange(that, departureAC, "origin");
            that.updatePlaceChange(that, destinationAC, "destination");
            departureAC.bindTo('bounds', searchMap);      
            destinationAC.bindTo('bounds', searchMap);
            that.plotCurrentLocation(that, searchMap);        
        },
        updatePlaceChange: function(that, input, type){
            google.maps.event.addListener(input, 'place_changed', function () {
                var place = input.getPlace();
                that.path = that.path || [];
                that.path[type] = place;
                that.search.call(that);
            });
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
        getIconByType: function(type){
            switch(type){
                case "zipcar":
                    return "/img/zipcar-ico.png";
                case "uber":
                    return "/img/uber-ico.png";
                case "transit":
                    return "/img/mbta-ico.png";
                case "walk":
                    return "/img/walk-ico.png";
                case "lyft":
                    return "/img/lyft-ico.png";
                case "hubway":
                    return "/img/hubway-ico.png";
                default:
                    return "";
            }
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
