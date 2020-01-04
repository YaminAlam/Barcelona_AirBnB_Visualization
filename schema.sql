CREATE TABLE airbnb (
  ID INTEGER PRIMARY KEY NOT NULL,
  name VARCHAR,
  neighbourhood_group VARCHAR,
  neighbourhood VARCHAR,
  latitude DECIMAL,
  longitude DECIMAL, 
  room_type VARCHAR,
  price INTEGER,
  minimum_nights INTEGER,
  availabiltiy_365 INTEGER
);

