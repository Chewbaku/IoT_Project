
# Python program to find current  
# weather details of any city 
# using openweathermap api 
  
# import required modules 
import requests, json
from datetime import datetime

table = []

# Enter your API key here 
api_key = "7d5cb654527b774dadb9ad3b92045cdb"
  
# base_url variable to store url 
base_url = "http://api.openweathermap.org/data/2.5/weather?"
  
# Give city name 
city_name = input("Enter city name : ")
  
# complete_url variable to store 
# complete url address 
complete_url = base_url + "appid=" + api_key + "&q=" + city_name
  
# get method of requests module 
# return response object 
response = requests.get(complete_url)
  
# json method of response object  
# convert json format data into 
# python format data 
x = response.json()
  
# Now x contains list of nested dictionaries 
# Check the value of "cod" key is equal to 
# "404", means city is found otherwise, 
# city is not found 
if x["cod"] != "404":
  
    # store the value of "main" 
    # key in variable y 
    y = x["main"]
  
    # store the value corresponding 
    # to the "temp" key of y 
    current_temperature = y["temp"]
    table.append(current_temperature)
  
    # store the value corresponding 
    # to the "pressure" key of y 
    current_pressure = y["pressure"]
    table.append(current_pressure)
  
    # store the value corresponding 
    # to the "humidity" key of y 
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


    # store the value of "weather" 
    # key in variable z 
    z = x["weather"]
  
    # store the value corresponding  
    # to the "description" key at  
    # the 0th index of z 
    weather_description = z[0]["description"]
    table.append(weather_description)
  
    # print following values 
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
  
else:
    print(" City Not Found ")
