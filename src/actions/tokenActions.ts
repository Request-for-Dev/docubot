/* eslint-disable import/prefer-default-export */
// app/actions/tokenActions.ts

'use server';

import jwt from 'jsonwebtoken';
import { getAuth } from 'firebase-admin/auth';
import { adminDb } from '#/firebaseAdmin'; // Adjust this import based on your project structure

export async function isTokenExpiredAction(userId: string): Promise<boolean> {
  try {
    const userDoc = await adminDb.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (!userData || !userData.firebaseToken) {
      return true; // If there's no token, consider it expired
    }

    const token = userData.firebaseToken;
    const decodedToken = jwt.decode(token) as { exp?: number };

    if (!decodedToken || typeof decodedToken.exp === 'undefined') {
      return true; // If we can't decode the token or find the exp claim, consider it expired
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const bufferTime = currentTime + 300; // 5 minutes buffer

    const expirationTime = decodedToken.exp;

    // Check if the token is expired or will expire in the next 5 minutes
    if (decodedToken.exp <= currentTime + bufferTime) {
      // Token is expired or about to expire, generate a new one
      const firebaseAuth = getAuth();
      const tokenSettings = {
        expiresIn: 60 * 60 * 24 * 30, // 30 days in seconds
      };
      const newFirebaseToken = await firebaseAuth.createCustomToken(userId, tokenSettings);
      console.log('🏆 ~ Expired Token Detected ~ Issuing New Token:', newFirebaseToken);

      // Update the token in the database
      await adminDb.collection('users').doc(userId).update({ firebaseToken: newFirebaseToken });

      return true; // Indicate that the token was expired and has been refreshed
    }

    return false; // Token is still valid
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // If there's an error, consider the token expired
  }
}
