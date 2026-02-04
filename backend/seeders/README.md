# Development Database Seeders

This directory contains seed scripts that populate the MongoDB database with realistic sample data for development and testing.

## Overview

The seeder system consists of:

- **Individual seeders**: Each collection has its own seeder module
  - `userSeeder.js` - User accounts (admin, association, company roles)
  - `associationSeeder.js` - NGO/association organizations
  - `companySeeder.js` - Company/employer accounts
  - `jobSeeder.js` - Job listings
  - `passworkSeeder.js` - Training programs
  - `youngSeeder.js` - Youth beneficiary profiles (central entity)

- **Utility modules**:
  - `utils/faker.js` - Fake data generation with realistic values

- **Main orchestrator**: `devSeeder.js` - Runs all seeders in dependency order

## Quick Start

### Run the seeder

```bash
cd backend
node seeders/devSeeder.js
```

Or add to `package.json`:

```json
{
  "scripts": {
    "seed": "node seeders/devSeeder.js"
  }
}
```

Then run:
```bash
npm run seed
```

## Dependency Order

Seeders are executed in this order to respect foreign key relationships:

```
1. Users (no dependencies)
   ↓
2. Associations (references Users)
   ↓
3. Companies (references Users)
   ↓
4. Passworks/Training (references Associations, Companies)
   ↓
5. Jobs (references Companies, Associations, Users)
   ↓
6. Youth Profiles (references Associations, Passworks)
```

## Configuration

Edit `SEED_CONFIG` in `devSeeder.js` to customize the number of records:

```javascript
const SEED_CONFIG = {
  users: 8,          // Total users to create
  associations: 3,   // Total associations
  companies: 5,      // Total companies
  jobs: 10,          // Total job listings
  passworks: 5,      // Total training programs
  young: 15,         // Total youth profiles
  clearDatabase: false  // Set true to clear all data before seeding
};
```

## Database Configuration

The seeder uses the same database configuration as your app:

- From `config/` package: `config.get('db.uri')`
- Or environment variable: `CASAL_DB`
- Default: `mongodb://127.0.0.1:27017/casal`

## Sample Data Generated

### Users
- **Admin user**: `admin@admin.com` (auto-created by app startup)
- **Association admins**: `assoc-admin-*.com` with `association` role
- **Company admins**: `company-admin-*.com` with `company` role

### Associations
- Realistic NGO/organization names
- Contact person (TIP) with name, email, phone
- Social media links
- City and address information

### Companies
- Tech companies and enterprises
- Contact person (person_contacted)
- Activity area/industry classification
- Social media links

### Jobs
- Job titles: Developer, Manager, Designer, Analyst, etc.
- References and descriptions
- Contract types: CDI, CDD, Stage, Freelance, Apprenticeship
- Status: active, inactive, closed
- Shared with multiple associations

### Training Programs
- Program titles and modules
- Training centers with contact info
- Beneficiary counts (10-60)
- Duration: 1-7 months
- Associated with associations and companies

### Youth Profiles
Central entity containing:

**Personal Info**:
- Full name, address, city
- Gender, birth date, phone
- ID numbers (CIN, CNSS)
- Civil status, housing type
- Health/physical state
- Hobbies and interests

**Skills Assessment**:
- Education level
- Work experience
- Hard/soft/life skills
- Language proficiency (Arabic, French, English)

**Capacity Building**:
- Training attendance records
- Mentorship enrollment
- Coaching sessions count
- Networking events attended

**Passwork/Training**:
- Current program enrollment
- Enrollment date
- Completion status
- Modules completed

**Insertion/Employment**:
- Job application count
- Interview history
- Current job (if employed)
- Job tracking records

## Faker Utilities

The `utils/faker.js` module provides functions for realistic data generation:

### Name & Contact
- `generateFullName()` - Random first + last name
- `generateEmail(name)` - Valid email addresses
- `generatePhone()` - Tunisian phone numbers
- `generateAddress()` - Street addresses

### Location & Industry
- `generateCity()` - Tunisian cities
- `generateIndustry()` - Business sectors

### Dates
- `generateRandomDate(start, end)` - Random date in range
- `generateBirthDate()` - Age 18-35

### Collections
- `generateRandomSkills(count)` - Random skill selection
- `generateRandomHobbies(count)` - Random hobby selection
- `getRandomElement(array)` - Random array element

### Data Format Generators
- `generateIdentifier()` - Youth profile ID
- `generateJobReference()` - Job listing reference
- `generateRaisonSocial(name)` - Organization slug

## Using Seeders Individually

Import and use individual seeders in your code:

```javascript
const { seedUsers } = require('./seeders/userSeeder');
const { seedCompanies } = require('./seeders/companySeeder');

// In your setup code
const users = await seedUsers(5);
const companies = await seedCompanies(3, users);
```

## Important Notes

⚠️ **Development Only**: These seeders are designed for development databases. Do not use on production.

⚠️ **Duplicate Prevention**: Seeders check for existing records before inserting to allow safe re-runs.

⚠️ **Data Relationships**: Ensure parent collections are seeded before dependent ones.

✅ **Idempotent**: You can run the seeder multiple times safely (without `clearDatabase: true`).

## Clearing Data

To start fresh with new data:

```javascript
// In devSeeder.js, set:
clearDatabase: true

// Then run:
npm run seed
```

Or clear specific collections:

```bash
# In MongoDB shell
db.users.deleteMany({})
db.associations.deleteMany({})
db.companies.deleteMany({})
db.jobs.deleteMany({})
db.passworks.deleteMany({})
db.young.deleteMany({})
```

## Troubleshooting

### Database Connection Error
- Ensure MongoDB is running
- Check `CASAL_DB` environment variable or database config
- Verify connection string format

### Duplicate Key Errors
- The seeder checks for existing records before inserting
- If you see duplicate errors, the data may already exist
- Use `clearDatabase: true` to replace existing data

### Schema Validation Errors
- Ensure all required fields are provided in seeders
- Check model schema in `models/` folder
- Verify field types and format

## Advanced Usage

### Seed with Custom Data

Modify individual seeder functions:

```javascript
// In userSeeder.js
async function seedUsers(count = 5) {
  // Customize user creation here
}
```

### Add More Seeders

Create new seeder following the pattern:

```javascript
// seeders/documentSeeder.js
async function seedDocuments(count = 10, users = []) {
  console.log(`🌱 Seeding ${count} documents...`);
  // Implementation
  return documents;
}

module.exports = { seedDocuments };
```

Then add to `devSeeder.js`:

```javascript
const { seedDocuments } = require('./documentSeeder');

// In runSeeder():
const documents = await seedDocuments(SEED_CONFIG.documents, users);
```

## Database Schema Info

See `CLAUDE.md` in project root for:
- Complete data model documentation
- Schema relationships
- API endpoint mappings
- Authentication flow

---

**Created**: 2026-01-15
**Database**: MongoDB + Mongoose
**Models**: User, Association, Company, Job, Passwork, Young
