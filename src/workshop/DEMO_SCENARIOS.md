# 🎬 Scénarios de Démonstration - Ateliers NestJS

## 🎯 Scénario Complet de Démonstration

### Étape 1 : Préparation (2 minutes)

#### 1.1 Démarrer MongoDB
```bash
mongod
```

#### 1.2 Démarrer l'application
```bash
npm run start:dev
```

Attendez le message : `Server running on http://localhost:3000`

---

### Étape 2 : ATELIER 1 - CRUD et Hooks (10 minutes)

#### 2.1 Créer des utilisateurs et observer les hooks

**Créer un ADMIN**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123","role":"ADMIN"}'
```

**Logs attendus dans la console :**
```
[WorkshopUser] [BeforeInsert] Preparing to create user: admin@example.com
[WorkshopUser] [AfterInsert] User created successfully - ID: 675d..., Email: admin@example.com
```

**Créer plusieurs CLIENTS**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"client1@gmail.com","password":"client123","role":"CLIENT"}'

curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"client2@yahoo.com","password":"client456","role":"CLIENT"}'

curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"user@microsoft.com","password":"user123","role":"CLIENT"}'
```

#### 2.2 Récupérer un utilisateur (observer @AfterLoad)

```bash
curl -X GET http://localhost:3000/users/email/admin@example.com
```

**Log attendu :**
```
[WorkshopUser] [AfterLoad] User retrieved from database - ID: 675d...
```

#### 2.3 Activer un utilisateur (observer @AfterUpdate)

```bash
curl -X PUT http://localhost:3000/users/activate \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

**Log attendu :**
```
[WorkshopUser] [AfterUpdate] User updated - ID: 675d..., Email: admin@example.com
```

#### 2.4 Vérifier les utilisateurs actifs

```bash
curl -X GET http://localhost:3000/users/active/list
```

**Résultat attendu :** Liste avec l'admin activé

#### 2.5 Mettre à jour un utilisateur (remplacer {id} par un vrai ID)

```bash
curl -X PUT http://localhost:3000/users/{id} \
  -H "Content-Type: application/json" \
  -d '{"email":"newemail@example.com"}'
```

**Log attendu :**
```
[WorkshopService] Updating user {id}: {"email":"newemail@example.com"}
[WorkshopUser] [AfterUpdate] User updated - ID: 675d...
```

---

### Étape 3 : ATELIER 2 - Intercepteur de Sérialisation (5 minutes)

#### 3.1 Tester en tant qu'ADMIN (tous les champs)

```bash
curl -X GET http://localhost:3000/admin/users \
  -H "x-user-role: ADMIN"
```

**Résultat attendu :**
```json
[
  {
    "id": "675d...",
    "email": "admin@example.com",
    "role": "ADMIN",
    "createdAt": "2024-12-14T10:30:00.000Z",
    "updatedAt": "2024-12-14T10:35:00.000Z"
  }
]
```

#### 3.2 Tester en tant que CLIENT (champs limités)

```bash
curl -X GET http://localhost:3000/client/users \
  -H "x-user-role: CLIENT"
```

**Résultat attendu :**
```json
[
  {
    "id": "675d...",
    "email": "admin@example.com"
  }
]
```

**✅ Validation :** Comparez les deux réponses - CLIENT ne voit que id et email !

---

### Étape 4 : ATELIER 2 - Requêtes MongoDB Avancées (15 minutes)

#### 4.1 Créer des utilisateurs avec différents domaines

```bash
# Utilisateurs Microsoft
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"john@microsoft.com","password":"john123","role":"CLIENT"}'

curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@microsoft.com","password":"jane123","role":"CLIENT"}'

# Utilisateurs Google
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"bob@google.com","password":"bob123","role":"CLIENT"}'

# Utilisateurs Example
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"alice123","role":"CLIENT"}'
```

#### 4.2 Filtrer par domaine email

```bash
curl -X GET http://localhost:3000/admin/users/by-domain/microsoft.com \
  -H "x-user-role: ADMIN"
```

**Résultat attendu :** Seulement john@microsoft.com et jane@microsoft.com

#### 4.3 Statistiques - Comptage par rôle

```bash
curl -X GET http://localhost:3000/admin/users/stats/by-role \
  -H "x-user-role: ADMIN"
```

**Résultat attendu :**
```json
{
  "ADMIN": 1,
  "CLIENT": 6
}
```

#### 4.4 Utilisateurs créés récemment (7 derniers jours)

```bash
curl -X GET http://localhost:3000/admin/users/recent?days=7 \
  -H "x-user-role: ADMIN"
```

**Résultat attendu :** Tous les utilisateurs créés aujourd'hui

#### 4.5 Pagination

```bash
curl -X GET "http://localhost:3000/admin/users/paginated?page=1&limit=3" \
  -H "x-user-role: ADMIN"
