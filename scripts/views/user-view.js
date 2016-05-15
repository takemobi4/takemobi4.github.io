/*global Backbone */
var app = app || {};

var mockProfileData = {
    Money: {
        TotalSaved: 530,
        Saved:  [25,50,75,20],
        TotalSpent: 940,
        Spent: [50,96,46,34]
    },
    Time: {
        TotalSaved: 234,
        Saved:  [34,45,5,2],
        TotalSpent: 345,
        Spent: [76,54,23,5]
    },
    GHG: {
        TotalSaved: 753,
        Saved:  [11,22,4,56],
        TotalSpent: 231,
        Spent: [34,23,31,34]
    }
};

(function () {
    'use strict';
    app.UserView = Backbone.View.extend({
        tagName: "div",
        el: '.app-container',
        initialize: function() {
            $("body").html(this.el);
            this.render();
        },
        events : {
            "click .submit-poi": "addPointOfInterest",
            "click .submit-membership": "addMembership",
            "click .submit-mode": "addMode"
        },
        addMode: function(){                  
            var form = $(e.target).parents("#mode-modal");
            var modeType = $(form).find(".mode-type").val();
            var that = this;
            switch(modeType){
                case "Car":
                    app.API.request("/Profile/UpdateProfile", "ALLOWDRIVING=true", function(){ $(".car-mode").removeClass("disabled"); });
                    break;
                case "Motorcycle":
                    app.API.request("/Profile/UpdateProfile", "ALLOWMOTORCYCLE=true", function(){ $(".motorcycle-mode").removeClass("disabled");});
                    break;
                case "Bicycle":
                    app.API.request("/Profile/UpdateProfile", "ALLOWBIKING=true", function(){ $(".bicycle-mode").removeClass("disabled");});
                    break;
                case "Scooter":
                    app.API.request("/Profile/UpdateProfile", "ALLOWSCOOTER=true", function(){ $(".scooter-mode").removeClass("disabled"); })
                    break;
                default:
                    return;    
            }
        },
        addMembership: function(e){            
            var form = $(e.target).parents("#membership-modal");
            var membershipType = $(form).find(".membership-type").val();
            var that = this;
            switch(membershipType){
                case "Zipcar":
                    app.API.request("/Profile/UpdateProfile", "hasZipcarPlan10=true", function(){ that.renderMembership(that, membershipType);});
                    break;
                case "Hubway":
                    app.API.request("/Profile/UpdateProfile", "hasHubwayMembership=true", function(){ that.renderMembership(membershipType);});
                    break;
                case "MBTA":
                    app.API.request("/Profile/UpdateProfile", "HasCharliePass=true", function(){ that.renderMembership(membershipType);});
                    break;
                case "Charlie Card":
                    app.API.request("/Profile/UpdateProfile", "hasCharlieCard=true", function(){ that.renderMembership(membershipType);})
                    break;
                default:
                    return;                
            }
        },
        renderMembership: function(that, type){
            var membershipList = that.$el.find(".membership-list");
            membershipList.removeClass("coming-soon");
            membershipList.children(".no-memberships").remove();
            membershipList.append("<div class='membership'><p>" + type + "</p></div>")
        },
        addPointOfInterest: function(e) {
            var form = $(e.target).parents(".poi-content");
            var tag = $(form).find("#tag").val();
            var lat = $(form).find("#lat").val();
            var lon = $(form).find("#lng").val();
            var address = $(form).find("#address").val();
            var description = $(form).find("#description").val();
            this.submitPOI("tag=" + tag + "&address=" + address + "&description=" + description + "&lat=" + lat + "&lon=" + lon);
        },
        submitPOI: function(poiParams){      
            var that = this;                     
            app.API.request("/POI/AddPOI", poiParams, function(response) {
                that.infoWindow.close();
            });
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
        loadCharts: function() {            
            var moneyChart = $("#moneyChart");
            this.getChartView(moneyChart, "Saved", "Spent", mockProfileData.Money)
            var timeChart = $("#timeChart");
            this.getChartView(timeChart, "Saved", "Spent", mockProfileData.Time)
            var ghgChart = $("#ghgChart");
            this.getChartView(ghgChart, "CO2 Saved", "CO2 Spent", mockProfileData.GHG)
        },
        getChartView: function(el, labelOne, labelTwo, data){
            var buttonArea = el.parents(".chart-container").find(".button-area");
            var spent = $(buttonArea).find(".spent");
            var saved = $(buttonArea).find(".saved");
            spent.find(".text").text(data.TotalSpent);
            saved.find(".text").text(data.TotalSaved);
            buttonArea.fadeIn('slow');
            return new Chart(el, {
                type: 'line',
                data: {
                    labels: ["January", "February", "March", "April"],
                    datasets: [                        
                        {
                            label: labelOne,
                            tension:0,
                            fill: true,
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            backgroundColor: "rgba(204,255,0,.5)",
                            borderColor: "rgba(204,255,0,1)",
                            data: data.Saved,
                        },             
                        {
                            label: labelTwo,
                            tension:0,
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            fill: true,
                            backgroundColor: "rgba(153,204,255,.5)",
                            borderColor: "rgba(153,204,255,1)",
                            data: data.Spent,
                        }
                    ]
                },
                options: {
                    responsive: true
                }
            });
        },
        setPosition: function(position){
            var event = jQuery.Event("location-set");
            event.position = position;
            $(document).trigger( event );
        },
        setMarkers: function(map){
            app.API.request("/POI/RetrievePOIs", "", function(response) {
                $.each(response.locations, function(index, data){                      
                    var myLatLng = {lat: parseFloat(data.LAT), lng: parseFloat(data.LON)};                 
                    var marker = new google.maps.Marker({
                        position: myLatLng,
                        animation: google.maps.Animation.DROP,
                        map: map,
                        title: data.DESCRIPTION
                    });
                })
            }, new function(){});
        },
        setMaps: function(that){
            var poiMap = new google.maps.Map(document.getElementById('key-locations-map'), {
                zoom: 11
            });
            that.plotCurrentLocation(poiMap);
            that.setMarkers(poiMap);
            poiMap.addListener('click', function(e) {
                that.closeCurrentMarker();
                that.placeMarkerAndSetFields(e, poiMap, e.latLng);
            });                 
        },
        plotCurrentLocation: function(map) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var currLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                    map.setCenter(currLocation);
                });     
            }
        },
        closeCurrentMarker: function(){            
            if(this.infoWindow){
                this.infoWindow.close();
            }
            if(this.marker){
                this.marker.setMap(null);
            }
        },
        placeMarkerAndSetFields: function(e, map, pos){
            var contentString = '<div class="poi-content">'+
                '<h2>Enter a tag address and description to add new point of interest</h1>'+
                '<input type="hidden" value="' + pos.lat() + '" id="lat"/>'+
                '<input type="hidden" value="' + pos.lng() + '" id="lng"/>'+
                '<input type="text" value="" placeholder="tag" id="tag"/>'+
                '<input type="text" value="" placeholder="address" id="address"/>'+
                '<input type="text" value="" placeholder="description" id="description"/>'+
                '<div class="pull-right" style="width:100px;margin-top:-49px;"><button class="btn btn-primary submit-poi" style="float:left;margin-bottom:5px;">Submit</button></div>'+
                '</div>';
            var marker = new google.maps.Marker({
                position: e.latLng,
                map: map
            });
            var infoWindow = new google.maps.InfoWindow({
                content: contentString
            });
            infoWindow.open(map, marker);
            this.infoWindow = infoWindow;
            this.marker = marker;
            google.maps.event.addListener(infoWindow, 'closeclick',function(){
                marker.setMap(null);
            });
        },
        errPosition: function(){
            alert("There was an error with retreiving your location.");
        },
        renderView: function(el, userData, that){      
            $.get('templates/user.hbs', function (data) {
                var template = Handlebars.compile(data);
                el.html(template(userData));
                el.removeClass();
                el.addClass('user-view')
                el.addClass('app-container')
                that.loadCharts();
                that.delegateEvents();                    
                that.setMaps(that); 
            }, 'html')
        }
    });
})();
