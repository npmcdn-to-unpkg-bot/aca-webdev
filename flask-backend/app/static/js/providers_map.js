$(function() {
  var center = window.coordinates.center;
  var provider_array = window.coordinates.provider_array;

  var mymap = L.map('mapid').setView(center, 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.light',
      accessToken: 'pk.eyJ1Ijoia29ubmlhbWNoYW4iLCJhIjoiY2loZjZ1aDB4MGxxaHR0bHpmMDRrczNubCJ9.42XTV2wAGebwq8n5KvJBxQ'
  }).addTo(mymap);

  // for (var i = 0; i < provider_array.length; i++) {
  //   L.marker(provider_array[i])
  //     .addTo(mymap)
  //     .bindPopup("<b>Hello world!</b><br>I am a popup.")
  //     .on('mouseover', function (e) {
  //       this.openPopup();
  //     })
  //     .on('mouseout', function (e) {
  //       this.closePopup();
  //     })
  // }
});
