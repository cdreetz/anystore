import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

export async function POST(req: Request) {
  const userPayload = requireAuth(req as any);
  if (!userPayload) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const { filename, contentType } = await req.json();
  if (!filename || !contentType) {
    return NextResponse.json(
      { error: 'Filename and content type are required' },
      { status: 400 }
    );
  }

  try {
    // Create a unique file path (you might want to add user ID or other organization)
    const key = `uploads/${Date.now()}-${filename}`;

    // Create the presigned URL
    const command = new PutObjectCommand({
      Bucket: 'anystore-bucket',
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    const imageUrl = `https://anystore-bucket.s3.amazonaws.com/${key}`;

    return NextResponse.json({ uploadUrl, imageUrl });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}