# Barcelona AirBnB Visualization

For our project, we used Airbnb to create an interactive map to explore the residences offered by the city of Barcelona, Spain. We retrieved our data from the following site: http://insideairbnb.com/get-the-data.html. We primarily approached our visualizations from a geographic perspective. 

Our approach was to create a map that showed available Airbnb locations within the city of Barcelona and allows the user to filter down criteria in order to explore it better. Those criteria include a minimum and maximum price, a minimum number of nights to stay, and the suite type. The original intent was to display all Airbnb locations in the city of Barcelona, but our dataset was 20,000 records long and this flooded the map with information. The lack of visual clarity had our team choose for the flask application to only display 500 records at a time no matter the filter settings. For further development into this visualization, a more precise approach may have divided the city up by neighborhoods or regions that allow users to focus in on that area. In this manner, the overwhelming record numbers would not be a concern. 

An additional diagram that was to be attempted was a circle/pie chart that would display year-round availability of a selected residence. Unfortunately, with the way the markers were created, we did not have a way to store the information in the markers beyond the string that was associated with them. The only other option was to pursue displaying that circular chart within the marker, but there were difficulties in implementing the available days from the marker creation into the physical chart. 
Additionally, a heat map was planned so that there could be an examination into how the geolocation affects the price. The heat maps intensity would have been based on the price of residence. This would have offered a much larger picture of the Airbnb scenario in Barcelona while also being able to incorporate every data point cleanly. 

There were some frustrations with the data. Common Airbnb statistics were not provided, such as average user rating, amenities, etc. Average user rating would have been particularly helpful in the map visualization as it offered a more sensible approach to limiting the amount of records processed into the map. The current method was just an arbitrary limit, but with reviews there could have been a filter to limit the top 20 Airbnbs, top 50, top 100, etc.  

Primary difficulties came from misunderstandings in how to approach the project—there was just a small confusion over reflecting databases (we seemed to be originally attempting to write up the database ourselves). It felt like a lot of the solutions came from earlier homework assignments, particularly with the implementation of the filters. 
