# 🏗️ Architecture du Module Workshop

## 📊 Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                     APPLICATION NESTJS                       │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  WORKSHOP MODULE                        │ │
│  │                                                         │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │ │
│  │  │   Workshop   │  │    Admin     │  │   Client    │  │ │
│  │  │  Controller  │  │  Controller  │  │ Controller  │  │ │
│  │  │   (CRUD)     │  │  (Advanced)  │  │  (Limited)  │  │ │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘  │ │
│  │         │                 │                  │         │ │
│  │         └─────────────────┼──────────────────┘         │ │
│  │                           │                            │ │
│  │                  ┌────────▼────────┐                   │ │
│  │                  │  RoleSerialization│                 │ │
│  │                  │   Interceptor    │                  │ │
│  │                  └────────┬─────────┘                  │ │
│  │                           │                            │ │
│  │                  ┌────────▼────────┐                   │ │
│  │                  │ Workshop Service│                   │ │
│  │                  │  (25+ methods)  │                   │ │
│  │                  └────────┬─────────┘                  │ │
│  │                           │                            │ │
│  │                  ┌────────▼────────┐                   │ │
│  │                  │   MongoRepository│                  │ │
│  │                  │   (TypeORM)     │                   │ │
│  │                  └────────┬─────────┘                  │ │
│  │                           │                            │ │
│  └───────────────────────────┼────────────────────────────┘ │
│                              │                              │
│                     ┌────────▼────────┐                     │
│                     │  WorkshopUser   │                     │
│                     │     Entity      │                     │
│                     │   (with Hooks)  │                     │
│                     └────────┬────────┘                     │
│                              │                              │
└──────────────────────────────┼──────────────────────────────┘
                               │
                      ┌────────▼────────┐
                      │    MongoDB      │
                      │   atelier-db    │
                      │ workshop_users  │
                      └─────────────────┘
```

---

## 🔄 Flux de Données

### 1. Création d'un Utilisateur (POST /users)

```
Client Request
    │
    ▼
[ValidationPipe] ← Valide CreateWorkshopUserDto
    │
    ▼
[WorkshopController.create()]
    │
    ▼
[WorkshopService.create()]
    │
    ├─→ Vérification doublon email
    │
    ├─→ Création de l'entité
    │
    ▼
[@BeforeInsert Hook] ← Log avant insertion
    │
    ▼
[MongoRepository.save()]
    │
    ▼
[@AfterInsert Hook] ← Log après insertion
    │
    ▼
Response → Client
```

### 2. Récupération avec Intercepteur (GET /admin/users)

```
Client Request (x-user-role: ADMIN)
    │
    ▼
[AdminController.findAll()]
    │
    ▼
[RoleSerializationInterceptor] ← Capture le rôle
    │
    ▼
[WorkshopService.findAll()]
    │
    ▼
[MongoRepository.find()]
    │
    ▼
[@AfterLoad Hook] ← Log après récupération
    │
    ▼
[RoleSerializationInterceptor] ← Filtre les champs selon le rôle
    │
    ├─→ ADMIN: tous les champs
    └─→ CLIENT: id et email uniquement
    │
    ▼
Response → Client (données filtrées)
```

---

## 📦 Composants Détaillés

### Entité WorkshopUser
```typescript
@Entity('workshop_users')
class WorkshopUser {
  @ObjectIdColumn() id: ObjectId
  @Column() email: string
  @Column() password: string
  @Column() role: UserRole (ADMIN | CLIENT)
  @Column() active: boolean
  @CreateDateColumn() createdAt: Date
  @UpdateDateColumn() updatedAt: Date
  
  // Hooks
  @BeforeInsert() logBeforeInsert()
  @AfterInsert() logAfterInsert()
  @AfterUpdate() logAfterUpdate()
  @BeforeRemove() logBeforeRemove()
  @AfterLoad() logAfterLoad()
}
```

### DTOs
```typescript
CreateWorkshopUserDto
├─ email: string (validé avec @IsEmail)
├─ password: string (validé avec @MinLength(6))
└─ role?: UserRole (optionnel)

UpdateWorkshopUserDto extends PartialType(CreateWorkshopUserDto)

ActivateUserDto
├─ email: string
└─ password: string

