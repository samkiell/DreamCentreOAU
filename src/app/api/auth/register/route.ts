import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Faculty from '@/models/Faculty';
import Department from '@/models/Department';

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
      admissionYear 
    } = body;

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

    // 4. Password Hashing
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // 5. Create User (Standard status: PENDING)
    const newUser = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: passwordHash, // Note: The specify says 'password hashing', I'll use bcrypt as planned
      matricNumber,
      faculty: faculty.name,
      departmentCode: department.code,
      admissionYear,
      status: 'PENDING',
      role: 'USER'
    });

    return NextResponse.json(
      { 
        message: 'Registration successful. Please verify your email.',
        userId: newUser._id 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('[REGISTRATION_ERROR]:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
