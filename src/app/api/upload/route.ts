import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    const { file, folder } = formData;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: folder || 'dream-centre',
      resource_type: 'auto',
    });

    return NextResponse.json({ 
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id 
    });

  } catch (error: any) {
    console.error('[CLOUDINARY_UPLOAD_ERROR]:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
