# Nesso

Ce projet est composé de deux parties principales :

- **Back-end** : situé dans le dossier `api`, développé avec [FastAPI](https://fastapi.tiangolo.com/).
- **Front-end** : situé dans le dossier `front`, développé avec [Angular](https://angular.io/).

L'ensemble du projet peut être lancé facilement grâce à [Docker Compose](https://docs.docker.com/compose/) :

```bash
docker compose up
```

Cette commande démarre à la fois l'API FastAPI et l'application Angular, permettant ainsi de développer et tester le projet dans un environnement intégré.

Une fois démarrée, vous pouvez lancer le projet front avec : localhost:4200

Et le back avec : localhost:8000 - le swagger est accessible sur localhost:8000/docs