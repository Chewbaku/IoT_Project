var app = new Vue({
  el: '#app',
  data: {
    topic: '',
    message: '',
    client: '',
    tempIn: [],
    humIn: [],
    tempOut: [],
    humOut: [],
    pressure: '',
    wind: '',
    sunset: '',
    sunrise: '',
    sun_time: '',
    weather: ''
  },
  mounted () {
    this.client = new Paho.MQTT.Client("127.0.0.1", 61614, "clientId");
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
    this.client.connect({ onSuccess: this.onConnect });
  },
  methods: {
    onConnect() {
      // Once a connection has been made, make a subscription and send a message.
      console.log("onConnect");
      this.client.subscribe("temperature_indoor");
      this.client.subscribe("humidity_indoor");
      this.client.subscribe("temperature_outdoor");
      this.client.subscribe("humidity_outdoor");
      this.client.subscribe("pressure");
      this.client.subscribe("wind");
      this.client.subscribe("sunset");
      this.client.subscribe("sunrise");
      this.client.subscribe("sun_time");
      this.client.subscribe("weather_description");

      message = new Paho.MQTT.Message("VueJSisConnected");
      message.destinationName = "connexion";
      this.client.send(message);
    },
    onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    },
    onMessageArrived(message) {
      this.topic = message.destinationName;
      this.message = message.payloadString;
      switch (this.topic) {
        case "pressure":
          this.pressure = message.payloadString;
          $("#pressure").html(this.pressure+" hPa");
          console.log('pressure :', message.payloadString);
          break;
        case "wind":
          this.wind = message.payloadString;
          $("#wind").html(this.wind+" km/h");
          console.log('wind :', message.payloadString);
          break;
        case "sunset":
          this.sunset = message.payloadString;
          $("#sunset").html(this.sunset);
          console.log('sunset :', message.payloadString);
          break;
        case "sunrise":
          this.sunrise = message.payloadString;
          $("#sunrise").html(this.sunrise);
          console.log('sunrise :', message.payloadString);
          break;
        case "sun_time":
          this.sun_time = message.payloadString;
          $("#sun_time").html(this.sun_time);
          console.log('sun_time :', message.payloadString);
          break;
        case "weather_description":
           this.weather = message.payloadString;
           $("#weather").html(this.weather);
          console.log('weather_description :', message.payloadString);
          break;
        default:
        $(document).ready(function() {
                   var title = {
                      text: 'Temperature and Humidity Historic'
                   };
                   var subtitle = {
                      text: 'Noémie Boillot - Anthony Carlier - Romain Ceccotti - Thibault Demylle'
                   };
                   var xAxis = {
                      categories: []
                   };
                   var yAxis = {
                      title: {
                         text: 'Temperature (\xB0C)'
                      },
                      plotLines: [{
                         value: 0,
                         width: 1,
                         color: '#808080'
                      }]
                   };

                   var tooltip = {
                      valueSuffix: '\xB0C'
                   }
                   var legend = {
                      layout: 'vertical',
                      align: 'right',
                      verticalAlign: 'middle',
                      borderWidth: 0
                   };
                   var series =  [{
                         name: 'Outside Temperature',
                         data: app.tempOut},
                         {
                            name: 'Temperature in the house',
                            data: app.tempIn
                         },
                      {
                         name: 'Humidity in the house',
                         data: app.humIn
                      },
                      {
                         name: 'Outside Humidity',
                         data: app.humOut
                      }
                   ];

                   var json = {};
                   json.title = title;
                   json.subtitle = subtitle;
                   json.xAxis = xAxis;
                   json.yAxis = yAxis;
                   json.tooltip = tooltip;
                   json.legend = legend;
                   json.series = series;

                   $('#app').highcharts(json);
                });
      }

      switch (this.topic) {
        case "temperature_indoor":
          this.tempIn.push(parseFloat(message.payloadString));
          console.log('temperature_indoor :', message.payloadString);
          break;
        case "humidity_indoor":
          this.humIn.push(parseFloat(message.payloadString));
          console.log('humidity_indoor :', message.payloadString);
          break;
        case "temperature_outdoor":
          this.tempOut.push(parseFloat(message.payloadString));
          console.log('temperature_outdoor :', message.payloadString);
          break;
        case "humidity_outdoor":
          this.humOut.push(parseFloat(message.payloadString));
          console.log('humidity_outdoor :', message.payloadString);
          break;
      }
    }
  }
});
