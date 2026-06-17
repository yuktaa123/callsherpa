export interface VapiAgentConfig {
  name: string;
  firstMessage: string;
  transcriber: {
    provider: string;
    model: string;
    language: string;
  };
  model: {
    provider: string;
    model: string;
    messages: {
      role: string;
      content: string;
    }[];
  };
  voice: {
    provider: string;
    voiceId: string;
  };
}

const VAPI_API_URL = process.env.VAPI_BASE_URL || 'https://api.vapi.ai';

function getVapiApiKey() {
  const key = process.env.VAPI_API_KEY;
  if (!key) {
    throw new Error('VAPI_API_KEY is not defined in environment variables');
  }
  return key;
}

export async function createVapiAgent(config: VapiAgentConfig) {
  const apiKey = getVapiApiKey();
  const response = await fetch(`${VAPI_API_URL}/agent`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Vapi error: ${JSON.stringify(error)}`);
  }

  return response.json();
}

export async function updateVapiAgent(agentId: string, config: Partial<VapiAgentConfig>) {
  const apiKey = getVapiApiKey();
  const response = await fetch(`${VAPI_API_URL}/agent/${agentId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Vapi error: ${JSON.stringify(error)}`);
  }

  return response.json();
}

export async function getVapiAgent(agentId: string) {
  const apiKey = getVapiApiKey();
  const response = await fetch(`${VAPI_API_URL}/agent/${agentId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Vapi error: ${JSON.stringify(error)}`);
  }

  return response.json();
}

export function generatePrompt(business: {
  name: string;
  hours: string;
  services: string;
  faqs: { q: string; a: string }[];
}) {
  return `
You are a professional AI receptionist for ${business.name}.
Your goal is to handle frequently asked questions and help customers book appointments.

BUSINESS HOURS:
${business.hours}

SERVICES:
${business.services}

FREQUENTLY ASKED QUESTIONS:
${business.faqs.map(faq => `Q: ${faq.q}\nA: ${faq.a}`).join('\n\n')}

GUIDELINES:
- Be polite, professional, and helpful.
- If a customer wants to book an appointment, ask for their name, phone number, and preferred time.
- Once you have the details, tell them you will confirm the appointment shortly.
- Do not make up information that is not provided in the FAQs or services.
- If you don't know the answer, tell them a human receptionist will call them back.

Booking trigger: If the user explicitly wants to book, summarize the request and end the call or signal for a transfer/webhook.
  `.trim();
}
