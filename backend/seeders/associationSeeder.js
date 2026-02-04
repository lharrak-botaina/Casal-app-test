const { Association } = require('../models/association');
const faker = require('./utils/faker');

/**
 * Seeds the Associations collection with sample data
 * @param {number} count - Number of associations to create
 * @param {Array} users - Array of user objects to link with associations
 * Returns an array of created association IDs
 */
async function seedAssociations(count = 3, users = []) {
  console.log(`🌱 Seeding ${count} associations...`);

  const associations = [];
  const associationNames = [
    'Youth Action', 'Future Leaders', 'Community Support', 'Skills Development Center',
    'Innovation Hub', 'Empowerment Initiative', 'Global Youth Network', 'Next Generation'
  ];

  try {
    for (let i = 0; i < count; i++) {
      const name = associationNames[i % associationNames.length];
      const raisonSocial = faker.generateRaisonSocial(`${name}-${i}`);

      // Check if already exists
      const existing = await Association.findOne({ raisonSocial });
      if (existing) {
        associations.push(existing);
        continue;
      }

      const association = new Association({
        raisonSocial: raisonSocial,
        name: name,
        address: faker.generateAddress(),
        city: faker.generateCity(),
        email: faker.generateEmail(`${raisonSocial}`),
        webSite: `https://www.${raisonSocial}.com`,
        socialMedia: {
          facebook: `https://facebook.com/${raisonSocial}`,
          instagram: `https://instagram.com/${raisonSocial}`,
          linkedIn: `https://linkedin.com/company/${raisonSocial}`,
          twitter: `https://twitter.com/${raisonSocial}`
        },
        description: `${name} is dedicated to empowering young people through skill development and capacity building programs.`,
        logo: null,
        tip: {
          fullname: faker.generateFullName(),
          email: faker.generateEmail(),
          phone: faker.generatePhone(),
          photo: null
        },
        userId: users.length > 0 ? users[i % users.length]._id : undefined,
        collaborationDate: faker.generateRandomDate(),
        creationDate: faker.generateRandomDate()
      });

      const savedAssociation = await association.save();
      associations.push(savedAssociation);
      console.log(`✓ Association created: ${name}`);
    }

    console.log(`✅ Associations seeded successfully. Total: ${associations.length}`);
    return associations;
  } catch (error) {
    console.error('❌ Error seeding associations:', error.message);
    throw error;
  }
}

module.exports = {
  seedAssociations
};
