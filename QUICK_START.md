# 🚀 Quick Start - Ateliers NestJS

## ⚡ Démarrage Rapide (5 minutes)

### 1️⃣ Configuration de l'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Modifier .env si nécessaire (optionnel pour le développement local)
```

### 2️⃣ Démarrer MongoDB
```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
# ou
mongod --dbpath /path/to/data
```

### 3️⃣ Lancer l'application
```bash
cd projet-nest
npm run start:dev
```

Attendez le message : `Server running on http://localhost:3000`

### 4️⃣ Tester rapidement

#### Créer un utilisateur
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@example.com\",\"password\":\"admin123\",\"role\":\"ADMIN\"}"
```

#### Tester l'intercepteur (Admin - tous les champs)
```bash
curl -X GET http://localhost:3000/admin/users \
  -H "x-user-role: ADMIN"
```

#### Tester l'intercepteur (Client - champs limités)
```bash
curl -X GET http://localhost:3000/client/users \
  -H "x-user-role: CLIENT"
```

---

## 📋 Checklist de Démarrage

- [ ] MongoDB installé et démarré
- [ ] Application lancée avec `npm run start:dev`
- [ ] Premier utilisateur créé
- [ ] Logs visibles dans la console
- [ ] Endpoints testés avec Postman ou curl

---

## 📚 Documentation Complète

1. **[ATELIERS_IMPLEMENTATION.md](./ATELIERS_IMPLEMENTATION.md)** - Vue d'ensemble complète
2. **[src/workshop/README.md](./src/workshop/README.md)** - Documentation du module
3. **[src/workshop/WORKSHOP_GUIDE.md](./src/workshop/WORKSHOP_GUIDE.md)** - Guide détaillé
4. **[src/workshop/TEST_DATA.md](./src/workshop/TEST_DATA.md)** - Données de test

---

## 🎯 Endpoints Principaux

### CRUD de Base
- `POST /users` - Créer
- `PUT /users/activate` - Activer
- `GET /users/:id` - Obtenir par ID
- `GET /users/email/:email` - Obtenir par email
- `GET /users/active/list` - Utilisateurs actifs

### Admin (Header: `x-user-role: ADMIN`)
- `GET /admin/users` - Liste complète
- `GET /admin/users/stats/by-role` - Statistiques
- `GET /admin/users/paginated?page=1&limit=10` - Pagination

### Client (Header: `x-user-role: CLIENT`)
- `GET /client/users` - Liste limitée (id et email)

---

## 🔧 Outils Recommandés

### Option 1 : Postman
1. Importer `src/workshop/Workshop_Postman_Collection.json`
2. Tester tous les endpoints

### Option 2 : VS Code REST Client
1. Installer l'extension "REST Client"
2. Ouvrir `src/workshop/workshop.http`
3. Cliquer sur "Send Request"

### Option 3 : MongoDB Compass
1. Se connecter à `mongodb://localhost:27017`
2. Voir la base `atelier-db`
3. Collection `workshop_users`

---

## 🎓 Prochaines Étapes

1. ✅ Créer plusieurs utilisateurs de test
2. ✅ Tester tous les endpoints CRUD
3. ✅ Vérifier les logs dans la console
4. ✅ Tester l'intercepteur avec différents rôles
5. ✅ Tester les requêtes avancées MongoDB
6. ✅ Expérimenter avec la pagination et le tri

---

## 🆘 Problèmes Courants

### MongoDB ne démarre pas
```bash
# Vérifier si MongoDB est installé
mongod --version

# Créer le dossier de données
mkdir -p /data/db

# Démarrer avec un chemin spécifique
mongod --dbpath /path/to/data
```

### Port 3000 déjà utilisé
```bash
# Tuer le processus sur le port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Erreurs de compilation
```bash
# Nettoyer et réinstaller
rm -rf node_modules dist
npm install
npm run build
```

---

## 📊 Exemple de Logs Attendus

```
[Nest] 12345  - 14/12/2024, 10:30:00   LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 14/12/2024, 10:30:01   LOG [InstanceLoader] WorkshopModule dependencies initialized
[Nest] 12345  - 14/12/2024, 10:30:01   LOG [RoutesResolver] WorkshopController {/users}
[Nest] 12345  - 14/12/2024, 10:30:01   LOG [RoutesResolver] AdminController {/admin/users}
[Nest] 12345  - 14/12/2024, 10:30:01   LOG [RoutesResolver] ClientController {/client/users}
Server running on http://localhost:3000

[WorkshopUser] [BeforeInsert] Preparing to create user: admin@example.com
[WorkshopUser] [AfterInsert] User created successfully - ID: 675d..., Email: admin@example.com
[WorkshopUser] [AfterLoad] User retrieved from database - ID: 675d...
```

---

**🎉 Vous êtes prêt ! Bon atelier !**

