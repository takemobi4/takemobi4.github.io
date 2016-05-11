var app = app || {};

var BASE_URL = "http://api.takemobi.com:8080/profilemanager/V2";

app.API = new function(){
    return {
        request: function(path, params, success, fail){ 
            var userID = $.cookie("userID");            
            var key = $.cookie("userKey");   
            var userParams = "?userID=" + userID + "&key=" + key
            $.ajax({
                url: BASE_URL + path + userParams + "&" + params
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