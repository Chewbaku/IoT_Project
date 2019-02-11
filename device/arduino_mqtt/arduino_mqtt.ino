#include <ESP8266WiFi.h>
#include <PubSubClient.h>

//Declaration Network
const char* ssid     = "OnePlus3t";
const char* password = "promo60rpz";
const char* ipAdress = "192.168.43.79";
int port = 1883;
WiFiClient WiFiclient;
PubSubClient client(WiFiclient);

//Variables
unsigned long lastMillis = 0;

void setup() {
//Network init
Serial.begin(115200);
delay(10);
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
client.setServer(ipAdress, port);

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
if(millis() - lastMillis > 1000) {
lastMillis = millis();
client.publish("temperature", getTemp());
client.publish("humidity", getHumidity());
client.publish("pression", getPression());
client.publish("wind", getWind());
client.publish("sunrise", getSunrise());
client.publish("sunset", getSunset());
}
client.loop();
}
//end of loop

char* getTemp(){
String tmp = String(random(-5, 35));
char* temperature = "";
tmp.toCharArray(temperature, tmp.length()+1);
return temperature;
}

char* getHumidity(){
String tmp = String(random(0, 100));
char* humidity = "";
tmp.toCharArray(humidity, tmp.length()+1);
return humidity;
}

char* getPression(){
String tmp = String(random(1000, 1100));
char* pression = "";
tmp.toCharArray(pression, tmp.length()+1);
return pression;
}

char* getWind(){
String tmp = String(random(0, 150));
char* wind = "";
tmp.toCharArray(wind, tmp.length()+1);
return wind;
}

char* getSunset(){
String tmp = String(random(0, 100));
char* sunset = "";
tmp.toCharArray(sunset, tmp.length()+1);
return sunset;
}

char* getSunrise(){
String tmp = String(random(0, 150));
char* sunrise = "";
tmp.toCharArray(sunrise, tmp.length()+1);
return sunrise;
}
