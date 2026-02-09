import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/jwt';
import bcrypt from 'bcryptjs';

/**
 * GET Profile - Fetch current user data
 */
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('dc_token')?.value;
    const decoded = token ? verifyToken(token) : null;

    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * PATCH Profile - Update editable fields (Phone, Password)
 */
export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get('dc_token')?.value;
    const decoded = token ? verifyToken(token) : null;

    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { phoneNumber, password, profileImage } = await req.json();
    await dbConnect();

    // Fetch existing user to get username for cloudinary public_id
    const existingUser = await User.findById(decoded.userId);
    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updateData: any = {};
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (password) {
      const salt = await bcrypt.genSalt(12);
      updateData.password = await bcrypt.hash(password, salt);
    }

    // Handle profile image upload to Cloudinary
    if (profileImage && profileImage.startsWith('data:image')) {
      const cloudinary = (await import('@/lib/cloudinary')).default;
      const uploadResponse = await cloudinary.uploader.upload(profileImage, {
        folder: 'dream-centre/profiles',
        public_id: `profile_${existingUser.username}`,
        overwrite: true,
      });
      updateData.profileImage = uploadResponse.secure_url;
    }

    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: updateData },
      { new: true }
    ).select('-password');

    return NextResponse.json({ 
      message: 'Profile updated successfully',
      user 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
