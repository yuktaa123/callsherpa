import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'placeholder_sk';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16' as any,
});

export async function createCheckoutSession(businessId: string, customerEmail: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'CallSherpa Professional Plan',
            description: 'AI Receptionist 24/7, FAQ handling, Calendly integration, and SMS confirmations.',
          },
          unit_amount: 14900, // $149.00
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/steps/payment`,
    customer_email: customerEmail,
    metadata: {
      businessId: businessId,
    },
  });

  return session;
}
