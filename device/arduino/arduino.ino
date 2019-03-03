#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"

//Network Declaration
const char* ssid     = "OnePlus3t";
const char* password = "promo60rpz";
const char* ServerAdress = "192.168.43.79";
int port = 1883;
WiFiClient WiFiclient;
PubSubClient client(WiFiclient);

//DHT Sensor Declaration
#define DHTPin 5 //for pin D1 on Esp8266
#define DHTTYPE DHT11 //for DHT11 sensor
DHT dht(DHTPin, DHTTYPE);

//Variables
unsigned long lastMillis = 0;

void setup() {
  Serial.begin(115200);
  delay(10);

  //DHT init
  dht.begin();

  //Network init
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  delay(2000);

  Serial.println("connecting to MQTT broker...");
  client.setServer(ServerAdress, port);

  if(client.connect("Esp8266")){
  Serial.println("connected");
  client.subscribe("arduino");
  } else {
  Serial.println("connection failed");
  }
  client.setCallback(callback);
  //end of Network init
  randomSeed(analogRead(0));//init random
}
//end of setup

//print message received for subscribed topic
void callback(char* topic, byte* payload, unsigned int length) {
  //header
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  String receivedString ="";
  //print the message
  for (int i=0;i<length;i++) {
  char receivedChar = (char)payload[i];
  receivedString += receivedChar;
  }
  Serial.println(receivedString);
  Serial.println();
}
//end of callback

void loop() {
  //limit the sending of messages
  if(millis() - lastMillis > 60000) {
  lastMillis = millis();
  client.publish("temperature_indoor", getTemp());
  client.publish("humidity_indoor", getHumidity());
  }
  client.loop();
}
//end of loop

char* getTemp(){
  float t = dht.readTemperature();
  if (isnan(t)){
    Serial.println("Failed to read from DHT sensor!");
    client.publish("temperature_indoor", "error");
  }else {
    String tmp = String(t);
    char* temperature = "";
    tmp.toCharArray(temperature, tmp.length()+1);
    return temperature;
  }
}

char* getHumidity(){
  float t = dht.readHumidity();
  if (isnan(t)){
    Serial.println("Failed to read from DHT sensor!");
    client.publish("humidity_indoor", "error");
  }else {
    String tmp = String(t);
    char* humidity = "";
    tmp.toCharArray(humidity, tmp.length()+1);
    return humidity;
  }
}
