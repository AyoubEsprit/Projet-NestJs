# 🎓 Module Workshop - NestJS, TypeORM & MongoDB

## 📖 Description

Ce module implémente **deux ateliers complets** pour apprendre NestJS, TypeORM et MongoDB :

### **Atelier 1 : TypeORM & Hooks**
- Configuration MongoDB avec TypeORM
- Entité User avec ObjectId
- CRUD complet (Create, Read, Update, Delete)
- Hooks TypeORM (@BeforeInsert, @AfterInsert, @AfterUpdate, @BeforeRemove, @AfterLoad)
- Validation avec class-validator
- PartialType pour mise à jour partielle

### **Atelier 2 : Data Serialization & Requêtes MongoDB Avancées**
- Intercepteur de sérialisation dynamique basé sur le rôle
- Requêtes MongoDB avancées (filtres, aggregation, statistiques)
- Pagination et tri
- Manipulation en masse
- Séparation des endpoints Admin/Client

---

## 🚀 Démarrage Rapide

### 1. Prérequis
```bash
# MongoDB doit être en cours d'exécution
mongod --dbpath /path/to/data
```

### 2. Lancer l'application
```bash
npm run start:dev
```

### 3. Tester avec Postman
- Importer la collection : `Workshop_Postman_Collection.json`
- Suivre le guide : `WORKSHOP_GUIDE.md`
- Utiliser les données de test : `TEST_DATA.md`

---

## 📁 Structure du Module

```
workshop/
├── entities/
│   └── workshop-user.entity.ts       # Entité avec hooks TypeORM
├── dto/
│   ├── create-workshop-user.dto.ts   # DTO de création
│   ├── update-workshop-user.dto.ts   # DTO de mise à jour (PartialType)
│   ├── activate-user.dto.ts          # DTO d'activation
│   └── pagination.dto.ts             # DTO de pagination
├── interceptors/
│   └── role-serialization.interceptor.ts  # Intercepteur de sérialisation
├── controllers/
│   ├── admin.controller.ts           # Contrôleur admin (tous les champs)
│   └── client.controller.ts          # Contrôleur client (champs limités)
├── workshop.controller.ts            # Contrôleur principal (CRUD)
├── workshop.service.ts               # Service avec toutes les méthodes
├── workshop.module.ts                # Module NestJS
├── README.md                         # Ce fichier
├── WORKSHOP_GUIDE.md                 # Guide détaillé des ateliers
├── TEST_DATA.md                      # Données de test
└── Workshop_Postman_Collection.json  # Collection Postman
```

---

## 🎯 Endpoints Principaux

### CRUD de Base (Atelier 1)
- `POST /users` - Créer un utilisateur
- `PUT /users/activate` - Activer un utilisateur
- `GET /users/:id` - Obtenir par ID
- `GET /users/email/:email` - Obtenir par email
- `GET /users/active/list` - Liste des utilisateurs actifs
- `PUT /users/:id` - Mettre à jour
- `DELETE /users/:id` - Supprimer

### Admin (Atelier 2) - Header: `x-user-role: ADMIN`
- `GET /admin/users` - Liste complète
- `GET /admin/users/not-updated?months=6` - Non mis à jour
- `GET /admin/users/by-domain/:domain` - Par domaine
- `GET /admin/users/recent?days=7` - Créés récemment
- `GET /admin/users/stats/by-role` - Statistiques par rôle
- `GET /admin/users/paginated?page=1&limit=10` - Pagination
- `PUT /admin/users/bulk-update-role?domain=X` - Mise à jour en masse

### Client (Atelier 2) - Header: `x-user-role: CLIENT`
- `GET /client/users` - Liste (id et email uniquement)
- `GET /client/users/paginated` - Pagination (id et email uniquement)

---

## 🔧 Technologies Utilisées

- **NestJS** - Framework Node.js
- **TypeORM** - ORM pour TypeScript
- **MongoDB** - Base de données NoSQL
- **class-validator** - Validation des DTOs
- **class-transformer** - Transformation des données
- **RxJS** - Programmation réactive

---

## 📚 Documentation

- **[WORKSHOP_GUIDE.md](./WORKSHOP_GUIDE.md)** - Guide complet des ateliers avec tous les endpoints
- **[TEST_DATA.md](./TEST_DATA.md)** - Données de test et scénarios de validation
- **[Workshop_Postman_Collection.json](./Workshop_Postman_Collection.json)** - Collection Postman prête à l'emploi

---

## ✅ Fonctionnalités Implémentées

### Atelier 1
✅ Configuration MongoDB avec TypeORM  
✅ Entité avec ObjectId MongoDB  
✅ CRUD complet  
✅ Hooks TypeORM (5 hooks)  
✅ Logger NestJS  
✅ Validation avec class-validator  
✅ PartialType pour mise à jour partielle  
✅ Activation de compte avec vérification  

### Atelier 2
✅ Intercepteur de sérialisation dynamique  
✅ Filtrage par rôle (ADMIN vs CLIENT)  
✅ Requêtes MongoDB avancées (10+ requêtes)  
✅ Aggregation et statistiques  
✅ Pagination avec métadonnées  
✅ Tri simple et multiple  
✅ Manipulation en masse  
✅ Séparation Admin/Client  

---

## 🧪 Tests

### Tester avec Postman
1. Importer `Workshop_Postman_Collection.json`
2. Créer des utilisateurs de test (voir `TEST_DATA.md`)
3. Tester les endpoints Admin avec `x-user-role: ADMIN`
4. Tester les endpoints Client avec `x-user-role: CLIENT`
5. Observer les logs dans la console

### Vérifier les Hooks
Tous les hooks loggent dans la console :
- `@BeforeInsert` - Avant création
- `@AfterInsert` - Après création
- `@AfterUpdate` - Après mise à jour
- `@BeforeRemove` - Avant suppression
- `@AfterLoad` - Après récupération

---

## 💡 Exemples d'Utilisation

### Créer un utilisateur
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "role": "CLIENT"
  }'
```

### Tester l'intercepteur (Admin)
```bash
curl -X GET http://localhost:3000/admin/users \
  -H "x-user-role: ADMIN"
```

### Tester l'intercepteur (Client)
```bash
curl -X GET http://localhost:3000/client/users \
  -H "x-user-role: CLIENT"
```

---

## 🎓 Objectifs Pédagogiques

Ce module permet d'apprendre :
- Configuration de MongoDB avec TypeORM
- Utilisation des ObjectId MongoDB
- Création d'entités TypeORM
- Implémentation de hooks
- Validation avec class-validator
- Création d'intercepteurs personnalisés
- Requêtes MongoDB avancées
- Pagination et tri
- Séparation des responsabilités (Admin/Client)
- Bonnes pratiques NestJS

---

## 📞 Support

Pour toute question, consultez :
- [Documentation NestJS](https://docs.nestjs.com)
- [Documentation TypeORM](https://typeorm.io)
- [Documentation MongoDB](https://docs.mongodb.com)

---

**Bon apprentissage ! 🚀**

