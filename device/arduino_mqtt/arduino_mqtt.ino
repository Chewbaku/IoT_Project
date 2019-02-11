#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid     = "OnePlus3t";
const char* password = "promo60rpz";

WiFiClient WiFiclient;
PubSubClient client(WiFiclient);

unsigned long lastMillis = 0;

void setup() {
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
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  delay(2000);

  Serial.print("connecting to MQTT broker...");
  client.setServer("192.168.43.138", 1883);

  if(client.connect("Esp8266")){
    Serial.println("connected");
    //client.subscribe("tututu_tu_tuu");
    } else {
      Serial.println("connection failed");
    }
    client.setCallback(callback);
    }

//print any message received for subscribed topic
void callback(char* topic, byte* payload, unsigned int length) {
Serial.print("Message arrived [");
Serial.print(topic);

Serial.print("] ");
for (int i=0;i<length;i++) {
char receivedChar = (char)payload[i];
Serial.print(receivedChar);
if (receivedChar == '0')
Serial.println("Off");
if (receivedChar == '1')
Serial.println("On");

}
Serial.println();
}

void loop() {
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

int getTemp(){
  return 10;
}
