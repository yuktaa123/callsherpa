'use server';

import { createClient } from '@/lib/supabase-server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function completeOnboarding(onboardingData: Record<string, any>) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // 1. Create/Update Business in Supabase
  // We use upsert in case the user retries
  const { data: business, error } = await supabase
    .from('businesses')
    .upsert({
      owner_id: user.id,
      name: onboardingData.name,
      email: onboardingData.email || user.email,
      calendly_link: onboardingData.calendly_link,
      hours: onboardingData.hours,
      services: onboardingData.services,
      faqs: onboardingData.faqs,
      status: 'onboarding'
    }, {
      onConflict: 'owner_id'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating business:', error);
    throw new Error('Failed to save business data: ' + error.message);
  }

  // 2. Create Stripe Checkout Session
  const origin = headers().get('origin') || 'http://localhost:3000';
  
  try {
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
      success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/onboarding/steps/payment`,
      customer_email: user.email,
      metadata: {
        businessId: business.id,
      },
    });

    return { checkoutUrl: session.url };
  } catch (stripeError: unknown) {
    console.error('Stripe error:', stripeError);
    const errorMessage = stripeError instanceof Error ? stripeError.message : 'Unknown error';
    throw new Error('Failed to create checkout session: ' + errorMessage);
  }
}
