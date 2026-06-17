const CALENDLY_BASE_URL = process.env.CALENDLY_BASE_URL || 'https://api.calendly.com';

function getCalendlyToken() {
  const token = process.env.CALENDLY_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    throw new Error('CALENDLY_PERSONAL_ACCESS_TOKEN is not defined');
  }
  return token;
}

export async function checkAvailability(userUri: string, startTime: string, endTime: string) {
  const token = getCalendlyToken();
  const response = await fetch(`${CALENDLY_BASE_URL}/user_availability_schedules?user=${userUri}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Calendly error: ${JSON.stringify(error)}`);
  }

  return response.json();
}

export async function createBooking(eventTypeId: string, details: {
  name: string;
  email: string;
  startTime: string;
  guestEmail?: string;
}) {
  const token = getCalendlyToken();
  const response = await fetch(`${CALENDLY_BASE_URL}/scheduled_events`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_type: eventTypeId,
      start_time: details.startTime,
      invitee: {
        name: details.name,
        email: details.email,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Calendly error: ${JSON.stringify(error)}`);
  }

  return response.json();
}

export async function getEventTypes(userUri: string) {
  const token = getCalendlyToken();
  const response = await fetch(`${CALENDLY_BASE_URL}/event_types?user=${userUri}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Calendly error: ${JSON.stringify(error)}`);
  }

  return response.json();
}
