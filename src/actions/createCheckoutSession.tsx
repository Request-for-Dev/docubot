/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
'use server';
import { adminDB } from '#/firebaseAdmin';
import { UserDetails } from '@/app/dashboard/upgrade/page';
import stripe from '@/lib/stripe';
import { auth } from '@clerk/nextjs/server';
import { getBaseURL } from '@/lib/util/getBaseURL';
export async function createCheckoutSession(userDetails: UserDetails) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('No user found');
  }

  // Check if the user already has a stripeCustomerID in our database
  let stripeCustomerID;

  const user = await adminDB.collection('users').doc(userId).get();

  stripeCustomerID = user.data()?.stripeCustomerID;

  if (!stripeCustomerID) {
    // Create a new customer in stripe

    const customer = await stripe.customers.create({
      email: userDetails.email,
      name: userDetails.name,
      metadata: {
        userId,
      },
    });

    await adminDB.collection('users').doc(userId).set({
      stripeCustomerID: customer.id,
    });
    stripeCustomerID = customer.id;
  }

  const session = await stripe.checkout.sessions.create({
    // payment_method_types: ['card'],
    line_items: [
      {
        price: 'price_1PgsG0L5fHlelvMaN2hhzUN8',
        quantity: 1,
      },
    ],
    mode: 'subscription',
    customer: stripeCustomerID,
    success_url: `${getBaseURL()}/dashboard?upgrade=true`,
    // success_url: `${getBaseURL()}/dashboard/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getBaseURL()}/dashboard/upgrade?upgrade=false`,
  });

  return session.id;
}
