import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getSupabaseServer } from '@/lib/supabase';
import Stripe from 'stripe';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    if (!endpointSecret) {
      console.warn('STRIPE_WEBHOOK_SECRET is not set');
      event = stripe.webhooks.constructEvent(body, sig, 'placeholder'); // This will fail if sig is checked
      // For development/placeholder purposes, we might just parse the body
      event = JSON.parse(body);
    } else {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    }
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const supabase = getSupabaseServer();

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const businessId = session.metadata?.businessId;
      const customerEmail = session.customer_details?.email;

      if (businessId) {
        await supabase
          .from('businesses')
          .update({ 
            status: 'active',
            email: customerEmail 
          })
          .eq('id', businessId);
      }
      break;
    }
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      // Handle status changes (past_due, unpaid, etc.)
      const businessId = subscription.metadata?.businessId;
      if (businessId) {
        await supabase
          .from('businesses')
          .update({ 
            status: subscription.status === 'active' ? 'active' : 'past_due' 
          })
          .eq('id', businessId);
      }
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const businessId = subscription.metadata?.businessId;
      if (businessId) {
        await supabase
          .from('businesses')
          .update({ status: 'cancelled' })
          .eq('id', businessId);
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
