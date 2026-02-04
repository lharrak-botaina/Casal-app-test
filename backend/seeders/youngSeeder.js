const { Young } = require('../models/young');
const faker = require('./utils/faker');

/**
 * Seeds the Young (youth profiles) collection with sample data
 * This is the central entity containing personal info, skills, capacity building, training, and insertion data
 * @param {number} count - Number of youth profiles to create
 * @param {Array} associations - Array of association objects (optional)
 * @param {Array} passworks - Array of passwork objects (optional)
 * Returns an array of created young profile IDs
 */
async function seedYoung(count = 10, associations = [], passworks = []) {
  console.log(`🌱 Seeding ${count} youth profiles...`);

  const youngProfiles = [];

  try {
    for (let i = 0; i < count; i++) {
      const fullname = faker.generateFullName();
      const identifier = faker.generateIdentifier();

      // Check if already exists
      const existing = await Young.findOne({ 'personal_info.identifier': identifier });
      if (existing) {
        youngProfiles.push(existing);
        continue;
      }

      // Generate personal info
      const personalInfo = {
        identifier: identifier,
        fullname: fullname,
        address: faker.generateAddress(),
        city: faker.generateCity(),
        gendre: faker.getRandomGender(),
        birth_date: faker.generateBirthDate(),
        inscription_date: faker.generateRandomDate(),
        photo: null,
        phone: faker.generatePhone(),
        cin_id: `ID${Math.floor(Math.random() * 900000000) + 100000000}`,
        cnss_id: `CNSS${Math.floor(Math.random() * 900000000) + 100000000}`,
        civil_status: faker.getRandomCivilStatus(),
        kids_nbr: Math.floor(Math.random() * 3),
        housing: faker.getRandomHousingType(),
        nationality: 'Tunisian',
        nationality_comment: '',
        people_in_charge_nbr: Math.floor(Math.random() * 3),
        current_function: Math.random() > 0.5 ? 'Student' : 'Job Seeker',
        associative_activity: Math.random() > 0.7 ? 'Volunteer' : '',
        hobbies: faker.generateRandomHobbies(),
        connectedBy: 'Association',
        isPriority: Math.random() > 0.8,
        physical_state: {
          addiction: {
            status: false,
            description: ''
          },
          handicap: {
            status: false,
            description: ''
          },
          health_issue: {
            status: false,
            chronic_illness: '',
            ongoing_treatment: ''
          }
        },
        rate: Math.floor(Math.random() * 5) + 1
      };

      // Generate skills assessment
      const skillsAssessment = {
        education_level: ['Primary', 'Secondary', 'Diploma', 'License', 'Master'][Math.floor(Math.random() * 5)],
        experience: {
          years: Math.floor(Math.random() * 5),
          description: 'Previous work experience and training'
        },
        hard_skills: faker.generateRandomSkills(3),
        soft_skills: faker.generateRandomSkills(3),
        life_skills: ['Resilience', 'Problem Solving', 'Creativity'],
        language_skills: {
          arabic: Math.floor(Math.random() * 5) + 1,
          french: Math.floor(Math.random() * 5) + 1,
          english: Math.floor(Math.random() * 5) + 1
        },
        assessment_date: faker.generateRandomDate(),
        assessed_by: 'Trainer'
      };

      // Generate capacity building
      const capacityBuilding = {
        trainings_attended: [],
        mentorship: {
          is_enrolled: Math.random() > 0.5,
          mentor_name: Math.random() > 0.5 ? faker.generateFullName() : '',
          start_date: faker.generateRandomDate()
        },
        coaching_sessions: Math.floor(Math.random() * 10),
        networking_events: Math.floor(Math.random() * 5),
        last_assessment_date: faker.generateRandomDate()
      };

      // If passworks provided, add training enrollments
      if (passworks.length > 0) {
        const numTrainings = Math.floor(Math.random() * 2) + 1;
        for (let j = 0; j < numTrainings; j++) {
          const passwork = passworks[(i + j) % passworks.length];
          capacityBuilding.trainings_attended.push({
            passwork_id: passwork._id,
            title: passwork.title,
            completion_status: ['completed', 'in_progress', 'not_started'][Math.floor(Math.random() * 3)],
            completion_date: faker.generateRandomDate(),
            certificate_obtained: Math.random() > 0.5
          });
        }
      }

      // Generate passwork (training program enrollment)
      const passworkData = passworks.length > 0 ? {
        current_passwork: passworks[i % passworks.length]._id,
        enrollment_date: faker.generateRandomDate(),
        status: ['enrolled', 'completed', 'dropped'][Math.floor(Math.random() * 3)],
        modules_completed: Math.floor(Math.random() * 5)
      } : {};

      // Generate insertion (job insertion tracking)
      const insertion = {
        job_applications: Math.floor(Math.random() * 10),
        interviews: Math.floor(Math.random() * 5),
        job_interviews: [],
        current_job: Math.random() > 0.6 ? {
          company_name: faker.generateFullName().split(' ')[0] + ' Corp',
          position: ['Junior Developer', 'Business Analyst', 'Sales Executive', 'HR Specialist'][Math.floor(Math.random() * 4)],
          start_date: faker.generateRandomDate(new Date(2023, 0, 1), new Date()),
          contract_type: faker.getRandomContractType(),
          salary: Math.floor(Math.random() * 1500) + 500,
          status: 'active'
        } : null,
        job_tracking: []
      };

      const young = new Young({
        personal_info: personalInfo,
        skills_assessment: skillsAssessment,
        capacity_building: capacityBuilding,
        passwork: passworkData,
        insertion: insertion,
        status: Math.random() > 0.3,
        createdBy: 'System',
        updatedBy: 'System'
      });

      const savedYoung = await young.save();
      youngProfiles.push(savedYoung);
      console.log(`✓ Youth profile created: ${fullname}`);
    }

    console.log(`✅ Youth profiles seeded successfully. Total: ${youngProfiles.length}`);
    return youngProfiles;
  } catch (error) {
    console.error('❌ Error seeding youth profiles:', error.message);
    throw error;
  }
}

module.exports = {
  seedYoung
};
