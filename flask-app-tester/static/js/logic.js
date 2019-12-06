console.log("found");
var myMap = L.map("map-id", {
  center: [41.3851, 2.1734],
  zoom: 13
});

// Adding a tile layer (the background map image) to our map
var layer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoieWFtaW5hbGFtIiwiYSI6ImNrM25xb2UxYzF0OHoza251bHNmcHNxZ3IifQ.rr63YszYl6p4X6P3nmqQxw"
}).addTo(myMap);

myMap.addLayer(layer);