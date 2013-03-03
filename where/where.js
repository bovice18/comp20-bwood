var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
					zoom: 13, // The larger the zoom number, the bigger the zoom
					center: me,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
var map;
var marker;
var stationMarker
var infowindow = new google.maps.InfoWindow();

var stations = new Array();

function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	initStations();
	getMyLocation();
	
	//getSchedules();
	
}

function initStations()
{
	stations[0] = {name:'Alewife', lat:42.395428, lng:-71.142483};
	stations[1] = {name:'Davis', lat:42.39674, lng:-71.121815};
	stations[2] = {name:'Porter', lat:42.3884, lng:-71.119149};
	stations[3] = {name:'Harvard Square', lat:42.373362, lng:-71.118956};
	stations[4] = {name:'Central', lat:42.365486, lng:-71.103802};
	stations[5] = {name:'Kendall/MIT', lat:42.36249079, lng:-71.08617653};
	stations[6] = {name:'Charles/MGH', lat:42.361166, lng:-71.070628};
	stations[7] = {name:'Park St.', lat:42.35639457, lng:-71.0624242};
	stations[8] = {name:'Downtown Crossing', lat:42.355518, lng:-71.060225};
	stations[9] = {name:'South Station', lat:42.352271, lng:-71.055242};
	stations[10] = {name:'Broadway', lat:42.342622, lng:-71.056967};
	stations[11] = {name:'Andrew', lat:42.330154, lng:-71.057655};
	stations[12] = {name:'JFK/UMass', lat:42.320685, lng:-71.052391};
	stations[13] = {name:'Savin Hill', lat:42.31129, lng:-71.053331};
	stations[14] = {name:'Fields Corner', lat:42.300093, lng:-71.061667};
	stations[15] = {name:'Shawmut', lat:42.29312583, lng:-71.06573796};
	stations[16] = {name:'Ashmont', lat:42.284652, lng:-71.064489};
	stations[17] = {name:'North Quincy', lat:42.275275, lng:-71.029583};
	stations[18] = {name:'Wollaston', lat:42.2665139, lng:-71.0203369};
	stations[19] = {name:'Quincy Center', lat:42.251809, lng:-71.005409};
	stations[20] = {name:'Quincy Adams', lat:42.233391, lng:-71.007153};
	stations[21] = {name:'Braintree', lat:42.2078543, lng:-71.0011385};
	for(i = 0; i < 22; i++)
	{
		createMarker(stations[i].name, stations[i].lat, stations[i].lng);
	}
}

// function getSchedules() {
        // // Set up the request
		// request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
	
        // // Execute the request
        // request.send(null);

        // // Handle the request (however you want)
        // request.onreadystatechange = function() 
		// {
			// if(request.readyState == 4 && request.status == 200)
			// {
				// parse(JSON.parse(request.responseText));
			// }
		// }
    // }
	
// function parse(obj)
// {
	// var count = 0;
	// for ( property in obj )          
	// {
		// if(obj.hasOwnProperty(property))
		// {
			// count++;
		// }
	// }
	
	// platformKeys = new obj;
	
	
// }

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

function createMarker(place, lat, lng)
{
	placeLoc = new google.maps.LatLng(lat, lng);
	stationMarker = new google.maps.Marker({
		position: placeLoc,
	});
	
	//stationMarker.setMap(map);
	google.maps.event.addListener(stationMarker, 'click', function() {
		infowindow.close();
		infowindow.setContent(place);
		infowindow.open(map, this);
	});
}