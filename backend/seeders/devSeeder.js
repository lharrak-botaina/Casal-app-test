#!/usr/bin/env node

/**
 * Development Database Seeder
 *
 * This script populates the MongoDB database with realistic sample data
 * for development and testing purposes.
 *
 * IMPORTANT: This seeder will clear existing data and replace it with seed data.
 * Only use on development databases!
 *
 * Usage:
 *   node backend/seeders/devSeeder.js
 *
 * Or add to package.json:
 *   "seed": "node backend/seeders/devSeeder.js"
 *   npm run seed
 */

const mongoose = require('mongoose');
const config = require('config');
const NODE_ENV = process.env.NODE_ENV || 'development';

// Prevent running in production
if (NODE_ENV === 'production') {
  console.error('❌ ERROR: Cannot run seeders in production environment!');
  console.error('   Set NODE_ENV=development to run seeders.');
  process.exit(1);
}
// Import individual seeders
const { seedUsers } = require('./userSeeder');
const { seedAssociations } = require('./associationSeeder');
const { seedCompanies } = require('./companySeeder');
const { seedJobs } = require('./jobSeeder');
const { seedPassworks } = require('./passworkSeeder');
const { seedYoung } = require('./youngSeeder');

// Import models for clearing
const { User } = require('../models/user');
const { Association } = require('../models/association');
const { Company } = require('../models/company');
const { Job } = require('../models/job');
const { Passwork } = require('../models/passwork');
const { Young } = require('../models/young');

// Configuration
const SEED_CONFIG = {
  users: 8,
  associations: 3,
  companies: 5,
  jobs: 10,
  passworks: 5,
  young: 15,
  clearDatabase: false  // Set to true to clear all data before seeding
};

/**
 * Connect to MongoDB
 */
async function connectToDatabase() {
  try {
    const dbUri = config.get('db') || process.env.CASAL_DB || 'mongodb://127.0.0.1:27017/casal';

    console.log('\n📡 Connecting to MongoDB...');
    console.log(`   Database: ${dbUri}`);

    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      retryWrites: false
    });

    console.log('✅ Connected to MongoDB\n');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

/**
 * Clear all collections (optional)
 */
async function clearDatabase() {
  if (!SEED_CONFIG.clearDatabase) {
    console.log('⏭️  Skipping database clearing (set clearDatabase: true to clear)\n');
    return;
  }

  console.log('🗑️  Clearing database...');
  try {
    await Promise.all([
      User.deleteMany({}),
      Association.deleteMany({}),
      Company.deleteMany({}),
      Job.deleteMany({}),
      Passwork.deleteMany({}),
      Young.deleteMany({})
    ]);
    console.log('✅ Database cleared\n');
  } catch (error) {
    console.error('❌ Error clearing database:', error.message);
    throw error;
  }
}

/**
 * Main seeder orchestration function
 * Seeds collections in order of dependencies
 */
async function runSeeder() {
  try {
    console.log('╔════════════════════════════════════════╗');
    console.log('║   CASAL Development Database Seeder    ║');
    console.log('╚════════════════════════════════════════╝');

    // Step 1: Clear database (optional)
    await clearDatabase();

    // Step 2: Seed Users (no dependencies)
    const users = await seedUsers(SEED_CONFIG.users);

    // Step 3: Seed Associations (depends on Users)
    const associations = await seedAssociations(
      SEED_CONFIG.associations,
      users
    );

    // Step 4: Seed Companies (depends on Users)
    const companies = await seedCompanies(
      SEED_CONFIG.companies,
      users
    );

    // Step 5: Seed Passworks/Training Programs (depends on Associations and optionally Companies)
    const passworks = await seedPassworks(
      SEED_CONFIG.passworks,
      associations,
      companies
    );

    // Step 6: Seed Jobs (depends on Companies, Associations, and Users)
    const jobs = await seedJobs(
      SEED_CONFIG.jobs,
      companies,
      associations,
      users
    );

    // Step 7: Seed Youth Profiles (depends on Passworks and optionally Associations)
    // This is the central entity that should be seeded last
    const youngProfiles = await seedYoung(
      SEED_CONFIG.young,
      associations,
      passworks
    );

    // Summary
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║        Seeding Complete! 🎉            ║');
    console.log('╚════════════════════════════════════════╝\n');
    console.log('📊 Summary:');
    console.log(`   • Users: ${users.length}`);
    console.log(`   • Associations: ${associations.length}`);
    console.log(`   • Companies: ${companies.length}`);
    console.log(`   • Training Programs: ${passworks.length}`);
    console.log(`   • Jobs: ${jobs.length}`);
    console.log(`   • Youth Profiles: ${youngProfiles.length}`);
    console.log('');
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('📴 Disconnected from MongoDB\n');
  }
}

// Run if executed directly
if (require.main === module) {
  connectToDatabase().then(() => runSeeder());
}

module.exports = {
  connectToDatabase,
  clearDatabase,
  runSeeder,
  SEED_CONFIG
};
