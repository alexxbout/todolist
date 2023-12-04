# Projet TodoList en Vue.js

## Introduction

Ce projet TodoList en Vue.js a été réalisé avec succès en utilisant la bibliothèque officielle de Vue.js et l'API Composition. Contrairement aux indications du TP, nous avons choisi d'exploiter l'approche moderne de la composition pour une meilleure maintenabilité et lisibilité du code.

## Déploiement

Le projet a été déployé sur deux plates-formes :

1. **GitHub Personnel:** Vous pouvez accéder à la version en ligne ici [lien](https://alexxbout.github.io/todolist/).

2. **VM de l'ISTIC:** Dans le cadre du projet de déploiement, le projet est également accessible sur les VM de l'ISTIC à l'adresse suivante : [http://noamalexandre.istic.univ-rennes1.fr/](http://noamalexandre.istic.univ-rennes1.fr/).

## Technologies utilisées

- **Vue.js et API Composition:** La partie front-end du projet a été développée en utilisant la bibliothèque officielle Vue.js, mettant en œuvre l'API Composition pour une structuration efficace du code.

- **Axios pour la consommation de l'API REST:** Les informations de la TodoList sont chargées dynamiquement à partir d'une API REST en utilisant la bibliothèque Axios.

- **TailwindCSS:** Le Framework TailwindCSS a été choisi pour styliser l'interface utilisateur, offrant une approche utilitaire pour la conception de l'interface.

## Respect des bonnes pratiques

Nous avons pris soin de respecter les bonnes pratiques de développement, en particulier en ce qui concerne les hooks du cycle de vie de Vue.js. Lors du passage des propriétés (props), nous avons adopté le principe d'événement pour garantir que les propriétés ne sont pas modifiées directement depuis le parent.