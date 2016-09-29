var legSolutions = [];
var legPrices = [];

function validStationPair(){

	var fromStationID = document.getElementById('fromStation').value;
	var toStationID = document.getElementById('toStation').value;

	if (fromStationID.indexOf(toStationID) >= 0 && fromStationID.length > 0 && toStationID.length > 0){
		document.getElementById("bookingStatus").innerHTML = "From and to stations cannot be the same"
	} else {
		document.getElementById("bookingStatus").innerHTML = ""
	}
}

function searchTrains(){

	document.getElementById("bookingStatus").innerHTML = "";
	var fromStationID = document.getElementById('fromStation').value;
	var toStationID = document.getElementById('toStation').value;

	if (fromStationID.indexOf(toStationID) >= 0 && fromStationID.length > 0 && toStationID.length > 0){
		document.getElementById("bookingStatus").innerHTML = "From and to stations cannot be the same"
	} else if (fromStationID.length == 0){
		document.getElementById("bookingStatus").innerHTML = "Please select a departure station"
	} else if (toStationID.length == 0){
		document.getElementById("bookingStatus").innerHTML = "Please select a destination station"
	} else {
		var url = []
		url.push("https://api.takemobi.com:8443/servicelocator/SilverRail/trains/availability/oneway?");
		url.push("conversationToken=1234&");
		url.push("originStationCode="+fromStationID+"&");
		url.push("destinationStationCode="+toStationID+"&");
		url.push("departureDate="+getDate()+"&");
		url.push("departureTime="+getTime()+"&");
		url.push("passengers="+1+"&");
		url.push("passengerSpecs="+40+"&");

		console.log("Booking " + fromStationID + "-->" +toStationID + ": " + url.join(""));
		$.get(url.join(""), function(data) {
			console.log(data);
			var status = data.getElementsByTagName("requestStatus")[0].firstChild.textContent;

			if (status.indexOf('true') < 0){
				document.getElementById("bookingStatus").innerHTML = "Sorry, no train between your from/to stations was found"
				return;
			}

			var options = data.getElementsByTagName("legSolution").length;
			console.log(options);

			if (options <= 0){
				document.getElementById("bookingStatus").innerHTML = "Sorry, no train between your from/to stations was found"
				return;
			}

			console.log(data.getElementsByTagName("legSolution")[0]);
			console.log(data.getElementsByTagName("pointToPointPrice")[0]);
			var resultContainer = document.getElementById("trainResultContainer");	
			resultContainer.innerHTML = "";
			trainResultContainer.style['overflow-y'] = "scroll";

			var titleDiv = document.createElement("div");
			titleDiv.style.display = "table-row";

		    var trainDiv = document.createElement("div");
		    trainDiv.style.width = "20%";
		    trainDiv.style.display = "table-cell";
		    trainDiv.innerHTML = "Train";
			titleDiv.appendChild(trainDiv);

			var timeDiv = document.createElement("div");
		    timeDiv.style.width = "40%";
		    timeDiv.style.display = "table-cell";
		    timeDiv.innerHTML = "Time";
			titleDiv.appendChild(timeDiv);

			var priceDiv = document.createElement("div");
		    priceDiv.style.width = "40%";
		    priceDiv.style.display = "table-cell";
		    priceDiv.innerHTML = "Price";
			titleDiv.appendChild(priceDiv);

			resultContainer.appendChild(titleDiv);

			legSolutions = [];
			legPrices = [];
			for (var i = 0; i < options; i++){
				var legSolution = data.getElementsByTagName("legSolution")[i];
				var legPrice = data.getElementsByTagName("pointToPointPrice")[i];

				legSolutions.push(legSolution);
				legPrices.push(legPrice);

				var origin = legSolution.getElementsByTagName("originTravelPoint")[0].textContent;
				var destination = legSolution.getElementsByTagName("destinationTravelPoint")[0].textContent;
				var departureTime = legSolution.getElementsByTagName("departureDateTime")[0].textContent;
				var arrivalTime = legSolution.getElementsByTagName("arrivalDateTime")[0].textContent;
				var serviceName = legSolution.getElementsByTagName("marketingServiceName")[0].textContent;

				var totalPrice = legPrice.getElementsByTagName("totalPrice")[0].textContent;
				var travelClass = legPrice.getElementsByTagName("cabinClass")[0].textContent;
				var currency = legPrice.getElementsByTagName("totalPrice")[0].getAttributeNode("currency").value;

				var resultDiv = document.createElement("div");
				resultDiv.style.width = "100%";
				resultDiv.style.display = "table-row";
				resultDiv.style['border-top'] = "thin solid";

				var trainDiv = document.createElement("div");
			    trainDiv.style.width = "20%";
			    trainDiv.style.display = "table-cell";
			    trainDiv.style['padding-top'] = "10px";
			    trainDiv.innerHTML = serviceName;
				resultDiv.appendChild(trainDiv);

				var timeDiv = document.createElement("div");
			    timeDiv.style.width = "40%";
			    timeDiv.style.display = "table-cell";
			    timeDiv.style['padding-top'] = "10px";
			    timeDiv.innerHTML = departureTime + "<br />" + arrivalTime;
				resultDiv.appendChild(timeDiv);

				var priceDiv = document.createElement("div");
			    priceDiv.style.width = "20%";
			    priceDiv.style.display = "table-cell";
			    priceDiv.style['padding-top'] = "10px";
			    priceDiv.innerHTML = currency + totalPrice + "<br />" + travelClass;
				resultDiv.appendChild(priceDiv);

				var buttonDiv = document.createElement("div");
			    buttonDiv.style.width = "20%";
			    buttonDiv.style.display = "table-cell";
			    buttonDiv.style['padding-top'] = "10px";
			    buttonDiv.style['vertical-align'] = "middle";
			    buttonDiv.innerHTML = '<button type="button" class="btn btn-warning" style="width:80px;height:35px" onClick="bookTrain('+i+')">BOOK</button>';
				resultDiv.appendChild(buttonDiv);

				resultContainer.appendChild(resultDiv);
			}

			
			
	    });
	}	
}

