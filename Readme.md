Bienvenue dans le Readme de ce projet :

Instructions pour configurer et exécuter le :

## Backend :

## Prérequis

- Avoir Python installé (version 3.8 ou supérieure)
- Gestionnaire de paquets Python "pip"
- Un environnement virtuel Python

## Installation

- Vous devez d'abord cloner le projet et naviguer à l'intérieur du dépôt

- Créer un environnement virtuel en suivant les commandes suivante :

    python -m venv env
    source env/bin/activate

- Les dépendances nécessaires au bon fonctionnement du projet se trouvent dans le fichier "requirements.txt" se trouvant dans le dossier
"/backend/github_service/".

Il faut donc procéder à l'installation de ces dépendances avec la commande suivante :

    pip install -r requirements.txt

- Une fois toutes les dépendances installées vous pouvez lancer le serveur local en vous plaçant dans le répertoire /backend/github_service :

    python manage.py runserver

## Fonctionnalités

Nous avons eu à développer deux routes principales pour notre service, une documentation Swagger a été générée à cet effet et est disponible sur http://127.0.0.1:8000/swagger/ une fois que vous avez démarrer le serveur.

- Les deux routes principales développées sont :

/repositories : qui récupère la liste des dépôts créés au cours des trente derniers jours et nous présente le résultat avec les données suivante : le nom du dépôt, la description liée au dépôt, le langage de programmation utilisé dans ce dépôt, le nombre d'étoile du dépôt, le nombre total de données, la date de récupération etc.

/languages : qui récupère la liste des dépôts et nous retourne les différents langages utilisés dans ces dépôts

- La pagination : pour la pagination nous avons utilsé les paramètres "per_page" et "page" de l'api de Github. Alors pour effectuer la requête de récupération des données on passe à notre endpoint ces deux paramètre de la manière suivante : /repositories/?page=1&per_page=15

- L'implémentation du cache : pour implémenter le cache nous avons ajouter l'option CACHE dans settings.py et nous avons utilisé le cache par défaut de django. Lorsque la requête est effectuée pour la première fois on le met dans le cache avec la méthode set() et on lui attribue une clé. Cette clé est unique à cette requête et permet d'invalider le cache après 300 secondes donc 5 minutes.

- La gestion d'erreur :


## Frontend

## Prérequis

- Avoir Nodejs (v 18.0.0 et plus) et npm installé
- Générer un access token Github afin de pouvoir effectué les requêtes directement vers l'API


## Installation

- Vous devez d'abord cloné le projet et naviguer à l'intérieur du dossier frontend

- Exécuter la commande "npm install" à l'intérieur du dossier frontend

- Démarrer le serveur de développement avec la commande "npm run dev"

## Fonctionnalités

- Pour la gestion de la mise en cache niveau frontend nous avons utilisé Tanstack Query qui nous permet de récupérer les données et les mets par défaut en cache, on a aussi la possiblité d'augmenter la durée que font les donnée dans le cache avec l'attribut gcTime de Tanstack Query. Un hook a été écrit dans le dossier /hooks et qui nous permet d'effectuer la requête GET en utilisant axios. La requête effectuée dispose d'une queryKey qui permet d'indexer de manière unique cette requête.

- Pour la pagination nous avons toujours utilisé Tanstack Query, nous avons défini également un state de type number [page, setPage], page qui a pour valeur par défaut 1. Ainsi dans l'url de la requête on passe la page et et le nombre de données qu'on veut récupérer avec le paramètre per_page. Ensuite une fonction "fetchMoreData" permet de récupérer à chaque fois les données suivantes et on peut revenir en arrière sans que les données ne se rechargent.

- Pour la recherche nous avons défini un state [actifFilter, setActifFilter] de type string qui va contenir la recherche qu'on effectuera. De plus nous avons utilisé Tanstack Table qui nous permet d'effectuer multiples opérations sur notre tableau notamment la recherche avec les fonctions "getFilteredRowModel", "globalFilterFn" qui nous permet de filtrer les différentes lignes en fonction de notre recherche. Aussi on spécifie quelles colonnes inclure dans les recherches.

- Ensuite nous avons implémenter un filtre qui nous permet de filtrer les données par langage de programmation avec une fonction applyFilter qui prend en paramètre la données récupérées, le langage de programmation et le champ dans les données récupérées.