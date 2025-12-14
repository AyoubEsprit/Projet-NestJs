# Guide des Ateliers NestJS - TypeORM & MongoDB

## 📋 Vue d'ensemble

Ce module implémente **deux ateliers complets** sur NestJS, TypeORM et MongoDB :
1. **Data Serialization & MongoRepository**
2. **TypeORM & Hooks**

---

## 🚀 Démarrage

### Prérequis
- MongoDB installé et en cours d'exécution sur `localhost:27017`
- Node.js et npm installés

### Lancer l'application
```bash
npm run start:dev
```

L'application sera disponible sur `http://localhost:3000`

---

## 📚 ATELIER 1 : TypeORM & Hooks

### Objectif
Mettre en pratique les connaissances sur TypeORM avec l'entité User, incluant CRUD complet et hooks.

### Endpoints disponibles

#### 1. Créer un utilisateur
```http
POST http://localhost:3000/users
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "CLIENT"
}
```

#### 2. Activer un utilisateur
```http
PUT http://localhost:3000/users/activate
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 3. Obtenir un utilisateur par ID
```http
GET http://localhost:3000/users/{id}
```

#### 4. Obtenir un utilisateur par email
```http
GET http://localhost:3000/users/email/user@example.com
```

#### 5. Obtenir tous les utilisateurs actifs
```http
GET http://localhost:3000/users/active/list
```

#### 6. Mettre à jour un utilisateur
```http
PUT http://localhost:3000/users/{id}
Content-Type: application/json

{
  "email": "newemail@example.com"
}
```

#### 7. Supprimer un utilisateur
```http
DELETE http://localhost:3000/users/{id}
```

### Hooks TypeORM implémentés

- **@BeforeInsert** : Log avant l'insertion
- **@AfterInsert** : Log après l'insertion
- **@AfterUpdate** : Log après la mise à jour
- **@BeforeRemove** : Log avant la suppression
- **@AfterLoad** : Log après la récupération

---

## 📚 ATELIER 2 : Data Serialization & Requêtes Avancées

### Objectif
Implémenter un intercepteur de sérialisation dynamique et des requêtes MongoDB avancées.

### Intercepteur de Sérialisation

L'intercepteur filtre les champs retournés selon le rôle de l'utilisateur :

**Header requis** : `x-user-role: ADMIN` ou `x-user-role: CLIENT`

- **ADMIN** : Reçoit tous les champs (id, email, role, createdAt, updatedAt)
- **CLIENT** : Reçoit uniquement (id, email)

### Endpoints Admin

#### 1. Liste complète des utilisateurs
```http
GET http://localhost:3000/admin/users
x-user-role: ADMIN
```

#### 2. Utilisateurs non mis à jour depuis X mois
```http
GET http://localhost:3000/admin/users/not-updated?months=6
x-user-role: ADMIN
```

#### 3. Utilisateurs par domaine email
```http
GET http://localhost:3000/admin/users/by-domain/example.com
x-user-role: ADMIN
```

#### 4. Utilisateurs créés récemment
```http
GET http://localhost:3000/admin/users/recent?days=7
x-user-role: ADMIN
```

#### 5. Statistiques - Comptage par rôle
```http
GET http://localhost:3000/admin/users/stats/by-role
x-user-role: ADMIN
```

#### 6. Utilisateurs entre deux dates
```http
GET http://localhost:3000/admin/users/stats/between-dates?startDate=2024-01-01&endDate=2024-12-31
x-user-role: ADMIN
```

#### 7. Utilisateurs les plus récents
```http
GET http://localhost:3000/admin/users/stats/most-recent?limit=10
x-user-role: ADMIN
```

#### 8. Moyenne des jours entre création et mise à jour
```http
GET http://localhost:3000/admin/users/stats/average-days
x-user-role: ADMIN
```

#### 9. Pagination
```http
GET http://localhost:3000/admin/users/paginated?page=1&limit=10
x-user-role: ADMIN
```

#### 10. Tri par date de création
```http
GET http://localhost:3000/admin/users/sorted/created?order=DESC
x-user-role: ADMIN
```

#### 11. Tri multiple (rôle puis date)
```http
GET http://localhost:3000/admin/users/sorted/multiple
x-user-role: ADMIN
```

#### 12. Désactiver les comptes inactifs
```http
PUT http://localhost:3000/admin/users/deactivate-inactive?months=12
x-user-role: ADMIN
```

#### 13. Mise à jour en masse du rôle par domaine
```http
PUT http://localhost:3000/admin/users/bulk-update-role?domain=example.com
Content-Type: application/json
x-user-role: ADMIN

