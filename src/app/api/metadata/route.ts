import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Faculty from '@/models/Faculty';
import Department from '@/models/Department';

export async function GET() {
  try {
    await dbConnect();
    
    // Fetch all faculties and departments
    const faculties = await Faculty.find({}).sort({ name: 1 });
    const departments = await Department.find({}).sort({ name: 1 });

    return NextResponse.json({ faculties, departments });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
