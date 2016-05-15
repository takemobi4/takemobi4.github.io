var app = app || {};

var BASE_URL = "http://api.takemobi.com:8080/profilemanager/V2";
var BASE_LOCATION_URL = "http://api.takemobi.com:8080/servicelocator";

app.API = new function(){
    return {
        request: function(path, params, success, fail){ 
            this.call(BASE_URL + path, params, success, fail)
        },
        location_request: function(path, params, success, fail){
            this.call(BASE_LOCATION_URL + path, params, success, fail)
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