{
  "role": "ADMIN"
}
```

### Endpoints Client

#### 1. Liste des utilisateurs (champs limités)
```http
GET http://localhost:3000/client/users
x-user-role: CLIENT
```

#### 2. Pagination (champs limités)
```http
GET http://localhost:3000/client/users/paginated?page=1&limit=10
x-user-role: CLIENT
```

---

## 🏗️ Architecture du Code

### Structure des fichiers
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
│   ├── admin.controller.ts           # Contrôleur admin
│   └── client.controller.ts          # Contrôleur client
├── workshop.controller.ts            # Contrôleur principal (CRUD)
├── workshop.service.ts               # Service avec toutes les méthodes
├── workshop.module.ts                # Module NestJS
└── WORKSHOP_GUIDE.md                 # Ce guide
```

### Entité WorkshopUser

Propriétés :
- `id` : ObjectId MongoDB
- `email` : String (unique)
- `password` : String
- `role` : Enum (ADMIN | CLIENT)
- `active` : Boolean (false par défaut)
- `createdAt` : Date (auto)
- `updatedAt` : Date (auto)

### Hooks implémentés
- `@BeforeInsert` : Log avant insertion
- `@AfterInsert` : Log après insertion
- `@AfterUpdate` : Log après mise à jour
- `@BeforeRemove` : Log avant suppression
- `@AfterLoad` : Log après récupération

---

## 🧪 Tests avec Postman

### Collection Postman recommandée

1. **Créer des utilisateurs de test**
```json
POST /users
{
  "email": "admin@example.com",
  "password": "admin123",
  "role": "ADMIN"
}

POST /users
{
  "email": "client@gmail.com",
  "password": "client123",
  "role": "CLIENT"
}
```

2. **Tester l'intercepteur**
- Appeler `/admin/users` avec `x-user-role: ADMIN` → Tous les champs
- Appeler `/client/users` avec `x-user-role: CLIENT` → Seulement id et email

3. **Tester les requêtes avancées**
- Créer plusieurs utilisateurs avec différents domaines
- Tester les filtres par domaine
- Tester la pagination
- Tester les statistiques

---

## 📊 Requêtes MongoDB Avancées Implémentées

### Récupération de données
✅ Utilisateurs sans mise à jour depuis +6 mois
✅ Utilisateurs créés durant les 7 derniers jours
✅ Utilisateurs par domaine email
✅ Exclusion de champs selon le rôle

### Statistiques
✅ Comptage par rôle (aggregation)
✅ Utilisateurs entre deux dates
✅ Utilisateurs les plus récents
✅ Moyenne des jours entre création et mise à jour

### Pagination & Tri
✅ Pagination avec page et limit
✅ Tri par createdAt DESC
✅ Tri multiple (role puis createdAt)

### Manipulation
✅ Ajout avec vérification de doublon email
✅ Mise à jour avec journalisation
✅ Désactivation des comptes inactifs
✅ Mise à jour en masse du rôle par domaine

---

## 🔍 Validation des Données

Toutes les DTOs utilisent `class-validator` :
- `@IsEmail()` : Validation d'email
- `@IsNotEmpty()` : Champ requis
- `@MinLength(6)` : Longueur minimale
- `@IsEnum()` : Validation d'énumération
- `@IsOptional()` : Champ optionnel

---

## 📝 Notes Importantes

1. **MongoDB doit être en cours d'exécution** sur `localhost:27017`
2. **La base de données** `atelier-db` sera créée automatiquement
3. **synchronize: true** crée automatiquement les collections
4. **Les logs** sont visibles dans la console pour tous les hooks
5. **L'intercepteur** utilise le header `x-user-role` pour filtrer les données

---

## 🎯 Objectifs Pédagogiques Atteints

### Atelier 1
✅ Configuration MongoDB avec TypeORM
✅ Création d'entité avec ObjectId
✅ CRUD complet (Create, Read, Update, Delete)
✅ PartialType pour mise à jour partielle
✅ Hooks TypeORM (@BeforeInsert, @AfterInsert, etc.)
✅ Logger NestJS
✅ Activation de compte avec vérification

### Atelier 2
✅ Intercepteur personnalisé NestJS
✅ Sérialisation dynamique selon le rôle
✅ Requêtes MongoDB avancées
✅ Aggregation et statistiques
✅ Pagination et tri
✅ Manipulation en masse
✅ Séparation Admin/Client

---

## 🚀 Prochaines Étapes

1. Tester tous les endpoints avec Postman
2. Vérifier les logs dans la console
3. Expérimenter avec différents rôles
4. Ajouter des tests unitaires
5. Implémenter l'authentification JWT (optionnel)

---

**Bon atelier ! 🎓**

