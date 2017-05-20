function initMap() 
{
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 3,
		center: {
			lat: 47.608013,
			lng: -122.335167
		},
		styles:
		[
			{
				"featureType": "administrative",
				"elementType": "labels.text.fill",
				"stylers": [
				{
					"color": "#444444"
				}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "all",
				"stylers": [
				{
					"color": "#f2f2f2"
				}
				]
			},
			{
				"featureType": "poi",
				"elementType": "all",
				"stylers": [
				{
					"visibility": "off"
				}
				]
			},
			{
				"featureType": "road",
				"elementType": "all",
				"stylers": [
				{
					"saturation": -100
				},
				{
					"lightness": 45
				}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "all",
				"stylers": [
				{
					"visibility": "simplified"
				}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels.icon",
				"stylers": [
				{
					"visibility": "off"
				}
				]
			},
			{
				"featureType": "transit",
				"elementType": "all",
				"stylers": [
				{
					"visibility": "off"
				}
				]
			},
			{
				"featureType": "water",
				"elementType": "all",
				"stylers": [
				{
					"color": "#46bcec"
				},
				{
					"visibility": "on"
				}
				]
			}
		]

	});

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function(location, i) {
    	return new google.maps.Marker({
    		position: location,
    		url: location.url
    	});
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers, {
    	imagePath: ''
    });

    for (i = 0; i < markers.length; i++)
    {
    	google.maps.event.addListener(markers[i], 'click', function() {
    		window.location.href = this.url;
    	});
    }
}

var locations = 
[{
		//guinness storehouse dublin
		lat: 53.3419,
		lng: -6.2867,
		url: "2016/08/01/guinness-factory.html"
	},
	{
		//trinity college
		lat: 53.343889,
		lng: -6.256806,
		url: "2016/08/01/trinity-college.html"
	},
	{
		//cliffs of moher
		lat: 52.9719,
		lng: -9.4265,
		url: "2016/08/01/cliffs-of-moher.html"
	},
	{
		//seattle public library
		lat: 47.6067,
		lng: -122.3325,
		url: "2017/05/18/seattle-public-library.html"
	},
	{
		//pike place market
		lat: 47.6101,
		lng: -122.3421,
		url: "2017/05/18/pike-place-market.html"
	},
	{
		//tate modern
		lat: 51.5074,
		lng: 0.1001,
		url: "2016/11/01/tate-modern.html"
	}
]

window.fbAsyncInit = function() 
{
	FB.init({
		appId      : '1685896151707691',
		xfbml      : true,
		version    : 'v2.8'
	});
	FB.AppEvents.logPageView();

	document.getElementById('fb-share-button').onclick = function() 
	{
		FB.ui({
			method: 'share',
			display: 'popup',
			href: 'https://icz.io',
		}, function(response){});
	}
};

(function(d, s, id)
{
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));