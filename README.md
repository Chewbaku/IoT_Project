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
  A) Connexion au broker Mqtt en WiFi (Esp2286)  
    Emission sur 6 topics:  
    #Attention taux de rafraichissement différents !  
      - Temperature  
      - Humidité  
      - Pression   
      - Vent  
      - Sunrise  
      - Sunset  

  B) Récupération des données du capteur local  
    #Code Arduino avec pinMode.....  
    - Temperature ambiante  
    - Humidité ambiante  

  C) Récupération des données via le web  
    #Requetes HTTP....  
    - Temperature exterieure  
    - Humidité exterieure  
    - Vent  
    - Sunset  
    - Sunrise  

3) Interface - VueJS  
  Stockage des infos dans un objet JS par topic, les 10 derniers reçus (si possible)  
  Possibilité de choisir quel topic suivre  
  Affichage de la dernière info reçue/topic  
  Possibilité d'afficher les 10 dernières données sur un graphe  
