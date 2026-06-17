import twilio from 'twilio';

function getTwilioConfig() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
  
  if (!accountSid || !authToken) {
    throw new Error('TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN is not defined');
  }
  
  return { accountSid, authToken, phoneNumber };
}

export async function provisionPhoneNumber(areaCode?: string) {
  const { accountSid, authToken } = getTwilioConfig();
  const client = twilio(accountSid, authToken);

  const availableNumbers = await client.availablePhoneNumbers('US').local.list({
    areaCode: areaCode ? parseInt(areaCode) : undefined,
    limit: 1,
  });

  if (availableNumbers.length === 0) {
    throw new Error('No available phone numbers found');
  }

  const number = availableNumbers[0];
  const incomingPhoneNumber = await client.incomingPhoneNumbers.create({
    phoneNumber: number.phoneNumber,
    voiceUrl: `${process.env.PUBLIC_URL}/api/webhooks/twilio`,
  });

  return incomingPhoneNumber;
}

export async function sendSMS(to: string, message: string) {
  const { accountSid, authToken, phoneNumber } = getTwilioConfig();
  
  if (!phoneNumber) {
    throw new Error('TWILIO_PHONE_NUMBER is not defined');
  }

  const client = twilio(accountSid, authToken);
  const response = await client.messages.create({
    body: message,
    from: phoneNumber,
    to,
  });

  return response;
}

export function generateTwimlForVapi(vapiAgentId: string) {
  const response = new twilio.twiml.VoiceResponse();
  const connect = response.connect();
  
  // Vapi usually connects via WebSocket for Canvas
  connect.stream({
    url: `wss://api.vapi.ai/canvas`,
    name: 'vapi',
  });

  return response.toString();
}
