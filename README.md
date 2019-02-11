# IoT_Project
Projet IoT ISEN
Nous allons développer dans cette branche et pas la master !!

1) Serveur Mqtt pour le broker sous mosquitto
  #Attention, a executer en admin
    - Démarrer le Serveur
        mosquitto.exe -c mosquitto.conf -v
    - Subscribe manuellement à un ou plusieurs topics
        mosquitto_sub.exe -t <topic>
    - Publish manuellement à un topic
        mosquitto_pub.exe -t <topic> -m <message>
    - Editer la config
        mosquitto.conf

2) Device - Arduino
  Emission sur 6 topics:
    - Temperature
    - Humidité
    - Pression
    - Vent
    - Sunrise
    - Sunset



3) Interface - VueJS
