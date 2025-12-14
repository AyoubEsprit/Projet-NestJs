# Données de Test pour les Ateliers

## 📝 Utilisateurs de Test à Créer

### 1. Administrateurs
```json
POST http://localhost:3000/users
{
  "email": "admin@example.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

```json
POST http://localhost:3000/users
{
  "email": "superadmin@company.com",
  "password": "super123",
  "role": "ADMIN"
}
```

### 2. Clients
```json
POST http://localhost:3000/users
{
  "email": "client1@gmail.com",
  "password": "client123",
  "role": "CLIENT"
}
```

```json
POST http://localhost:3000/users
{
  "email": "client2@yahoo.com",
  "password": "client456",
  "role": "CLIENT"
}
```

```json
POST http://localhost:3000/users
{
  "email": "user@example.com",
  "password": "user123",
  "role": "CLIENT"
}
```

```json
POST http://localhost:3000/users
{
  "email": "test@example.com",
  "password": "test123",
  "role": "CLIENT"
}
```

```json
POST http://localhost:3000/users
{
  "email": "demo@company.com",
  "password": "demo123",
  "role": "CLIENT"
}
```

### 3. Utilisateurs avec différents domaines
```json
POST http://localhost:3000/users
{
  "email": "john@microsoft.com",
  "password": "john123",
  "role": "CLIENT"
}
```

```json
POST http://localhost:3000/users
{
  "email": "jane@microsoft.com",
  "password": "jane123",
  "role": "CLIENT"
}
```

```json
POST http://localhost:3000/users
{
  "email": "bob@google.com",
  "password": "bob123",
  "role": "CLIENT"
}
```

---

## 🧪 Scénarios de Test

### Scénario 1 : Test du CRUD de base (Atelier 1)

1. **Créer un utilisateur**
   - Utiliser `POST /users` avec les données ci-dessus
   - Vérifier que `active = false` par défaut
   - Observer les logs `@BeforeInsert` et `@AfterInsert`

2. **Activer l'utilisateur**
   - Utiliser `PUT /users/activate`
   - Vérifier que `active = true`
   - Observer le log `@AfterUpdate`

3. **Récupérer l'utilisateur**
   - Par ID : `GET /users/{id}`
   - Par email : `GET /users/email/{email}`
   - Observer le log `@AfterLoad`

4. **Mettre à jour l'utilisateur**
   - Utiliser `PUT /users/{id}`
   - Observer le log `@AfterUpdate`

5. **Supprimer l'utilisateur**
   - Utiliser `DELETE /users/{id}`
   - Observer le log `@BeforeRemove`

---

### Scénario 2 : Test de l'Intercepteur (Atelier 2)

1. **En tant qu'ADMIN**
   - Header : `x-user-role: ADMIN`
   - Appeler `GET /admin/users`
   - Vérifier que la réponse contient : id, email, role, createdAt, updatedAt

2. **En tant que CLIENT**
   - Header : `x-user-role: CLIENT`
   - Appeler `GET /client/users`
   - Vérifier que la réponse contient SEULEMENT : id, email

---

### Scénario 3 : Test des Requêtes Avancées

1. **Filtrer par domaine**
   - Créer plusieurs utilisateurs avec `@example.com`
   - Appeler `GET /admin/users/by-domain/example.com`
   - Vérifier que seuls les utilisateurs avec ce domaine sont retournés

2. **Utilisateurs récents**
   - Créer de nouveaux utilisateurs
   - Appeler `GET /admin/users/recent?days=7`
   - Vérifier que seuls les utilisateurs créés récemment sont retournés

3. **Statistiques par rôle**
   - Créer plusieurs ADMIN et CLIENT
   - Appeler `GET /admin/users/stats/by-role`
   - Vérifier le comptage : `{ "ADMIN": 2, "CLIENT": 5 }`

4. **Pagination**
   - Créer au moins 15 utilisateurs
   - Appeler `GET /admin/users/paginated?page=1&limit=10`
   - Vérifier : `{ data: [...], total: 15, page: 1, limit: 10 }`

5. **Tri**
   - Appeler `GET /admin/users/sorted/created?order=DESC`
   - Vérifier que les utilisateurs sont triés du plus récent au plus ancien

6. **Mise à jour en masse**
   - Créer plusieurs utilisateurs avec `@microsoft.com`
   - Appeler `PUT /admin/users/bulk-update-role?domain=microsoft.com` avec `{ "role": "ADMIN" }`
   - Vérifier que tous les utilisateurs Microsoft sont maintenant ADMIN

---

## ✅ Checklist de Validation

### Atelier 1
- [ ] Création d'utilisateur avec `active = false`
- [ ] Activation d'utilisateur avec vérification du mot de passe
- [ ] Récupération par ID
- [ ] Récupération par email
- [ ] Liste des utilisateurs actifs
- [ ] Mise à jour partielle (PartialType)
- [ ] Suppression d'utilisateur
- [ ] Logs visibles pour tous les hooks

### Atelier 2
- [ ] Intercepteur filtre correctement pour ADMIN
- [ ] Intercepteur filtre correctement pour CLIENT
- [ ] Requête par domaine email
- [ ] Utilisateurs non mis à jour depuis X mois
- [ ] Utilisateurs créés dans les X derniers jours
- [ ] Comptage par rôle
- [ ] Utilisateurs entre deux dates
- [ ] Utilisateurs les plus récents
- [ ] Moyenne des jours
- [ ] Pagination fonctionnelle
- [ ] Tri par date
- [ ] Tri multiple
- [ ] Désactivation des comptes inactifs
- [ ] Mise à jour en masse par domaine

---

## 🔍 Vérification des Logs

Lors de l'exécution, vous devriez voir dans la console :

```
[WorkshopUser] [BeforeInsert] Preparing to create user: admin@example.com
[WorkshopUser] [AfterInsert] User created successfully - ID: 675d..., Email: admin@example.com
[WorkshopUser] [AfterLoad] User retrieved from database - ID: 675d...
[WorkshopUser] [AfterUpdate] User updated - ID: 675d..., Email: admin@example.com
[WorkshopUser] [BeforeRemove] About to delete user - ID: 675d..., Email: admin@example.com
[WorkshopService] Updating user 675d...: {"email":"newemail@example.com"}
[WorkshopService] Updated role to ADMIN for 2 users with domain @microsoft.com
```

---

## 💡 Conseils

1. **Créer les données dans l'ordre** : Commencez par créer plusieurs utilisateurs avant de tester les requêtes avancées
2. **Utiliser Postman** : Importez la collection fournie pour gagner du temps
3. **Observer les logs** : Gardez la console ouverte pour voir les hooks en action
4. **Tester les erreurs** : Essayez de créer un doublon d'email, d'activer avec un mauvais mot de passe, etc.
5. **Vérifier MongoDB** : Utilisez MongoDB Compass pour voir les données directement dans la base

---

**Bon test ! 🚀**

