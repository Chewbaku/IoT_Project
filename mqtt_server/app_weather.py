import paho.mqtt.publish as mqtt
import requests, json
from datetime import datetime
import time


# Enter your API key here
base_url = "http://api.openweathermap.org/data/2.5/weather?"
api_key = "7d5cb654527b774dadb9ad3b92045cdb"
# Give city name & generate the complete url
city_name = input("Enter city name : ")
complete_url = base_url + "appid=" + api_key + "&q=" + city_name

while True:
    # Get the reponse
    response = requests.get(complete_url)
    x = response.json()
    table = []


    # city is not found
    if x["cod"] != "404":

        y = x["main"]

        current_temperature = y["temp"]
        table.append(current_temperature)
        current_pressure = y["pressure"]
        table.append(current_pressure)
        current_humidity = y["humidity"]
        table.append(current_humidity)

        coord = x["coord"]
        current_latitude = coord["lat"]
        table.append(current_latitude)
        current_longitude = coord["lon"]
        table.append(current_longitude)

        wind = x["wind"]
        current_wind = wind["speed"]
        table.append(current_wind)

        sun = x["sys"]
        sunrise = sun["sunrise"]
        sunrise = datetime.utcfromtimestamp(int(sunrise)).strftime('%Y-%m-%d %H:%M:%S')
        table.append(sunrise)
        sunset = sun["sunset"]
        sunset = datetime.utcfromtimestamp(int(sunset)).strftime('%Y-%m-%d %H:%M:%S')
        table.append(sunset)

        sun_time = datetime.utcfromtimestamp(int(sun["sunset"] - sun["sunrise"])).strftime('%H:%M:%S')
        table.append(sun_time)

        z = x["weather"]

        weather_description = z[0]["description"]
        table.append(weather_description)

        print(" Temperature (in kelvin unit) = " +
                        str(current_temperature) +
              "\n Atmospheric pressure (in hPa unit) = " +
                        str(current_pressure) +
              "\n Humidity (in percentage) = " +
                        str(current_humidity) +
              "\n Latitude = " + str(current_latitude) +
              "\n Longitude = " + str(current_longitude) +
              "\n Wind Speed (in km/h) = " + str(current_wind) +
              "\n Sunrise at " + str(sunrise) +
              "\n Sunset at " + str(sunset) +
              "\n Sun Time is " + str(sun_time) +
              "\n Description = " +
                        str(weather_description))
        print(table)

        mqtt.single("temperature_outdoor", current_temperature)
        mqtt.single("humidity_outdoor", current_humidity)
        mqtt.single("pressure", current_pressure)
        mqtt.single("wind", current_wind)
        mqtt.single("sunset", sunset)
        mqtt.single("sunrise", sunrise)
        mqtt.single("sun_time", sun_time)
        mqtt.single("weather_description", weather_description)

    else:
        print(" City Not Found ")

    time.sleep(60) #refresh each 20min
