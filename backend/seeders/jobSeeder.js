const { Job } = require('../models/job');
const faker = require('./utils/faker');

/**
 * Seeds the Jobs collection with sample data
 * @param {number} count - Number of jobs to create
 * @param {Array} companies - Array of company objects
 * @param {Array} associations - Array of association objects (optional, for sharedWith)
 * @param {Array} users - Array of user objects for createdBy
 * Returns an array of created job IDs
 */
async function seedJobs(count = 10, companies = [], associations = [], users = []) {
  console.log(`🌱 Seeding ${count} jobs...`);

  const jobs = [];
  const jobTitles = [
    'Junior Developer', 'Senior Developer', 'Project Manager', 'Business Analyst',
    'UI/UX Designer', 'Quality Assurance Engineer', 'DevOps Engineer', 'Data Scientist',
    'Product Manager', 'Marketing Specialist', 'Sales Executive', 'HR Manager'
  ];

  const jobDescriptions = [
    'We are looking for an enthusiastic and skilled professional to join our growing team. You will work on challenging projects and develop your career with us.',
    'Join our innovative company and help shape the future of technology. Excellent benefits and career growth opportunities await.',
    'Be part of a dynamic team working on cutting-edge solutions. We value creativity, teamwork, and continuous learning.',
    'Help us build amazing products that change lives. Competitive salary and comprehensive benefits package included.',
    'Seeking a talented individual to contribute to our mission. Work-life balance and professional development are our priorities.'
  ];

  try {
    if (companies.length === 0) {
      console.warn('⚠️ No companies provided, jobs will be created without company references');
    }

    for (let i = 0; i < count; i++) {
      const reference = faker.generateJobReference();

      // Check if already exists
      const existing = await Job.findOne({ reference });
      if (existing) {
        jobs.push(existing);
        continue;
      }

      const selectedCompany = companies.length > 0 ? companies[i % companies.length] : null;
      const selectedAssociations = [];

      // Randomly select 1-3 associations to share the job with
      if (associations.length > 0) {
        const numAssociations = Math.min(
          Math.floor(Math.random() * 3) + 1,
          associations.length
        );
        for (let j = 0; j < numAssociations; j++) {
          selectedAssociations.push(associations[(i + j) % associations.length]._id);
        }
      }

      const job = new Job({
        reference: reference,
        title: jobTitles[i % jobTitles.length],
        company: selectedCompany ? selectedCompany._id : undefined,
        location: faker.generateCity(),
        description: jobDescriptions[i % jobDescriptions.length],
        status: faker.getRandomJobStatus(),
        activity_area: faker.generateIndustry(),
        type_contrat: faker.getRandomContractType(),
        createdBy: users.length > 0 ? users[i % users.length]._id : undefined,
        sharedWith: selectedAssociations
      });

      const savedJob = await job.save();
      jobs.push(savedJob);
      console.log(`✓ Job created: ${jobTitles[i % jobTitles.length]}`);
    }

    console.log(`✅ Jobs seeded successfully. Total: ${jobs.length}`);
    return jobs;
  } catch (error) {
    console.error('❌ Error seeding jobs:', error.message);
    throw error;
  }
}

module.exports = {
  seedJobs
};