PaginationDto
├─ page?: number (défaut: 1)
└─ limit?: number (défaut: 10)
```

### Service (25+ méthodes)
```typescript
WorkshopService
├─ CRUD de base (8 méthodes)
│  ├─ create()
│  ├─ findAll()
│  ├─ findOneById()
│  ├─ findOneByEmail()
│  ├─ findActive()
│  ├─ update()
│  ├─ remove()
│  └─ activateUser()
│
├─ Requêtes avancées (17 méthodes)
│  ├─ Récupération
│  │  ├─ findUsersExcludingFields()
│  │  ├─ findUsersNotUpdatedSince()
│  │  ├─ findUsersByEmailDomain()
│  │  └─ findUsersCreatedInLastDays()
│  │
│  ├─ Statistiques
│  │  ├─ countUsersByRole()
│  │  ├─ findUsersBetweenDates()
│  │  ├─ findMostRecentUsers()
│  │  └─ getAverageDaysBetweenCreatedAndUpdated()
│  │
│  ├─ Pagination & Tri
│  │  ├─ findUsersPaginated()
│  │  ├─ findUsersSortedByCreatedAt()
│  │  └─ findUsersWithMultipleSorting()
│  │
│  └─ Manipulation
│     ├─ createWithDuplicateCheck()
│     ├─ updateWithLogging()
│     ├─ deactivateInactiveUsers()
│     └─ bulkUpdateRoleByDomain()
```

### Contrôleurs
```typescript
WorkshopController (/users)
├─ POST /users
├─ PUT /users/activate
├─ GET /users/:id
├─ GET /users/email/:email
├─ GET /users/active/list
├─ PUT /users/:id
└─ DELETE /users/:id

AdminController (/admin/users)
├─ GET /admin/users
├─ GET /admin/users/not-updated
├─ GET /admin/users/by-domain/:domain
├─ GET /admin/users/recent
├─ GET /admin/users/stats/by-role
├─ GET /admin/users/stats/between-dates
├─ GET /admin/users/stats/most-recent
├─ GET /admin/users/stats/average-days
├─ GET /admin/users/paginated
├─ GET /admin/users/sorted/created
├─ GET /admin/users/sorted/multiple
├─ PUT /admin/users/deactivate-inactive
└─ PUT /admin/users/bulk-update-role

ClientController (/client/users)
├─ GET /client/users
└─ GET /client/users/paginated
```

---

## 🔐 Sécurité et Validation

### Validation des DTOs
```
class-validator
├─ @IsEmail() → Validation d'email
├─ @IsNotEmpty() → Champ requis
├─ @MinLength(6) → Longueur minimale
├─ @IsEnum() → Validation d'énumération
└─ @IsOptional() → Champ optionnel
```

### Intercepteur de Sérialisation
```
Header: x-user-role
├─ ADMIN → Tous les champs
│  ├─ id
│  ├─ email
│  ├─ role
│  ├─ createdAt
│  └─ updatedAt
│
└─ CLIENT → Champs limités
   ├─ id
   └─ email
```

---

## 📊 Base de Données MongoDB

```
Database: atelier-db
└─ Collection: workshop_users
   └─ Documents
      ├─ _id: ObjectId
      ├─ email: String (unique)
      ├─ password: String
      ├─ role: String (ADMIN | CLIENT)
      ├─ active: Boolean
      ├─ createdAt: Date
      └─ updatedAt: Date
```

---

## 🎯 Points Clés de l'Architecture

1. **Séparation des Responsabilités**
   - Contrôleurs : Gestion des requêtes HTTP
   - Service : Logique métier
   - Repository : Accès aux données
   - Entité : Modèle de données

2. **Validation en Couches**
   - ValidationPipe global
   - class-validator sur les DTOs
   - Vérifications métier dans le service

3. **Logging Complet**
   - Hooks TypeORM pour les événements de cycle de vie
   - Logger NestJS pour les opérations métier

4. **Flexibilité**
   - PartialType pour mise à jour partielle
   - Intercepteur dynamique selon le rôle
   - Requêtes MongoDB paramétrables

5. **Bonnes Pratiques**
   - DTOs pour la validation
   - Séparation Admin/Client
   - Gestion des erreurs (NotFoundException, ConflictException)
   - Code modulaire et réutilisable

---

**🏗️ Architecture robuste et professionnelle !**

