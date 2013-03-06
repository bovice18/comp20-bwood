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
var schedule

function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	initStations();	
	
	//getSchedules();
	
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
	stationMarkers.push(new google.maps.Marker({position: st, title: "Porter Square", icon: pic}));
	stations.push(st);
	
	st = new google.maps.LatLng(42.373362, -71.118956);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Harvard Square", icon: pic}));
	stations.push(st);
	
	st = new google.maps.LatLng(42.365486, -71.103802);
	stationMarkers.push(new google.maps.Marker({position: st, title: "Central Square", icon: pic}));
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
		infowindow.close();
		
		request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/station_schedule_all.json?stop_name=Alewife%20Station", true);
	
        // Execute the request
        request.send(null);
		var data;
        // Handle the request (however you want)
        request.onreadystatechange = function() 
		{
			if(request.readyState == 4 && request.status == 200)
			{
				data = parse(request.responseText);
				infowindow.setContent(data);	
				infowindow.open(map, this);
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

function getSchedule(stationName) {
        // Set up the request
		request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/station_schedule_all.json?stop_name=Alewife%20Station", true);
	
        // Execute the request
        request.send(null);
		data = "";
        // Handle the request (however you want)
        request.onreadystatechange = function() 
		{
			if(request.readyState == 4 && request.status == 200)
			{
				data = parse(request.responseText);
			}
			
		}
		return data;
}
	
function parse(raw)
{
	obj = JSON.parse(raw);
	//console.log(raw);
	var count = 0;
	content = "<h1>" + obj.stop_name + "</h1><table border = '1'><tr><td>Direction</td><td>Estimated Arrival Time</td></tr>";
	for ( i in obj )          
	{
		if(obj.hasOwnProperty(i))
		{
			content += "<tr><td>" + obj[i].direction + "</td><td>" + obj[i].time_remaining + "</td></tr>";
		}
	}
	
	return "Hello";
}

function getMyLocation()
{
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap()
{

	me = new google.maps.LatLng(myLat, myLng);

	// Update map and go there...
	map.panTo(me);

	// Create a marker
	marker = new google.maps.Marker({
		position: me,
		title: "Here I Am!"
		
	});
	marker.setMap(map);
	
	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
}

