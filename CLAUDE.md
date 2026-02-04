# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CASAL is a youth employment management and training platform connecting young people with employment opportunities, skill development, and capacity building services. It coordinates between youth beneficiaries, associations, companies, and training centers.

## Development Commands

### Frontend (Angular 11)
```bash
cd frontend
npm install          # Install dependencies
npm start            # Dev server at http://localhost:4200
npm run build        # Build to dist/frontend
npm run build -- --prod  # Production build
npm test             # Run unit tests (Karma)
npm run e2e          # Run e2e tests (Protractor)
npm run lint         # Run TSLint
```

### Backend (Node.js/Express)
```bash
cd backend
npm install          # Install dependencies
node index.js        # Start server on port 3000
```

### Environment Configuration
Backend uses `config` package. Set environment variables:
- `CASAL_JWT` - JWT private key
- `CASAL_DB` - MongoDB connection string (default: `mongodb://localhost:27017/casal`)

## Architecture

### Monorepo Structure
- `frontend/` - Angular 11 SPA
- `backend/` - Express REST API with MongoDB

### Backend Architecture

**Entry Point:** `backend/index.js` initializes Express with startup modules from `startup/`

**API Routes** (`/api/*`):
| Endpoint | Purpose |
|----------|---------|
| `/api/users` | User account management |
| `/api/signin`, `/api/signout` | Authentication |
| `/api/associations` | Association CRUD |
| `/api/companies` | Company CRUD |
| `/api/jobs` | Job listings |
| `/api/young` | Youth profiles (central entity) |
| `/api/passworks` | Training programs |
| `/api/stats` | Analytics |

**Data Model:** The `Young` model is the central entity, aggregating:
- `personal_info` (YoungInfoSchema)
- `skills_assessment` (YoungSkillsSchema)
- `capacity_building` (YoungCapacitySchema)
- `passwork` (YoungPassworkSchema)
- `insertion` (YoungInsertionSchema)

**Middleware:**
- `auth.js` - JWT token verification from `SESSIONID` cookie
- `admin.js`, `company.js` - Role-based access
- `validate.js` - Joi schema validation
- `csrf.js` - CSRF protection

**Validation:** Uses `@hapi/joi` for request validation in routes

### Frontend Architecture

**Lazy-loaded Modules:**
- `/casal/*` → `AdminModule` (admin dashboard)
- `/association/*` → `AssociationModule` (association portal)
- `/company/*` → `CompanyModule` (company portal)
- `/signIn` → `SignInComponent`
- `/stats` → `ReportsComponent`

**Core Module** (`core/`):
- `guards/` - Route guards: `AuthGuard`, `AdminGuard`, `AssociationGuard`, `CompanyGuard`
- `interceptors/` - HTTP interceptors: `APIInterceptor` (prefixes `/api`), `csrf`, `error`, `loading`
- `services/` - API services for each entity
- `models/` - TypeScript interfaces
- `directives/` - RBAC directive for template-level access control

**Shared Module** (`shared/`):
- Reusable form components: `text-input`, `select-input`, `date-input`, `file-input`, `textarea-input`
- UI modules: `MaterialModule`, `PrimeNgModule`
- Common components: `toolbar`, `footer`, `young-card`

**UI Libraries:** Angular Material + PrimeNG + Bootstrap grid

### Authentication Flow
1. Login via `/api/signin` returns user object, sets `SESSIONID` JWT cookie
2. `AuthGuard` checks authentication state via `AuthenticationService.isConnected()`
3. Role-based redirects: admin → `/casal/home`, association → `/association/young`, company → `/company/young`
4. API requests include credentials via `allowCredentials` interceptor

### User Roles
- `admin` - Full system access
- `association` - Manage youth under their organization
- `company` - View candidates, manage job postings

## Key Patterns

- Backend validation uses Joi schemas exported alongside Mongoose models
- Frontend services follow pattern: one service per entity in `core/services/`
- Document generation uses `jspdf` and `docx` libraries for CV/report export
- Static files served from `backend/public/` for uploads (photos, documents)
