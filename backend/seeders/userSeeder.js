const { User } = require('../models/user');
const accountService = require('../services/account');
const faker = require('./utils/faker');

/**
 * Seeds the Users collection with sample data
 * Returns an array of created user IDs
 */
async function seedUsers(count = 5) {
  console.log(`🌱 Seeding ${count} users...`);

  const users = [];

  try {
    // Create admin user (already exists from mongo.js startup, but check)
    const adminExists = await User.findOne({ email: 'admin@admin.com' });
    if (!adminExists) {
      const admin = await accountService.add('admin@admin.com', 'admin', 'admin');
      users.push(admin);
      console.log('✓ Admin user created');
    } else {
      users.push(adminExists);
      console.log('✓ Admin user already exists');
    }

    // Create association admin users
    for (let i = 0; i < Math.ceil(count / 2); i++) {
      const email = faker.generateEmail(`assoc-admin-${i}`);
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        const user = await accountService.add(email, 'password123', 'association');
        users.push(user);
      } else {
        users.push(existingUser);
      }
    }

    // Create company admin users
    for (let i = 0; i < Math.floor(count / 2); i++) {
      const email = faker.generateEmail(`company-admin-${i}`);
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        const user = await accountService.add(email, 'password123', 'company');
        users.push(user);
      } else {
        users.push(existingUser);
      }
    }

    console.log(`✅ Users seeded successfully. Total: ${users.length}`);
    return users;
  } catch (error) {
    console.error('❌ Error seeding users:', error.message);
    throw error;
  }
}

module.exports = {
  seedUsers
};
