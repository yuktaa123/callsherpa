import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateTwimlForVapi } from '@/lib/twilio';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const to = formData.get('To') as string;
  const from = formData.get('From') as string;
  const callSid = formData.get('CallSid') as string;

  // Find business by Twilio phone number
  const { data: business, error } = await supabaseAdmin
    .from('businesses')
    .select('vapi_agent_id, id')
    .eq('twilio_phone_number', to)
    .single();

  if (error || !business) {
    console.error('Business not found for number:', to);
    // Return a default error TwiML or just hang up
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response><Say>Sorry, we couldn\'t connect your call.</Say></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  }

  // Log initial call
  await supabaseAdmin.from('call_logs').insert({
    business_id: business.id,
    caller_number: from,
    id: callSid, // Use Twilio CallSid as ID if appropriate, or let it generate
  });

  const twiml = generateTwimlForVapi(business.vapi_agent_id);

  return new NextResponse(twiml, {
    headers: { 'Content-Type': 'text/xml' },
  });
}
