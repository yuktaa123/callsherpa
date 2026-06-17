import { NextRequest, NextResponse } from 'next/server';
import { sendSMS } from '@/lib/twilio';

export async function POST(req: NextRequest) {
  const { to, message } = await req.json();

  if (!to || !message) {
    return NextResponse.json({ error: 'Missing to or message' }, { status: 400 });
  }

  try {
    const response = await sendSMS(to, message);
    return NextResponse.json({ success: true, sid: response.sid });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
