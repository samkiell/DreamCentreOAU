const mongoose = require("mongoose");

// We use require because this script will be run with ts-node or similar
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
  { name: "Technology" },
  { name: "Science" },
  { name: "Arts" },
  { name: "Social Sciences" },
];

const departmentsData = [
  {
    name: "Computer Science and Engineering",
    code: "CSE",
    facultyName: "Technology",
  },
  { name: "Software Engineering", code: "SWE", facultyName: "Technology" },
  { name: "Mechanical Engineering", code: "MEE", facultyName: "Technology" },
  {
    name: "Electronic and Electrical Engineering",
    code: "EEE",
    facultyName: "Technology",
  },
  { name: "Microbiology", code: "MCB", facultyName: "Science" },
  {
    name: "Computer Science with Mathematics",
    code: "CSM",
    facultyName: "Science",
  },
  { name: "History", code: "HIS", facultyName: "Arts" },
  { name: "Economics", code: "ECN", facultyName: "Social Sciences" },
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
