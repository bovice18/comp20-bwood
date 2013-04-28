var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var center = new google.maps.LatLng(42.330497742, -71.095794678);
var myOptions = {
					zoom: 11, // The larger the zoom number, the bigger the zoom
					center: center,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
var map;
var stationMarkers = [];
var stations = [];
var ashmontBranch =[];
var braintreeBranch = [];
var infowindow = new google.maps.InfoWindow();
var scheduleJSON;
var schedule;
var distWaldo;
var distCarmen;

function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	initStations();	
	getMyLocation();
}

function initStations()
{
	pic = "assets/tsmall.jpg";
	
	st = new google.maps.LatLng(42.395428, -71.142483);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Alewife Station", icon: pic}));
	stations.push(st);
	
	st = new google.maps.LatLng(42.39674, -71.121815);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Davis Station", icon: pic}));
	stations.push(st);

	st = new google.maps.LatLng(42.3884, -71.119149);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Porter Square Station", icon: pic}));
	stations.push(st);
	
	st = new google.maps.LatLng(42.373362, -71.118956);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Harvard Square Station", icon: pic}));
	stations.push(st);
	
	st = new google.maps.LatLng(42.365486, -71.103802);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Central Square Station", icon: pic}));
	stations.push(st);
	
	st = new google.maps.LatLng(42.36249079, -71.08617653);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Kendall/MIT Station", icon: pic}));
	stations.push(st);
	
	st = new google.maps.LatLng(42.361166, -71.070628);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Charles/MGH Station", icon: pic}));
	stations.push(st);
	
	st = new google.maps.LatLng(42.35639457, -71.0624242);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Park St. Station", icon: pic}));
	stations.push(st);
	
	st = new google.maps.LatLng(42.355518, -71.060225);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Downtown Crossing Station", icon: pic}));
	stations.push(st);
	
	st = new google.maps.LatLng(42.352271, -71.055242);
	stationMarkers.push(new google.maps.Marker({position: st, title: "South Station", icon: pic}));
	stations.push(st);
	
	st = new google.maps.LatLng(42.342622, -71.056967);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Broadway Station", icon: pic}));
	stations.push(st);
	
	st = new google.maps.LatLng(42.330154, -71.057655);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Andrew Station", icon: pic}));
	stations.push(st);
	
	st = new google.maps.LatLng(42.320685, -71.052391);
	stationMarkers.push(new google.maps.Marker({position: st, title: "JFK/UMass Station", icon: pic}));
	stations.push(st); ashmontBranch.push(st); braintreeBranch.push(st);
	
	st = new google.maps.LatLng(42.31129, -71.053331);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Savin Hill Station", icon: pic}));
	ashmontBranch.push(st);
	
	st = new google.maps.LatLng(42.300093, -71.061667);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Fields Corner Station", icon: pic}));
	ashmontBranch.push(st);
	
	st = new google.maps.LatLng(42.29312583, -71.06573796);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Shawmut Station", icon: pic}));
	ashmontBranch.push(st);
	
	st = new google.maps.LatLng(42.284652, -71.064489);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Ashmont Station", icon: pic}));
	ashmontBranch.push(st);
	
	st = new google.maps.LatLng(42.275275, -71.029583);
	stationMarkers.push(new google.maps.Marker({position: st, title: "North Quincy Station", icon: pic}));
	braintreeBranch.push(st);
	
	st = new google.maps.LatLng(42.2665139, -71.0203369);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Wollaston Station", icon: pic}));
	braintreeBranch.push(st);
	
	st = new google.maps.LatLng(42.251809, -71.005409);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Quincy Center Station", icon: pic}));
	braintreeBranch.push(st);
	
	st = new google.maps.LatLng(42.233391, -71.007153);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Quincy Adams Station", icon: pic}));
	braintreeBranch.push(st);
	
	st = new google.maps.LatLng(42.2078543, -71.0011385);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Braintree Station", icon: pic}));
	braintreeBranch.push(st);
	
	for(var m in stationMarkers){
		stationMarkers[m].setMap(map);		
		
		google.maps.event.addListener(stationMarkers[m], 'click', function() {
		stationName = this.title;
		mvcObj = this
		infowindow.close();
		
		request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true); 
        request.send(null);
		var data;
        
        request.onreadystatechange = function() 
		{
			if(request.readyState == 4 && request.status == 200)
			{
				data = parse(request.responseText, stationName);
				infowindow.setContent(data);	
				infowindow.open(map, mvcObj);
			}	
		}	
		});
	}
	
	line = new google.maps.Polyline({
		path: stations,
		strokeColor: "FF0000",
		strokeOpacity: 1.0,
		strokeWeight:10
		});
	line.setMap(map);
	ashmontLine = new google.maps.Polyline({
		path: ashmontBranch,
		strokeColor: "FF0000",
		strokeOpacity: 1.0,
		strokeWeight:10
		});
	ashmontLine.setMap(map);
	braintreeLine = new google.maps.Polyline({
		path: braintreeBranch,
		strokeColor: "FF0000",
		strokeOpacity: 1.0,
		strokeWeight:10
		});
	braintreeLine.setMap(map);
}


	
function parse(raw, stationName)
{
	obj = JSON.parse(raw);
	content = "<h1>" + stationName + "</h1><table border = '1'><tr><td>Direction</td><td>Estimated Arrival Time</td></tr>";
	for ( i in obj )          
	{
		if(obj[i].InformationType == "Predicted" && stationName == "Alewife Station" && (obj[i].PlatformKey == "RALEN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Davis Station" && (obj[i].PlatformKey == "RDAVN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Davis Station" && (obj[i].PlatformKey == "RDAVS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Porter Square Station" && (obj[i].PlatformKey == "RPORN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Porter Square Station" && (obj[i].PlatformKey == "RPORS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Harvard Square Station" && (obj[i].PlatformKey == "RHARN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Harvard Square Station" && (obj[i].PlatformKey == "RHARS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Central Square Station" && (obj[i].PlatformKey == "RCENN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Central Square Station" && (obj[i].PlatformKey == "RCENS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Kendall/MIT Station" && (obj[i].PlatformKey == "RKENN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Kendall/MIT Station" && (obj[i].PlatformKey == "RKENS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Charles/MGH Station" && (obj[i].PlatformKey == "RMGHN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Charles/MGH Station" && (obj[i].PlatformKey == "RMGHS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Park St. Station" && (obj[i].PlatformKey == "RPRKN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Park St. Station" && (obj[i].PlatformKey == "RPRKS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Downtown Crossing Station" && (obj[i].PlatformKey == "RDTCN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Downtown Crossing Station" && (obj[i].PlatformKey == "RDTCS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "South Station" && (obj[i].PlatformKey == "RSOUN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "South Station" && (obj[i].PlatformKey == "RSOUS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Broadway Station" && (obj[i].PlatformKey == "RBRON"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Broadway Station" && (obj[i].PlatformKey == "RBROS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Andrew Station" && (obj[i].PlatformKey == "RANDN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Andrew Station" && (obj[i].PlatformKey == "RANDS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "JFK/UMass Station" && (obj[i].PlatformKey == "RJFKN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "JFK/UMass Station" && (obj[i].PlatformKey == "RJFKS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Savin Hill Station" && (obj[i].PlatformKey == "RSAVN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Savin Hill Station" && (obj[i].PlatformKey == "RSAVS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Fields Corner Station" && (obj[i].PlatformKey == "RFIEN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Fields Corner Station" && (obj[i].PlatformKey == "RFIES"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Shawmut Station" && (obj[i].PlatformKey == "RSHAN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Shawmut Station" && (obj[i].PlatformKey == "RSHAS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Ashmont Station" && (obj[i].PlatformKey == "RASHS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "North Quincy Station" && (obj[i].PlatformKey == "RNQUN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "North Quincy Station" && (obj[i].PlatformKey == "RNQUS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Wollaston Station" && (obj[i].PlatformKey == "RWOLN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Wollaston Station" && (obj[i].PlatformKey == "RWOLS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Quincy Center Station" && (obj[i].PlatformKey == "RQUCN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Quincy Center Station" && (obj[i].PlatformKey == "RQUCS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Quincy Adams Station" && (obj[i].PlatformKey == "RQUAN"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "NORTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Quincy Adams Station" && (obj[i].PlatformKey == "RQUAS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		if(obj[i].InformationType == "Predicted" && stationName == "Braintree Station" && (obj[i].PlatformKey == "RBRAS"))
		{
			if(obj.hasOwnProperty(i))
			{
				content += "<tr><td>" + "SOUTHBOUND" + "</td><td>" + obj[i].TimeRemaining + "</td></tr>";
			}
		}
		
		
	}
	
	return content;
}

function getMyLocation()
{
	var loc;
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
			getCandW();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
	
}

function renderMap()
{

	me = new google.maps.LatLng(myLat, myLng);
	// Create a marker
	marker = new google.maps.Marker({
		position: me,
		title: "Here I Am!"
		
	});
	marker.setMap(map);
	var distance = getDistance(me, stationMarkers[0].position);
	var newDistance;
	var stationName = stationMarkers[0].title;
	//find closest station
	for(var m in stationMarkers){
		newDistance = getDistance(me, stationMarkers[m].position);
		if(distance > newDistance)
		{
			distance = newDistance;
			stationName = stationMarkers[m].title;
		}
	}
	
	
	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent("Your closest station is: " + stationName + ", " + distance.toString() + " miles away");
		infowindow.open(map, marker);
	});
	
}

function getCandW()
{
	var CandWRequest = new XMLHttpRequest();

	CandWRequest.open("GET", "http://mbtamap.herokuapp.com/", true);

     // Execute the request
    CandWRequest.send(null);

	// Handle the request (however you want)
	CandWRequest.onreadystatechange = function() 
	{
		if(CandWRequest.readyState == 4 && CandWRequest.status == 200)
		{
			carmenWaldo(JSON.parse(CandWRequest.responseText));
		}
	}
}

function carmenWaldo(obj)
{
	try{
	
		if(obj[0].name == "Waldo"){
				waldo = new google.maps.LatLng(obj[0].loc.latitude, obj[0].loc.longitude);
				waldoDistance = getDistance(me, waldo);
				waldoMarker = new google.maps.Marker({
				position: waldo,
				title: obj[0].loc.note + " at a location " + waldoDistance + " miles away",	
				icon: "assets/waldo.png"

			});
			waldoMarker.setMap(map);
			
			google.maps.event.addListener(waldoMarker, 'click', function() {
			infowindow.setContent(waldoMarker.title);
			infowindow.open(map, waldoMarker);
	});
		}
		else if(obj[0].name == "Carmen Sandiego"){
			carmen = new google.maps.LatLng(obj[0].loc.latitude, obj[0].loc.longitude);
			carmenDistance = getDistance(me, carmen);
			carmenMarker = new google.maps.Marker({
			position: carmen,
			title: "Carmen is at " + obj[0].loc.note + ", " + carmenDistance + " miles away",	
			icon: "assets/carmen.png"
			});
			carmenMarker.setMap(map);
			
			google.maps.event.addListener(carmenMarker, 'click', function() {
			infowindow.setContent(carmenMarker.title);
			infowindow.open(map, carmenMarker);
	});
		}
		if(obj[1].name == "Carmen Sandiego"){
			carmen = new google.maps.LatLng(obj[1].loc.latitude, obj[1].loc.longitude);
			carmenDistance = getDistance(me, carmen);
			carmenMarker = new google.maps.Marker({
			position: carmen,
			title: "Carmen is at " + obj[1].loc.note + ", " + carmenDistance + " miles away",	
			icon: "assets/carmen.png"

			});
			carmenMarker.setMap(map);
			
			google.maps.event.addListener(carmenMarker, 'click', function() {
			infowindow.setContent(carmenMarker.title);
			infowindow.open(map, carmenMarker);
	});

		}
	
	}
	catch(error){	
	}
	
}

function getDistance(me, station){
	var R = 6371; // km
	var dLat = toRad((station.lat() - me.lat()));
	var dLon = toRad((station.lng() - me.lng()));
	var lat1 = toRad(me.lat());
	var lat2 = toRad(station.lat());

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d*(0.6214);

}
function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}

