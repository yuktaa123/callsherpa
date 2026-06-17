import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendSMS } from '@/lib/twilio';
import { createBooking } from '@/lib/calendly';

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const { message } = payload;

  if (message.type === 'end-of-call-report') {
    const { call, analysis, artifact } = message;
    
    // Update call log
    await supabaseAdmin
      .from('call_logs')
      .update({
        duration_seconds: call.duration,
        transcript_url: artifact.transcriptUrl,
        summary: analysis.summary,
        booked: analysis.structuredData?.booked || false,
      })
      .eq('id', call.id);

    return NextResponse.json({ success: true });
  }

  if (message.type === 'tool-calls') {
    const toolCall = message.toolCalls[0];
    if (toolCall.function.name === 'bookAppointment') {
      const args = JSON.parse(toolCall.function.arguments);
      const { businessId, name, phone, email, startTime } = args;

      const { data: business } = await supabaseAdmin
        .from('businesses')
        .select('*')
        .eq('id', businessId)
        .single();

      if (business) {
        try {
          // 1. Create Calendly booking
          const booking = await createBooking(business.calendly_event_type_id, {
            name,
            email,
            startTime,
          });

          // 2. Log booking in Supabase
          await supabaseAdmin.from('bookings').insert({
            business_id: business.id,
            caller_name: name,
            caller_number: phone,
            appointment_time: startTime,
            service: 'General Appointment',
          });

          // 3. Send SMS confirmation
          await sendSMS(phone, `Hi ${name}, your appointment at ${business.name} is confirmed for ${startTime}. See you then!`);

          return NextResponse.json({
            results: [{
              toolCallId: toolCall.id,
              result: 'Appointment booked successfully and confirmation SMS sent.',
            }]
          });
        } catch (error) {
          console.error('Booking error:', error);
          return NextResponse.json({
            results: [{
              toolCallId: toolCall.id,
              result: 'Failed to book appointment. Please try again later.',
            }]
          });
        }
      }
    }
  }

  return NextResponse.json({ success: true });
}