```

**Résultat attendu :**
```json
{
  "data": [...],
  "total": 7,
  "page": 1,
  "limit": 3
}
```

#### 4.6 Tri par date de création (décroissant)

```bash
curl -X GET "http://localhost:3000/admin/users/sorted/created?order=DESC" \
  -H "x-user-role: ADMIN"
```

**Résultat attendu :** Utilisateurs du plus récent au plus ancien

#### 4.7 Tri multiple (rôle puis date)

```bash
curl -X GET http://localhost:3000/admin/users/sorted/multiple \
  -H "x-user-role: ADMIN"
```

**Résultat attendu :** ADMIN en premier, puis CLIENT, triés par date

#### 4.8 Utilisateurs les plus récents

```bash
curl -X GET "http://localhost:3000/admin/users/stats/most-recent?limit=3" \
  -H "x-user-role: ADMIN"
```

**Résultat attendu :** Les 3 derniers utilisateurs créés

#### 4.9 Moyenne des jours entre création et mise à jour

```bash
curl -X GET http://localhost:3000/admin/users/stats/average-days \
  -H "x-user-role: ADMIN"
```

**Résultat attendu :** Un nombre (ex: 0.5 si récemment créés)

---

### Étape 5 : ATELIER 2 - Manipulation en Masse (5 minutes)

#### 5.1 Mise à jour en masse du rôle par domaine

```bash
curl -X PUT "http://localhost:3000/admin/users/bulk-update-role?domain=microsoft.com" \
  -H "Content-Type: application/json" \
  -H "x-user-role: ADMIN" \
  -d '{"role":"ADMIN"}'
```

**Log attendu :**
```
[WorkshopService] Updated role to ADMIN for 2 users with domain @microsoft.com
```

**Vérification :**
```bash
curl -X GET http://localhost:3000/admin/users/stats/by-role \
  -H "x-user-role: ADMIN"
```

**Résultat attendu :**
```json
{
  "ADMIN": 3,
  "CLIENT": 4
}
```

#### 5.2 Désactiver les comptes inactifs (simulation)

```bash
curl -X PUT "http://localhost:3000/admin/users/deactivate-inactive?months=12" \
  -H "x-user-role: ADMIN"
```

**Résultat attendu :** Nombre d'utilisateurs désactivés

---

## 🎯 Checklist de Validation Finale

### Atelier 1
- [ ] Utilisateurs créés avec succès
- [ ] Logs @BeforeInsert visibles
- [ ] Logs @AfterInsert visibles
- [ ] Logs @AfterLoad visibles lors de la récupération
- [ ] Activation d'utilisateur fonctionne
- [ ] Logs @AfterUpdate visibles
- [ ] Mise à jour partielle fonctionne
- [ ] Liste des utilisateurs actifs correcte

### Atelier 2
- [ ] Intercepteur filtre correctement pour ADMIN (tous les champs)
- [ ] Intercepteur filtre correctement pour CLIENT (id et email uniquement)
- [ ] Filtrage par domaine fonctionne
- [ ] Statistiques par rôle correctes
- [ ] Pagination fonctionne avec métadonnées
- [ ] Tri par date fonctionne
- [ ] Tri multiple fonctionne
- [ ] Mise à jour en masse fonctionne
- [ ] Logs de mise à jour en masse visibles

---

## 📊 Résultats Attendus

Après avoir suivi tous les scénarios, vous devriez avoir :

- **7 utilisateurs** dans la base de données
- **3 ADMIN** (1 initial + 2 Microsoft promus)
- **4 CLIENT** (Google, Example, etc.)
- **Logs complets** dans la console pour tous les hooks
- **Différences visibles** entre les réponses ADMIN et CLIENT

---

## 🎓 Points d'Apprentissage Clés

1. **Hooks TypeORM** : Observez les logs à chaque opération
2. **Intercepteur** : Comparez les réponses ADMIN vs CLIENT
3. **Requêtes MongoDB** : Testez les filtres, tri, pagination
4. **Manipulation en masse** : Voyez comment mettre à jour plusieurs documents
5. **Validation** : Essayez de créer un doublon d'email (erreur attendue)

---

## 🚀 Aller Plus Loin

### Test d'Erreur : Doublon d'Email
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"test123","role":"CLIENT"}'
```

**Résultat attendu :** Erreur 409 Conflict - "Email already exists"

### Test d'Erreur : Activation avec mauvais mot de passe
```bash
curl -X PUT http://localhost:3000/users/activate \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"wrongpassword"}'
```

**Résultat attendu :** Erreur 409 Conflict - "Invalid password"

---

**🎉 Démonstration complète ! Tous les objectifs des ateliers sont validés !**

