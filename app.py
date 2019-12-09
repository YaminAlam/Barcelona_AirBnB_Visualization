from flask import Flask, request, render_template
from flask import jsonify
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

#################################################
# Database Setup
#################################################
engine = create_engine("postgresql+psycopg2://postgres:bangladesh@localhost:5432/airbnb_db")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
print(Base.classes.keys())
Airbnb = Base.classes.airbnb
#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################


@app.route("/")
def index():
  return render_template("index.html")


@app.route("/api/v1.0/hosts")
def hosts():
  # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    session = Session(engine)
    results = session.query(Airbnb.name,Airbnb.neighbourhood_group, Airbnb.neighbourhood, Airbnb.latitude, Airbnb.longitude,\
                            Airbnb.room_type, Airbnb.price, Airbnb.minimum_nights, Airbnb.availability_365).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_airbnbs = []
    for name, neighbourhood_group, neighbourhood, latitude, longitude, room_type, price, minimum_nights, availability_365 in results:
        airbnb_dict = {}
        airbnb_dict["name"] = name
        airbnb_dict["neighbourhood_group"] = neighbourhood_group
        airbnb_dict["neighbourhood"] = neighbourhood
        airbnb_dict["latitude"] = latitude
        airbnb_dict["longitude"] = longitude
        airbnb_dict["room_type"] = room_type
        airbnb_dict["price"] = price
        airbnb_dict["minimum_nights"] = minimum_nights
        airbnb_dict["availability"] = availability_365
        all_airbnbs.append(airbnb_dict)

    return jsonify(all_airbnbs)

if __name__ == "__main__":
  app.run(debug=True)
