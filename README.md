# IoT_Project
Projet IoT ISEN

Pour ce projet d'internet des objets, nous avons du réaliser une "station météo miniature" à placer dans un logement,  
Les informations mesurées sont consultables sur un ordinateur client qui est connecté au broker.  

Pour cela nous avons du en premier lien choisir la technologie à utiliser pour transmettre ces données.  
Nous choix s'est porté sur un serveur MQTT, car c'est une technologie que l'on maitrisait bien, et qui semblait adaptée.  
En effet, la souscription aux différents topic est flexible, et surout on peut facilement gérer plusieurs clients,  
(les publishers qui envoient les données et les subscribers les recoivent, le serveur servant de passerelle)  
Grâce au serveur qui permet que les données transittent, les publishers et les clients soit donc indépendants.  

Il y a donc une partie de récupération des données via le capteur de température DHT sous Arduino,  
puis l'envoi des données, et finalement la réception et l'affichage graphique.
Pour ce dernier nous avons utilisé VueJS.

Pour pouvoir executer le projet, suivre les indications ci dessous :

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
      mosquitto.conf:  
        listener 1883 0.0.0.0  
        listener 61614  
        protocol websockets  


2) Capteur de température Arduin  
  A) Connexion au broker Mqtt en WiFi (Esp8266)  
    Emission sur 2 topics:  
      - Temperature extérieure  
      - Humidité extérieure     

  B) Récupération des données du capteur local  
    Capteur DHT 11 -> pin D1, 3V et GND  
    - Temperature ambiante  
    - Humidité ambiante  

3) Scripts Python  
  Récupération des données via le web via Requetes HTTP    
    Emission sur 5 topics:
    - Temperature exterieure  
    - Humidité exterieure  
    - Vent  
    - Sunset  
    - Sunrise
    - Suntime
    - Description du Ciel (Nuageux...)  

   Le script permet de demander la météo extérieure pour une ville donnée,  
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
  Les données reçues venant du serveur sont lues et stockées dans des objets, seuls les 12 dernières sont sauvegardées  
  Une partie est affichée sur un graphique, si l'on clique sur la légende, il est possible d'afficher ou cacher une courbe.    
  Au survol d'une valeur, on peut distinguer sa valeur exacte.
  Le reste des informations est affiché dans un tableau récapitulatif sous le graphique.
