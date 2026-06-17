import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createBooking } from '@/lib/calendly';
import { sendSMS } from '@/lib/twilio';

export async function POST(req: NextRequest) {
  const { businessId, name, phone, email, startTime, service } = await req.json();

  const { data: business } = await supabaseAdmin
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .single();

  if (!business) {
    return NextResponse.json({ error: 'Business not found' }, { status: 404 });
  }

  try {
    // 1. Create Calendly booking
    await createBooking(business.calendly_event_type_id, {
      name,
      email,
      startTime,
    });

    // 2. Log booking
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .insert({
        business_id: business.id,
        caller_name: name,
        caller_number: phone,
        appointment_time: startTime,
        service: service || 'General Appointment',
      })
      .select()
      .single();

    // 3. Send SMS
    await sendSMS(phone, `Hi ${name}, your appointment at ${business.name} is confirmed for ${startTime}.`);

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
