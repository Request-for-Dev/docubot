/* eslint-disable import/prefer-default-export */
import { getAuth } from '@clerk/nextjs/server';
import { adminDb } from '#/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const auth = getAuth(req);
  const userId = auth.userId;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userDoc = await adminDb.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (!userData || !userData.firebaseToken) {
      return NextResponse.json({ error: 'Firebase token not found' }, { status: 404 });
    }

    return NextResponse.json({ firebaseToken: userData.firebaseToken }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Firebase token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
