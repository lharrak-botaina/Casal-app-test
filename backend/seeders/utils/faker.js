// Utility functions for generating realistic fake data
const firstNames = [
  'Ahmed', 'Fatima', 'Mohamed', 'Layla', 'Ali', 'Amira', 'Hassan', 'Noor',
  'Karim', 'Leila', 'Youssef', 'Sara', 'Omar', 'Dina', 'Ibrahim', 'Hana'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas'
];

const cities = [
  'Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Gafsa', 'Djerba', 'Tataouine',
  'Kasserine', 'Sidi Bouzid', 'Mahdia', 'Gabès', 'Medenine'
];

const industries = [
  'Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing',
  'Education', 'Hospitality', 'Real Estate', 'Transportation', 'Agriculture'
];

const trainingPrograms = [
  'Digital Marketing Basics', 'Web Development', 'Data Science Fundamentals',
  'Business Management', 'Customer Service Excellence', 'Graphic Design',
  'Software Testing', 'Project Management', 'Sales & Negotiation', 'IT Support'
];

const skills = [
  'Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Creativity',
  'Time Management', 'Technical Writing', 'Data Analysis', 'Project Planning',
  'Customer Service', 'Critical Thinking', 'Adaptability'
];

const hobbies = [
  'Reading', 'Sports', 'Music', 'Art', 'Cooking', 'Gaming', 'Photography',
  'Traveling', 'Volunteering', 'Writing', 'Dancing', 'Coding'
];

const genders = ['Male', 'Female'];
const civilStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
const contractTypes = ['CDI', 'CDD', 'Stage', 'Freelance', 'Apprenticeship'];
const housingTypes = ['Own', 'Rent', 'With Family', 'Social Housing'];
const jobStatuses = ['active', 'inactive', 'closed'];

function generateFullName() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function generateEmail(name = null) {
  if (!name) {
    name = generateFullName().toLowerCase().replace(/\s+/g, '.');
  }
  const domains = ['example.com', 'test.com', 'email.com', 'domain.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${name}${Math.random().toString(36).substring(7)}@${domain}`;
}

function generatePhone() {
  return `+216${Math.floor(Math.random() * 90000000) + 10000000}`;
}

function generateCity() {
  return cities[Math.floor(Math.random() * cities.length)];
}

function generateIndustry() {
  return industries[Math.floor(Math.random() * industries.length)];
}

function generateRandomDate(start = new Date(2020, 0, 1), end = new Date()) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateBirthDate() {
  // Generate birth date for someone aged 18-35
  const today = new Date();
  const start = new Date(today.getFullYear() - 35, today.getMonth(), today.getDate());
  const end = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  return generateRandomDate(start, end);
}

function generateRandomSkills(count = 3) {
  const selected = [];
  const shuffled = [...skills].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateRandomHobbies(count = 2) {
  const selected = [];
  const shuffled = [...hobbies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateIdentifier() {
  return `YNG${Date.now()}${Math.floor(Math.random() * 10000)}`.substring(0, 15);
}

function generateJobReference() {
  return `JOB${Date.now()}${Math.floor(Math.random() * 1000)}`.substring(0, 12);
}

function generateAddress() {
  const streetNumbers = [Math.floor(Math.random() * 500) + 1];
  const streets = [
    'Main Street', 'Market Street', 'Central Avenue', 'Park Road', 'High Street',
    'Oak Lane', 'Elm Street', 'Maple Drive', 'Cedar Road', 'Birch Avenue'
  ];
  const street = streets[Math.floor(Math.random() * streets.length)];
  return `${streetNumbers[0]} ${street}`;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomGender() {
  return getRandomElement(genders);
}

function getRandomCivilStatus() {
  return getRandomElement(civilStatuses);
}

function getRandomContractType() {
  return getRandomElement(contractTypes);
}

function getRandomHousingType() {
  return getRandomElement(housingTypes);
}

function getRandomJobStatus() {
  return getRandomElement(jobStatuses);
}

function getRandomTrainingProgram() {
  return getRandomElement(trainingPrograms);
}

function generateRaisonSocial(companyName) {
  return companyName.toLowerCase().replace(/\s+/g, '-');
}

module.exports = {
  generateFullName,
  generateEmail,
  generatePhone,
  generateCity,
  generateIndustry,
  generateRandomDate,
  generateBirthDate,
  generateRandomSkills,
  generateRandomHobbies,
  generateIdentifier,
  generateJobReference,
  generateAddress,
  getRandomElement,
  getRandomGender,
  getRandomCivilStatus,
  getRandomContractType,
  getRandomHousingType,
  getRandomJobStatus,
  getRandomTrainingProgram,
  generateRaisonSocial,
  firstNames,
  lastNames,
  cities,
  industries,
  trainingPrograms,
  skills,
  hobbies,
  genders,
  civilStatuses,
  contractTypes,
  housingTypes
};
