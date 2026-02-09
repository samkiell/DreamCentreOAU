const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://samkiel:dcodb@dco.18gjltx.mongodb.net/?appName=DCO";

const FacultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true },
);

const DepartmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
  },
  { timestamps: true },
);

const Faculty =
  mongoose.models.Faculty || mongoose.model("Faculty", FacultySchema);
const Department =
  mongoose.models.Department || mongoose.model("Department", DepartmentSchema);

const facultiesData = [
  { name: "Administration" },
  { name: "Agriculture" },
  { name: "Arts" },
  { name: "Education" },
  { name: "Environmental Design & Management" },
  { name: "Law" },
  { name: "Pharmacy" },
  { name: "Science" },
  { name: "Social Sciences" },
  { name: "Technology" },
  { name: "Basic Medical Sciences" },
  { name: "Clinical Sciences" },
  { name: "Dentistry" },
];

const departmentsData = [
  // Administration
  { name: "Accounting", code: "ACC", facultyName: "Administration" },
  {
    name: "Business Administration",
    code: "BUS",
    facultyName: "Administration",
  },
  {
    name: "International Relations",
    code: "IRS",
    facultyName: "Administration",
  },
  {
    name: "Local Government & Development Studies",
    code: "LGS",
    facultyName: "Administration",
  },
  { name: "Public Administration", code: "PUB", facultyName: "Administration" },

  // Agriculture
  { name: "Agricultural Economics", code: "AEC", facultyName: "Agriculture" },
  {
    name: "Agricultural Extension & Rural Development",
    code: "AEX",
    facultyName: "Agriculture",
  },
  { name: "Animal Sciences", code: "ANS", facultyName: "Agriculture" },
  {
    name: "Crop Production & Protection",
    code: "CPP",
    facultyName: "Agriculture",
  },
  {
    name: "Soil Science & Land Resources Management",
    code: "SSL",
    facultyName: "Agriculture",
  },
  {
    name: "Family, Nutrition & Consumer Sciences",
    code: "FNC",
    facultyName: "Agriculture",
  },

  // Arts
  { name: "Dramatic Arts", code: "DRA", facultyName: "Arts" },
  { name: "English", code: "EGL", facultyName: "Arts" },
  { name: "History", code: "HIS", facultyName: "Arts" },
  { name: "Linguistics & African Languages", code: "LIN", facultyName: "Arts" },
  { name: "Music", code: "MUS", facultyName: "Arts" },
  { name: "Philosophy", code: "PHL", facultyName: "Arts" },
  { name: "Religious Studies", code: "REL", facultyName: "Arts" },
  { name: "Foreign Languages", code: "FRN", facultyName: "Arts" },

  // Education
  {
    name: "Adult Education & Lifelong Learning",
    code: "ADE",
    facultyName: "Education",
  },
  {
    name: "Arts & Social Science Education",
    code: "ASE",
    facultyName: "Education",
  },
  {
    name: "Educational Foundations & Counselling",
    code: "EFC",
    facultyName: "Education",
  },
  { name: "Educational Management", code: "EDM_EDU", facultyName: "Education" }, // Renamed code to avoid duplicate with Faculty code
  {
    name: "Educational Technology & Library Studies",
    code: "ETL",
    facultyName: "Education",
  },
  {
    name: "Health Education / Human Kinetics",
    code: "PHE",
    facultyName: "Education",
  },
  {
    name: "Science & Technology Education",
    code: "STE",
    facultyName: "Education",
  },

  // Environmental Design & Management
  {
    name: "Architecture",
    code: "ARC",
    facultyName: "Environmental Design & Management",
  },
  {
    name: "Building",
    code: "BLD",
    facultyName: "Environmental Design & Management",
  },
  {
    name: "Estate Management",
    code: "ESM",
    facultyName: "Environmental Design & Management",
  },
  {
    name: "Fine & Applied Arts",
    code: "FAA",
    facultyName: "Environmental Design & Management",
  },
  {
    name: "Quantity Surveying",
    code: "QTS",
    facultyName: "Environmental Design & Management",
  },
  {
    name: "Surveying & Geoinformatics",
    code: "SVG",
    facultyName: "Environmental Design & Management",
  },
  {
    name: "Urban & Regional Planning",
    code: "URP",
    facultyName: "Environmental Design & Management",
  },

  // Law
  { name: "Business Law", code: "BUL", facultyName: "Law" },
  { name: "International Law", code: "INL", facultyName: "Law" },
  { name: "Jurisprudence & Private Law", code: "JPL", facultyName: "Law" },
  { name: "Public Law", code: "PUL", facultyName: "Law" },

  // Pharmacy
  {
    name: "Clinical Pharmacy & Pharmacy Admin",
    code: "CPA",
    facultyName: "Pharmacy",
  },
  { name: "Pharmaceutical Chemistry", code: "PHC", facultyName: "Pharmacy" },
  { name: "Pharmaceutics", code: "PHT", facultyName: "Pharmacy" },
  { name: "Pharmacognosy", code: "PCG", facultyName: "Pharmacy" },
  { name: "Pharmacology", code: "PCL", facultyName: "Pharmacy" },

  // Science
  { name: "Biochemistry", code: "BCH", facultyName: "Science" },
  { name: "Botany", code: "BOT", facultyName: "Science" },
  { name: "Chemistry", code: "CHM", facultyName: "Science" },
  { name: "Computer Science", code: "CSC", facultyName: "Science" },
  { name: "Geology", code: "GLY", facultyName: "Science" },
  { name: "Mathematics", code: "MTH", facultyName: "Science" },
  { name: "Microbiology", code: "MCB", facultyName: "Science" },
  {
    name: "Physics & Engineering Physics",
    code: "PHY",
    facultyName: "Science",
  },
  { name: "Zoology", code: "ZOO", facultyName: "Science" },

  // Social Sciences
  {
    name: "Demography & Social Statistics",
    code: "DSS",
    facultyName: "Social Sciences",
  },
  { name: "Economics", code: "ECN", facultyName: "Social Sciences" },
  { name: "Geography", code: "GGY", facultyName: "Social Sciences" },
  { name: "Political Science", code: "POL", facultyName: "Social Sciences" },
  { name: "Psychology", code: "PSY", facultyName: "Social Sciences" },
  {
    name: "Sociology & Anthropology",
    code: "SOC",
    facultyName: "Social Sciences",
  },

  // Technology
  {
    name: "Agric. & Environmental Engineering",
    code: "AEE",
    facultyName: "Technology",
  },
  { name: "Chemical Engineering", code: "CHE", facultyName: "Technology" },
  { name: "Civil Engineering", code: "CVE", facultyName: "Technology" },
  {
    name: "Computer Science & Engineering",
    code: "CPE",
    facultyName: "Technology",
  },
  {
    name: "Electronic & Electrical Engineering",
    code: "EEE",
    facultyName: "Technology",
  },
  { name: "Food Science & Technology", code: "FST", facultyName: "Technology" },
  {
    name: "Materials Science & Engineering",
    code: "MSE",
    facultyName: "Technology",
  },
  { name: "Mechanical Engineering", code: "MEE", facultyName: "Technology" },

  // Basic Medical Sciences
  {
    name: "Anatomy & Cell Biology",
    code: "ANA",
    facultyName: "Basic Medical Sciences",
  },
  {
    name: "Medical Biochemistry",
    code: "MBC",
    facultyName: "Basic Medical Sciences",
  },
  {
    name: "Medical Microbiology & Parasitology",
    code: "MMP",
    facultyName: "Basic Medical Sciences",
  },
  {
    name: "Medical Pharmacology & Therapeutics",
    code: "PHA",
    facultyName: "Basic Medical Sciences",
  },
  {
    name: "Nursing Science",
    code: "NUR",
    facultyName: "Basic Medical Sciences",
  },
  {
    name: "Physiological Sciences",
    code: "PHS",
    facultyName: "Basic Medical Sciences",
  },
  {
    name: "Medical Rehabilitation",
    code: "MRH",
    facultyName: "Basic Medical Sciences",
  },

  // Clinical Sciences
  { name: "Anaesthesia", code: "ANS_CLS", facultyName: "Clinical Sciences" }, // Renamed to avoid duplicate with Animal Sciences
  { name: "Community Health", code: "CMH", facultyName: "Clinical Sciences" },
  {
    name: "Dermatology & Venereology",
    code: "DER",
    facultyName: "Clinical Sciences",
  },
  { name: "Medicine", code: "MED", facultyName: "Clinical Sciences" },
  {
    name: "Mental Health (Psychiatry)",
    code: "MTH_CLS",
    facultyName: "Clinical Sciences",
  }, // Renamed to avoid duplicate with Mathematics
  {
    name: "Obstetrics, Gynaecology & Perinatology",
    code: "OGP",
    facultyName: "Clinical Sciences",
  },
  { name: "Ophthalmology", code: "OPH", facultyName: "Clinical Sciences" },
  {
    name: "Orthopaedics & Traumatology",
    code: "ORT",
    facultyName: "Clinical Sciences",
  },
  {
    name: "Paediatrics & Child Health",
    code: "PED",
    facultyName: "Clinical Sciences",
  },
  { name: "Radiology", code: "RAD", facultyName: "Clinical Sciences" },
  { name: "Surgery", code: "SUR", facultyName: "Clinical Sciences" },

  // Dentistry
  { name: "Child Dental Health", code: "CDH", facultyName: "Dentistry" },
  {
    name: "Oral & Maxillofacial Surgery",
    code: "OMS",
    facultyName: "Dentistry",
  },
  {
    name: "Preventive & Community Dentistry",
    code: "PCD",
    facultyName: "Dentistry",
  },
  { name: "Restorative Dentistry", code: "RSD", facultyName: "Dentistry" },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected.");

    // Clear existing data
    await Faculty.deleteMany({});
    await Department.deleteMany({});
    console.log("Cleared existing data.");

    // Seed Faculties
    const createdFaculties = await Faculty.insertMany(facultiesData);
    console.log(`Seeded ${createdFaculties.length} faculties.`);

    // Map faculty name to ID
    const facultyMap = {};
    createdFaculties.forEach((f) => {
      facultyMap[f.name] = f._id;
    });

    // Prepare Departments
    const departmentsToSeed = departmentsData.map((d) => ({
      name: d.name,
      code: d.code,
      facultyId: facultyMap[d.facultyName],
    }));

    // Seed Departments
    const createdDepartments = await Department.insertMany(departmentsToSeed);
    console.log(`Seeded ${createdDepartments.length} departments.`);

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
