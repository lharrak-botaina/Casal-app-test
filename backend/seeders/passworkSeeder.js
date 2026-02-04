const { Passwork } = require('../models/passwork');
const faker = require('./utils/faker');

/**
 * Seeds the Passworks (training programs) collection with sample data
 * @param {number} count - Number of training programs to create
 * @param {Array} associations - Array of association objects
 * @param {Array} companies - Array of company objects (optional)
 * Returns an array of created passwork IDs
 */
async function seedPassworks(count = 5, associations = [], companies = []) {
  console.log(`🌱 Seeding ${count} training programs...`);

  const passworks = [];
  const modules = [
    'ICT Basics', 'Advanced Marketing', 'Financial Literacy', 'Entrepreneurship',
    'Leadership Development', 'Digital Skills', 'Communication Skills', 'Technical Training'
  ];

  try {
    if (associations.length === 0) {
      console.warn('⚠️ No associations provided, training programs may lack associations');
    }

    for (let i = 0; i < count; i++) {
      const title = faker.getRandomTrainingProgram();

      // Check if already exists (using title and start_date combination)
      const startDate = faker.generateRandomDate(new Date(2023, 0, 1), new Date(2024, 0, 1));
      const existing = await Passwork.findOne({ title, start_date: startDate });
      if (existing) {
        passworks.push(existing);
        continue;
      }

      const selectedAssociations = [];
      if (associations.length > 0) {
        const numAssociations = Math.min(
          Math.floor(Math.random() * 2) + 1,
          associations.length
        );
        for (let j = 0; j < numAssociations; j++) {
          selectedAssociations.push(associations[(i + j) % associations.length]._id);
        }
      }

      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + Math.floor(Math.random() * 6) + 1);

      const passwork = new Passwork({
        title: title,
        module: modules[i % modules.length],
        associations: selectedAssociations,
        company: companies.length > 0 ? companies[i % companies.length]._id : undefined,
        training_center: {
          name: `Training Center ${i + 1}`,
          address: faker.generateAddress(),
          phone: faker.generatePhone(),
          email: faker.generateEmail(`trainingcenter-${i}`)
        },
        nbr_beneficiaries: Math.floor(Math.random() * 50) + 10,
        start_date: startDate,
        end_date: endDate,
        training_modules: `Module 1: Basics, Module 2: Intermediate, Module 3: Advanced`,
        training_planning: `${Math.floor(Math.random() * 10) + 5} weeks, 3 sessions per week`,
        status: faker.getRandomJobStatus() // Using same status values
      });

      const savedPasswork = await passwork.save();
      passworks.push(savedPasswork);
      console.log(`✓ Training program created: ${title}`);
    }

    console.log(`✅ Training programs seeded successfully. Total: ${passworks.length}`);
    return passworks;
  } catch (error) {
    console.error('❌ Error seeding training programs:', error.message);
    throw error;
  }
}

module.exports = {
  seedPassworks
};
