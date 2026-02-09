import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/jwt';
import { generateStudentId } from '@/lib/idGenerator';

export async function POST(req: NextRequest) {
  try {
    // 1. Authorization Check (Admin Only)
    const token = req.cookies.get('dc_token')?.value;
    const decoded = token ? verifyToken(token) : null;

    if (!decoded || decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = await req.json();
    await dbConnect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.status === 'ACTIVE') {
      return NextResponse.json({ error: 'User already active' }, { status: 400 });
    }

    // 2. Generate the DreamCenter ID (Atomic)
    const studentId = await generateStudentId(user.departmentCode, user.admissionYear);

    // 3. Update User Status and Identity
    user.studentId = studentId;
    user.status = 'ACTIVE';
    await user.save();

    return NextResponse.json({
      message: 'User approved and ID generated',
      studentId
    });

  } catch (error: any) {
    console.error('[ADMIN_APPROVE_ERROR]:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
