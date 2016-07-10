var app = app || {};

var BASE_URL = "https://api.takemobi.com:8443/profilemanager/V2";
var BASE_LOCATION_URL = "https://api.takemobi.com:8443/servicelocator";
var BASE_SEARCH_URL = "https://api.takemobi.com:8443/mobirouting/V2";

app.API = new function(){
    return {
        request: function(path, params, success, fail){ 
            this.call(BASE_URL + path, params, success, fail)
        },
        location_request: function(path, params, success, fail){
            this.call(BASE_LOCATION_URL + path, params, success, fail)
        },
        search_request: function(path, params, success, fail){
            this.call(BASE_SEARCH_URL + path, params, success, fail)
        },
        search: function(params, success, fail){
            $.ajax({
                url: BASE_SEARCH_URL + "?" + params
            }).done(function(response) {
                success(response);
            }).fail(function (jqXHR, textStatus) { 
                if(fail){
                    fail(jqXHR, textStatus);
                }
            });            
        },
        call: function(path, params, success, fail){
            var userID = $.cookie("userID");            
            var key = $.cookie("userKey");   
            var userParams = "?userID=" + userID + "&key=" + key
            $.ajax({
                url: path + userParams + "&" + params
            }).done(function(response) {
                success(response);
            }).fail(function (jqXHR, textStatus) { 
                if(fail){
                    fail(jqXHR, textStatus);
                }
            });            
        }
    }
};    
