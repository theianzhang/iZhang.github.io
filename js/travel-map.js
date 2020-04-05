var map;
var markers = [];

function initMap() 
{
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: new google.maps.LatLng(47.6062,-122.3321),
    mapTypeId: 'roadmap'
  });

  // Create a <script> tag and set the USGS URL as the source.
  var script = document.createElement('script');
  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src = "/js/location_callback.js";
  document.getElementsByTagName('head')[0].appendChild(script);

}

// Loop through the results array and place a marker for each
// set of coordinates.
window.location_array = function(results) 
{
  for (var i = 0; i < results.features.length; i++) {
    var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[0],coords[1]);
    markers.push(new google.maps.Marker({
      position: latLng,
    }));
  }

  var markerCluster = new MarkerClusterer(map, markers, {imagePath: '/img/map/m'});

}