function bookTrain(resultIdx){

	document.getElementById("bookingStatus").innerHTML = "";

	if (legSolutions.length <= resultIdx || legSolutions.length <= resultIdx){
		document.getElementById("bookingStatus").innerHTML = "Invalid booking request " + resultIdx + "/" + legSolutions.length
	} else {
		var options = []
		var url = "https://api.takemobi.com:8443/servicelocator/SilverRail/trains/booking/bookAndPurchase?";
		options["conversationToken"] = 1234;
		options["customerIP"] = "0.0.0.0";
		options["legSolutionXML"] = legSolutions[resultIdx];
		options["legPriceXML"] = legPrices[resultIdx];

		var passengerSpecs = [{"passengerSpecID":"PAX_SPEC_0", 
								"nameFirst":"Take", 
								"nameLast":"Mobi", 
								"ageAtTimeOfTravel":"40", 
								"phoneNumber":"8001234567", 
								"emailAddress":"take@takemobi.com"}];

		var paymentMethod = {"cardType": "CC",
		      "cardAssociation": "AX",
		      "number": "378282246310005",
		      "validationNumber": "1234",
		      "startYearMonth": "2014-08",
		      "expirationYearMonth": "2018-08",
		      "cardholderNameFirst": "Take",
		      "cardholderNameLast": "Mobi",
		      "address1": "7777 Massachusetts Ave",
		      "address2": "Rm1234",
		      "city": "Cambridge",
		      "stateProv": "MA",
		      "zipcode": "02139",
		      "phoneNumber": "8001234567"};

		options["passengerSpecs"] = passengerSpecs;
		options["paymentMethod"] = paymentMethod;
		options["paymentAmount"] = legPrices[resultIdx].getElementsByTagName("totalPrice")[0].textContent;

		// send the collected data as JSON
		$.postJSON(url,JSON.stringify(options), function(data) {
				console.log(data);
			}
		);		
	}	
}

$.postJSON = function(url, data, callback) {
    return jQuery.ajax({
    headers: { 
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'        
    },
    'type': 'POST',
    'url': url,
    'data': JSON.stringify(data),
    'dataType': 'json',
    'success': callback
    });
};

function getDate() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }
    return year+'-'+month+'-'+day;
}

function getTime() {
    var now     = new Date(); 
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    return hour+':'+minute+':'+second;
}