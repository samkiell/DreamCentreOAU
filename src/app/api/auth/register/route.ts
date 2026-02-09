import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Faculty from '@/models/Faculty';
import Department from '@/models/Department';
import { generateStudentId } from '@/lib/idGenerator';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      firstName, 
      lastName, 
      email, 
      username, 
      password, 
      matricNumber, 
      facultyId, 
      deptId,
      sex,
      profileImage // Expecting base64 string or URL
    } = body;

    // 0. Extract Admission Year from Matric Number
    const yearMatch = matricNumber.match(/(?:^|\/)(20\d{2})(?:\/|$)/);
    const admissionYear = body.admissionYear || (yearMatch ? parseInt(yearMatch[1]) : null);

    if (!admissionYear || !sex) {
      return NextResponse.json(
        { error: 'Missing required fields: Sex or Admission Year (from matric number)' },
        { status: 400 }
      );
    }

    // 1. Mandatory Institutional Email Validation
    const emailRegex = /@(student\.)?oauife\.edu\.ng$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Institutional email required (@student.oauife.edu.ng or @oauife.edu.ng)' },
        { status: 400 }
      );
    }

    await dbConnect();

    // 2. Uniqueness Checks
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
        { matricNumber: matricNumber }
      ]
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email, Username, or Matric Number already registered' },
        { status: 400 }
      );
    }

    // 3. Faculty/Department Cross-check
    const department = await Department.findOne({ _id: deptId, facultyId });
    if (!department) {
      return NextResponse.json(
        { error: 'Invalid Faculty/Department configuration' },
        { status: 400 }
      );
    }

    const faculty = await Faculty.findById(facultyId);

    // 4. Generate Institutional ID immediately
    const studentId = await generateStudentId(department.code, admissionYear);

    // 5. Handle Profile Image Upload to Cloudinary
    let profileImageUrl = '';
    if (profileImage && profileImage.startsWith('data:image')) {
      const uploadResponse = await cloudinary.uploader.upload(profileImage, {
        folder: 'dream-centre/profiles',
        public_id: `profile_${username}`,
        overwrite: true,
      });
      profileImageUrl = uploadResponse.secure_url;
    }

    // 6. Password Hashing
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // 7. Create User as ACTIVE
    const newUser = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: passwordHash,
      matricNumber,
      sex,
      studentId,
      profileImage: profileImageUrl,
      faculty: faculty.name,
      departmentCode: department.code,
      admissionYear,
      status: 'ACTIVE',
      role: 'USER'
    });

    return NextResponse.json(
      { 
        message: 'Registration successful. Your Institutional ID is ready.',
        studentId: studentId,
        userId: newUser._id 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('[REGISTRATION_ERROR]:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
