const { Company } = require('../models/company');
const faker = require('./utils/faker');

/**
 * Seeds the Companies collection with sample data
 * @param {number} count - Number of companies to create
 * @param {Array} users - Array of user objects to link with companies
 * Returns an array of created company IDs
 */
async function seedCompanies(count = 5, users = []) {
  console.log(`🌱 Seeding ${count} companies...`);

  const companies = [];
  const companyNames = [
    'Tech Innovations Inc', 'Global Solutions Ltd', 'Digital Ventures', 'Enterprise Systems',
    'Future Technologies', 'Smart Systems Corp', 'Cloud Dynamics', 'Data Insights',
    'Innovation Labs', 'Nexus Technologies'
  ];

  try {
    for (let i = 0; i < count; i++) {
      const name = companyNames[i % companyNames.length];

      // Check if already exists
      const existing = await Company.findOne({ name });
      if (existing) {
        companies.push(existing);
        continue;
      }

      const company = new Company({
        name: name,
        address: faker.generateAddress(),
        city: faker.generateCity(),
        logo: null,
        activity_area: faker.generateIndustry(),
        colaboration_type: 'Partnership',
        email: faker.generateEmail(`${name.replace(/\s+/g, '-').toLowerCase()}`),
        userId: users.length > 0 ? users[i % users.length]._id : undefined,
        person_contacted: {
          fullname: faker.generateFullName(),
          email: faker.generateEmail(),
          phone: faker.generatePhone()
        },
        socialMedia: {
          facebook: `https://facebook.com/${name.replace(/\s+/g, '')}`,
          instagram: `https://instagram.com/${name.replace(/\s+/g, '').toLowerCase()}`,
          linkedIn: `https://linkedin.com/company/${name.replace(/\s+/g, '-').toLowerCase()}`,
          twitter: `https://twitter.com/${name.replace(/\s+/g, '')}`
        }
      });

      const savedCompany = await company.save();
      companies.push(savedCompany);
      console.log(`✓ Company created: ${name}`);
    }

    console.log(`✅ Companies seeded successfully. Total: ${companies.length}`);
    return companies;
  } catch (error) {
    console.error('❌ Error seeding companies:', error.message);
    throw error;
  }
}

module.exports = {
  seedCompanies
};
