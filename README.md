# IoT_Project
Projet IoT ISEN  
Nous allons développer dans cette branche et pas la master !!  

1) Serveur Mqtt pour le broker sous mosquitto  
  Adresse du serveur : 192.168.43.79  
  Port : 1883

  Attention, a executer en admin  
    - Démarrer le Serveur  
        mosquitto.exe -c mosquitto.conf -v  
    - Subscribe manuellement à un ou plusieurs topics  
        mosquitto_sub.exe -t <topic>  
    - Publish manuellement à un topic  
        mosquitto_pub.exe -t <topic> -m <message>  
    - Editer la config  
      #Modifier Adresse serveur et port d'écoute  
        mosquitto.conf  

2) Device - Arduino  
  A) Connexion au broker Mqtt en WiFi (Esp8266)  
    Emission sur 6 topics:  
    #Attention taux de rafraichissement différents !  
      - Temperature extérieure  
      - Humidité extérieure  
      - Pression   
      - Vent  
      - Sunrise  
      - Sunset  

  B) Récupération des données du capteur local  
    Capteur DHT 11 -> pin D1, 3V et GND  
    - Temperature ambiante  
    - Humidité ambiante  
    
3) Scripts Python 
  Récupération des données via le web  
    #Requetes HTTP....  
    - Temperature exterieure  
    - Humidité exterieure  
    - Vent  
    - Sunset  
    - Sunrise
      
   Template du retour par Open Weather API :  
   {"coord":{"lon":139,"lat":35},  
    "sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},  
    "weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],  
    "main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},  
    "wind":{"speed":7.31,"deg":187.002},  
    "rain":{"3h":0},  
    "clouds":{"all":92},  
    "dt":1369824698,  
    "id":1851632,  
    "name":"Shuzenji",  
    "cod":200}  

4) Interface - VueJS  
  Stockage des infos dans un objet JS par topic, les 10 derniers reçus (si possible)  
  Possibilité de choisir quel topic suivre  
  Affichage de la dernière info reçue/topic  
  Possibilité d'afficher les 10 dernières données sur un graphe  
