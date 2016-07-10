
Handlebars.registerHelper('flattenFloat', function(value) {
    return Math.round(value);
});

Handlebars.registerHelper('absVal', function(value) {
    return Math.abs(value).toFixed(2);;
});

Handlebars.registerHelper('tripTimeLine', function(data) {
    var tripDurationMins = data.duration;
    var timeLineEntries = [];
    var percentageOfTotal = 0;
    $.each(data.activities, function(index, act){
        if(act.type == "WAIT" || act.type == "PARK" || act.type == "RESERVE" || act.type == "PAYMENT"){
            return true;
        }
        var activityDurationMins = act.lowerbound;
        timeLineEntries.push({type: act.type.toLowerCase(), percent: percentageOfTotal});
        var previousPercentageOfTotal = percentageOfTotal;
        percentageOfTotal += (activityDurationMins / tripDurationMins) * 100;
        percentageOfTotal = padPercentageToPreventCollision(percentageOfTotal, previousPercentageOfTotal);
       
    });
    var timeLineHtml = "";
    var mappedResults = $.map(timeLineEntries, function(val){
        return "<div class='activity-plot " + val.type + "' style='left:" + parseInt(val.percent) + "px;'>" + getFaIcon(val.type) + "</div>";
    });
    return mappedResults.join("");
});

function getFaIcon(type){
    switch(type){
        case "car":
            return faBlock("car")
        case "drive":
            return faBlock("car")
        case "bike":
            return faBlock("bicycle")
        case "taxi":
            return faBlock("taxi")
        default:
            return "";
    }
}

function faBlock(ico){
    return "<i class='fa fa-" + ico + "'></i>"
}

function padPercentageToPreventCollision(percentageOfTotal, previousPercentageOfTotal){
    var circleWidth = 20;
     if((percentageOfTotal - previousPercentageOfTotal) < circleWidth){
	    percentageOfTotal += circleWidth - (percentageOfTotal - previousPercentageOfTotal);
     }
     return percentageOfTotal;
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

Handlebars.registerHelper('timeFromNow', function(value){

    var startTime = window.searchTime;
    var eta = startTime + (value * 60);

    var today = new Date();
    var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    var x = new Date(myToday.getTime() + (eta * 1000)) 
    var ampm = x.getHours() >= 12 ? "pm" : "am";
    return (x.getHours() > 12 ? x.getHours() - 12 : x.getHours()) + ":" +  checkTime(x.getMinutes()) + " " + ampm
});