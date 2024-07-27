/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/node';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import { adminDb } from '#/firebaseAdmin';

// Initialize Sentry (ensure this is done at the start of your application)
if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
  throw new Error('NEXT_PUBLIC_SENTRY_DSN must be a defined environment variable');
}
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
Sentry.init({ dsn: dsn });

console.log('Server started');
export async function POST(request: NextRequest) {
  console.log('Webhook API route called'); // Add this line
  const headersList = headers();
  const body = await request.text(); // !IMPORTANT! This must be req.text() and not req.body or req.json()
  console.log('Request body:', body);
  const signature = headersList.get('stripe-signature');
  try {
    if (!signature) {
      throw new Error('No signature found in request headers');
    }

    // Continue with the rest of your webhook handling code
  } catch (error) {
    Sentry.captureException(error); // Send error to Sentry
    console.error(error); // Log the error message to the console
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new NextResponse(error as any, { status: 400 }); // Return a response with status code 400
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.log('No STRIPE_WEBHOOK_SECRET defined');
    return new NextResponse('No STRIPE_WEBHOOK_SECRET defined', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    console.log('Event constructed successfully:', event.type);
  } catch (err) {
    Sentry.captureException(err); // Send err to Sentry
    console.log(`Webhook Error:${err}`); // Log the err message to the console
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new NextResponse(err as any, { status: 400 }); // Return a response with status code 400
  }

  const getUserDetails = async (customerId: string) => {
    const userDoc = await adminDb
      .collection('users')
      .where('stripecustomerId', '==', customerId)
      .limit(1)
      .get();
    if (!userDoc.empty) {
      return userDoc.docs[0];
    }
    const test = await getUserDetails(customerId);
    console.log(test);
  };

  switch (event.type) {
    case 'checkout.session.completed':
    case 'payment_intent.succeeded': {
      const invoice = event.data.object;
      const customerId = invoice.customer as string;
      console.log('🚀 ~ POST ~ Event type:', event.type);
      console.log('🚀 ~ POST ~ customerId:', customerId);

      const userDetails = await getUserDetails(customerId);
      if (!userDetails?.id) {
        console.log('🚀 ~ POST ~ User not found for customerId:', customerId);
        return new NextResponse('User not Found', { status: 400 });
      }

      console.log('🚀 ~ POST ~ Updating subscription status for user:', userDetails.id);
      await adminDb.collection('users').doc(userDetails?.id).update({
        hasActiveMembership: true,
      });

      console.log('🚀 ~ POST ~ Subscription status updated successfully');
      break;
    }

    // case 'customer.subscription.deleted':
    // case 'subscription_schedule.canceled': {
    //   const subscription = event.data.object;
    //   const customerId = subscription.customer as string;
    //   console.log('🚀 ~ POST ~ Event type:', event.type);
    //   console.log('🚀 ~ POST ~ customerId:', customerId);

    //   const userDetails = await getUserDetails(customerId);
    //   if (!userDetails?.id) {
    //     console.log('🚀 ~ POST ~ User not found for customerId:', customerId);
    //     return new NextResponse('User not Found', { status: 400 });
    //   }

    //   console.log('🚀 ~ POST ~ Updating subscription status for user:', userDetails.id);
    //   await adminDb.collection('users').doc(userDetails.id).update({
    //     hasActiveMembership: false,
    //   });

    //   console.log('🚀 ~ POST ~ Subscription status updated successfully');
    //   break;
    // }

    // eslint-disable-next-line no-lone-blocks
    default: {
      console.log(`Unhandled event type ${event.type}`);
    }
  }
  return NextResponse.json({ message: 'Webhook received - Status Code 420: Blaze It' });
}
