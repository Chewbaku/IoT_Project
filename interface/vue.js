var app = new Vue({
  el: '#app',
  data: {
    topic:"",
    message: 'waiting a message...',
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
  template: `
	<div>
		<p>{{ data }}</p>

		<h1>{{ steven }}</h1>
		<h1>{{ agePotValue }}</h1>
		<div id="thechart"></div>
	</div>
	`,
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
        case "pressure":
          //this.pressure.push(parseFloat(message.payloadString));
          this.pressure = message.payloadString;
          console.log('pressure :', message.payloadString);
          break;
        case "wind":
          //this.wind.push(parseFloat(message.payloadString));
          this.wind = message.payloadString;
          console.log('wind :', message.payloadString);
          break;
        case "sunset":
          //this.sunset.push(message.payloadString);
          this.sunset = message.payloadString;
          console.log('sunset :', message.payloadString);
          break;
        case "sunrise":
          //this.sunrise.push(message.payloadString);
          this.sunrise = message.payloadString;
          console.log('sunrise :', message.payloadString);
          break;
        case "sun_time":
          //this.sun_time.push(message.payloadString);
           this.sun_time = message.payloadString;
          console.log('sun_time :', message.payloadString);
          break;
        case "weather_description":
          //this.weather.push(message.payloadString);
           this.weather = message.payloadString;
          console.log('weather_description :', message.payloadString);
          break;
        default:
          console.log("Message cant be loaded");
      }
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
                       name: 'Température extérieure',
                       data: app.tempOut},
                       {
                          name: 'Température intérieure',
                          data: app.tempIn
                       },
                    {
                       name: 'Humidité intérieure',
                       data: app.humIn
                    },
                    {
                       name: 'Humidité exterieure',
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
  }
});
