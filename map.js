$(function() {
	// DOMR READY

	var center = {
	lat: 34.021491,
	lng: -118.286055,
	}

	var usc = [
	{
		bld: 'Alumni Park',
		lat: 34.020516, 
		lng: -118.284511,
	}, {
		bld: 'Leavey Library',
		lat: 34.021843,
		lng: -118.282942,
	}, {
		bld: 'Tutor Center',
		lat: 34.020077,
		lng: -118.289815,
	}, {
		bld: 'Kaprielian Hall',
		lat: 34.022487,
		lng: -118.291055,
	}
	];

	// map center location object
	var mapCenter = new google.maps.LatLng(center.lat, center.lng);

	// map dom el
	var mapElement = document.getElementById('map-canvas');

	// draw map
	var map = new google.maps.Map(mapElement, {
		center: mapCenter,
		zoom: 16,
	});

	// simple marker
	map.ctrMarker = new google.maps.Marker({
			map: map,
			position: mapCenter,
			animation: google.maps.Animation.BOUNCE,
	});

	// render complex markers to map
	renderMarkers(usc, map);

	// render polyline to map
	renderPolyine(usc, map);

});

function renderMarkers(locations, gmap) {
	locations.forEach(function(loc) {
		// marker
		var latLng = new google.maps.LatLng(loc.lat,loc.lng);

		var marker = new google.maps.Marker({
			position: latLng,
	        map: gmap,
	        title: loc.bld,
	        animation: google.maps.Animation.DROP,
	        icon: 'usc.jpg',
		});

		// info window
		var contentHtml = '<h2>'+loc.bld+'</h2>';

		var infoWindow = new google.maps.InfoWindow({
			content: contentHtml,
		});

		// click event
		google.maps.event.addListener(marker, 'click', function() {
			infoWindow.open(gmap, marker);
		});
	})
}

function renderPolyine(locations, gmap) {
	// array of google map location objects
	var latLngs = [];

	locations.forEach(function(loc) {
		latLngs.push(new google.maps.LatLng(loc.lat,loc.lng));
	})

	// set polyline
	var polyline = new google.maps.Polyline( {
		path: latLngs,
		geodesic: false,
		strokeColor: '#f2b139',
		strokeOpacity: 1,
		strokeWeight: 1.5,
	})

	// draw polyline
	polyline.setMap(gmap);
}