// selecting the buttons for use
const filterButton = d3.select("#filter-btn");
const resetButton = d3.select("#reset-btn")

// selecting the filter input boxes for use
const table = d3.select("tbody");
const minPrice = d3.select("#min-price");
const maxPrice = d3.select("#max-price");
const minUse = d3.select("#min-use");
const checkBoxEntire = d3.select("#entire");
const checkBoxHotel = d3.select("#hotel");
const checkBoxPrivate = d3.select("#private");
const checkBoxShared = d3.select("#shared");
var avail;

var circle = `<svg width="30%" height="30%" viewBox="0 0 42 42" class="donut">
                <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
                <circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" stroke-width="3"></circle>
                <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ce4b99" stroke-width="3"> 
                stroke-dasharray="85 15" stroke-dashoffset="0"></circle>
              </svg>` 
var pie = `<svg height="20" width="20" viewBox="0 0 20 20">
        <circle r="10" cx="10" cy="10" fill="white" />
        <circle r="5" cx="10" cy="10" fill="transparent"
          stroke="tomato"
          stroke-width="10"
          stroke-dasharray="calc(${avail} * 31.4 / 100) 31.4"
          transform="rotate(-90) translate(-20)" />
        </svg>`
function markerOnClick(e) {
  d3.select("#donut-chart").property('value',code)
}
var myMap = L.map("map-id", {
  center: [41.3931, 2.1724],
  zoom: 13
});

// Adding a tile layer (the background map image) to our map
var layer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

myMap.addLayer(layer);

var url = "/api/v1.0/hosts";

dataStorage = []
//creating markers for each air-bnb location
d3.json(url, function(response) {
  for (var i = 0; i < response.length; i++) {
    dataStorage.push(response[i])
  }
});

var layerGroup = L.layerGroup().addTo(myMap);
//creating markers for each air-bnb location
d3.json(url, function(response) {

  console.log(response);
  

  for (var i = 0; i < 500; i++) {

    var latitude = response[i].latitude;
    var longitude = response[i].longitude
    avail = Number(response[i].availability)

    if (location) {
      marker = L.circle([latitude, longitude],{
        title: response[i].name
      }).on('click', function(e){
        var popup = e.target.getPopup();
        var content = popup.getContent();
        console.log("clicked on "+ content)
        }).bindPopup("<h1>" + response[i].name + "</h1><h2>Price/day: " + response[i].price + " euros</h2>" +`<h3>Availability: ${response[i].availability} days a year</h3>`+
        `<h4>Neighborhood: ${response[i].neighbourhood}</h4>`).addTo(layerGroup);
    }
  }

});

//This heatlayer function refused to work; could not seem to find any reason why--I have leaflet-heat.js in the index//
// d3.json(url, function(response) {
//   var heatArray = [];

//   for (var i = 0; i < response.length; i++) {
//     heatArray.push([response[i].latitude, response[i].longitude]);
//   }

//   var heat = L.HeatLayer(heatArray, {
//     radius: 20,
//     blur: 35
//   }).addTo(myMap);

// });

filterButton.on("click", function() {
  console.log("Filter Button Was Clicked");
  
  //reading in values that are in the filter boxes
  var minPriceFilterValue = minPrice.property("value");
  var maxPriceFilterValue = maxPrice.property("value");
  var minUseFilterValue = minUse.property("value");

  var filteredData = []
  //appending filtered data to webpage
  if (minPriceFilterValue != "") {
      console.log(`Minimum Price: ${minPriceFilterValue}`);
      filteredData = dataStorage.filter(stay=>stay.price>=minPriceFilterValue);
  }
  else {
      filteredData=dataStorage;
  }

  if (maxPriceFilterValue != "") {
      console.log(`Maximum Price: ${maxPriceFilterValue}`);
      filteredData = filteredData.filter(stay=>stay.price<=maxPriceFilterValue);
  }

  if (minUseFilterValue != "") {
      console.log(`Minimum Nights Required: ${minUseFilterValue}`);
      filteredData = filteredData.filter(stay=>stay.minimum_nights>=minUseFilterValue);
  }

  if (checkBoxEntire.property("checked")) {
      console.log(`Suite Type Added: Entire House/Apartment`);
      filteredData = filteredData.filter(stay=>stay.room_type ==="Entire home/apt");
  }

  if (checkBoxHotel.property("checked")) {
    console.log(`Suite Type Added: Hotel`);
    filteredData = filteredData.filter(stay=>stay.room_type ==="Hotel room");
  }

  if (checkBoxPrivate.property("checked")) {
    console.log(`Suite Type Added: Private Room`);
    filteredData = filteredData.filter(stay=>stay.room_type ==="Private room");
  }

  if (checkBoxShared.property("checked")) {
    console.log(`Suite Type Added: Shared Room`);
    filteredData = filteredData.filter(stay=>stay.room_type ==="Shared room");
  }

  //resetting the map to apply new markers that fulfill criteria
  layerGroup.clearLayers();
  
  myMap.addLayer(layer);
  try{
    for (var i = 0; i < 500; i++) {
      var latitude = filteredData[i].latitude;
      var longitude = filteredData[i].longitude;
      
      if (location) {
        marker = L.circle([latitude, longitude],{
          title: filteredData[i].name
        }).on('click', function(){
          console.log("clicked on "+ marker.getContent)
          }
        ).bindPopup("<h1>" + filteredData[i].name + "</h1> <h2>Price/day: " + filteredData[i].price + " euros</h2>"+`<h3>Availability: ${filteredData[i].availability} days a year</h3>`+
        `<h4>Neighborhood: ${filteredData[i].neighbourhood}</h4>`
        ).addTo(layerGroup)
      }
    }
  }
  catch(TypeError){
    console.log("There are no airbnbs that low or that expensive.")
  }
});




