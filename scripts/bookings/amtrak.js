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
			// console.log(data);
			var status = data.getElementsByTagName("requestStatus")[0].firstChild.textContent;

			if (status.indexOf('true') < 0){
				document.getElementById("bookingStatus").innerHTML = "Sorry, no train between your from/to stations was found"
				return;
			}

			var options = data.getElementsByTagName("legSolution").length;
			var fares = data.getElementsByTagName("pointToPointPrice").length;

			if (options <= 0){
				document.getElementById("bookingStatus").innerHTML = "Sorry, no train between your from/to stations was found"
				return;
			}

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
				var legSolutionID = legSolution.getAttributeNode("legSolutionID").value;
				var legPrice = null;

				for (var j = 0; j < fares; j++){
					legPrice = data.getElementsByTagName("pointToPointPrice")[j];
					if (legPrice.getAttributeNode("priceID").value.indexOf(legSolutionID) >= 0){
						// console.log(legSolutionID + "-->" + legPrice.getAttributeNode("priceID").value);
						break;
					}
				}
				

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
		document.getElementById("bookingStatus").innerHTML = "Invalid booking request";
		return;
	}

	var options = {}
	var url = "https://api.takemobi.com:8443/servicelocator/SilverRail/trains/booking/bookAndPurchase?";
	options["conversationToken"] = "1234";
	options["customerIP"] = "0.0.0.0";
	options["legSolutionXML"] = new XMLSerializer().serializeToString(legSolutions[resultIdx]);
	options["legPriceXML"] = new XMLSerializer().serializeToString(legPrices[resultIdx]);

	console.log("Booking with: ");
	console.log(legSolutions[resultIdx]);
	console.log(legPrices[resultIdx]);

	var nameFirst = document.getElementById("firstNameInput").value;
	var nameLast = document.getElementById("lastNameInput").value;
	var email = document.getElementById("emailInput").value;

	if (nameFirst.length <= 0){
		document.getElementById("bookingStatus").innerHTML = "Invalid first name input";
		return;
	} else if (nameLast.length <= 0){
		document.getElementById("bookingStatus").innerHTML = "Invalid last name input";
		return;
	} else if (email.length <= 0){
		document.getElementById("bookingStatus").innerHTML = "Invalid email input";
		return;
	}

	var passengerSpecs = [{"passengerSpecID":"PAX_SPEC_0", 
							"nameFirst":nameFirst, 
							"nameLast":nameLast, 
							"ageAtTimeOfTravel":"40", 
							"phoneNumber":"8001234567", 
							"emailAddress":email}];

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
	// console.log(JSON.stringify(options));
	$.postJSON(url,options, function(data) {
			console.log(data);
			if (data.error != null){
				document.getElementById("bookingStatus").innerHTML = data.error;
			} else {
				var resultObj = jQuery.parseXML(data.result);

				var faults = resultObj.getElementsByTagName("faultstring");
				if (faults != null && faults.length > 0){
					document.getElementById("bookingStatus").innerHTML = faults[0].textContent;
					return;
				}

				var success = resultObj.getElementsByTagName("success")[0];
				if (success.textContent.indexOf("false") >= 0){
					var statusMessage = resultObj.getElementsByTagName("statusMessage")[0];
					document.getElementById("bookingStatus").innerHTML = statusMessage.getElementsByTagName("message")[0].textContent;
					return;
				}

				var bookingRecord = resultObj.getElementsByTagName("bookingRecord")[0];

				var receiptsTotal = bookingRecord.getElementsByTagName("receiptsTotal")[0];
				var receiptPayment = receiptsTotal.getAttributeNode("currency").value + receiptsTotal.textContent;

				var recordLocator = bookingRecord.getAttributeNode("recordLocator").value;

				var passenger = bookingRecord.getElementsByTagName("passenger")[0];
				var nameFirst = passenger.getElementsByTagName("nameFirst")[0].textContent;
				var nameLast = passenger.getElementsByTagName("nameLast")[0].textContent;

				var order = bookingRecord.getElementsByTagName("order")[0];
				var orderID = order.getAttributeNode("orderID").value;

				var travelSegment = bookingRecord.getElementsByTagName("travelSegment")[0];
				var fromStation = travelSegment.getElementsByTagName("originTravelPoint")[0].textContent;
				var toStation = travelSegment.getElementsByTagName("destinationTravelPoint")[0].textContent;
				var departureDateTime = travelSegment.getElementsByTagName("departureDateTime")[0].textContent;
				var arrivalDateTime = travelSegment.getElementsByTagName("arrivalDateTime")[0].textContent;
				var marketingServiceName = travelSegment.getElementsByTagName("marketingServiceName")[0].textContent;

				var bookingResult = [];
				bookingResult.push("Ticket reserved. Record locator: " + recordLocator);
				bookingResult.push("Passenger: " + nameFirst + " " + nameLast);
				bookingResult.push(fromStation + "--" + toStation + "  on " + marketingServiceName);
				bookingResult.push("Departure: " + departureDateTime + "  Arrival: " + arrivalDateTime);
				bookingResult.push("Order ID: " + orderID + " / Payment: " + receiptPayment);

				document.getElementById("bookingResult").innerHTML = bookingResult.join("<br />");

				// cancel the booking
				var url = []
				url.push("https://api.takemobi.com:8443/servicelocator/SilverRail/trains/booking/cancel?");
				url.push("conversationToken=1234&");
				url.push("recordLocator="+recordLocator+"&");
				url.push("expectedCancellationFee="+0);

				console.log("Cancelling booking " +  url.join(""));
				$.get(url.join(""), function(data) {
				console.log(data);
				});
			}
		}
	);		
		
}

$.postJSON = function(url, data, callback) {
    return jQuery.ajax({
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'        
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