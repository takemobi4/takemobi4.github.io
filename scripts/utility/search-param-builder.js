/*global Backbone */
var app = app || {};

(function () {
	'use strict';
    
	app.SearchParamBuilder = Backbone.Model.extend({
        },{
        getLocationSearchParams: function(origin, destination){
            var params = "";

	        //locations
            params += "originLat=" +  origin.lat() +  "&";
            params += "originLon=" +  origin.lng() +  "&";

            params += "destinationLat=" +  destination.lat() +  "&";
            params += "destinationLon=" +  destination.lng() +  "&";

            return params;
        },
        getUserSearchParams: function(user){
            if(!user){
                return "";
            }

            var params = "";
            
            params += "userId=" + user.id + "&";

            params += "durationCost=" + user.DURATIONCOST + "&";

            //modes
            params += "allowTaxi=" +  user.ALLOWTAXI +  "&";
            params += "allowHubway=" +  user.ALLOWHUBWAY +  "&";
            params += "allowZipCar=" +  user.ALLOWTAXI +  "&";
            params += "allowUber=" +  user.ALLOWUBER +  "&";
            
            params += "hasCharlieCard" + user.HASCHARLIECARD + "&";
            params += "hasMBTAPass" + user.HASCHARLIEPASS + "&";
            params += "hasHubwayMembership" + user.HASHUBWAYMEMBERSHIP + "&";
            params += "hasHubwayPass" + user.HASHUBWAYPASS + "&";
            params += "hasZipCarPlan10" + user.HASZIPCARPLAN10 + "&";
            params += "hasZipCarPlan15" + user.HASZIPCARPLAN15 + "&";
            
            return params;
        },
        getUISearchParams: function(){
            var params = "";

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 

            //trip target filters
            params += "startDate=" + yyyy + "-" + mm + "-" + dd + "&";
            params += "startTime=" + parseFloat($(".leave-by").val()) * 60 * 60 + "&";
            params += "endDate=" + yyyy + "-" + mm + "-" + dd + "&";
            params += "endTime=" + parseFloat($(".arrive-by").val()) * 60 * 60 + "&";
            params += "costCap=" + parseFloat($(".max-cost").val()) + "&";
            params += "walkingTimeCap=" + parseFloat($(".walking-time").val()) + "&";

            //modes
            params += "allowBus=" +  $(".bus").parent().hasClass("selected") +  "&";
            params += "allowRail=" +  $(".train").parent().hasClass("selected") +  "&";
            params += "allowDriving=" +  $(".car").parent().hasClass("selected") +  "&";
            params += "allowWalking=" +  $(".walk").parent().hasClass("selected") +  "&";
            params += "allowBiking=" +  $(".bicycle").parent().hasClass("selected") +  "&";

            //simulate!
            params += "isCold=" +  $(".cold").parent().hasClass("selected") +  "&";
            params += "isSleet=" +  $(".sleet").parent().hasClass("selected") +  "&";
            params += "isSnow=" +  $(".snow").parent().hasClass("selected") +  "&";
            params += "isRain=" +  $(".rain").parent().hasClass("selected") +  "&";
            params += "isIce=" +  $(".ice").parent().hasClass("selected") +  "";

            return params;
        },
      });
})();