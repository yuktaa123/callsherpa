export type Business = {
  id: string;
  name: string;
  slug: string;
  email: string;
  hours: WeeklySchedule;
  services: Service[];
  faqs: FAQ[];
  calendly_link: string;
  vapi_agent_id?: string;
  twilio_phone_number?: string;
  twilio_phone_sid?: string;
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  status: 'onboarding' | 'active' | 'paused' | 'cancelled';
  created_at: string;
};

export type WeeklySchedule = {
  [key in DayOfWeek]: DaySchedule;
};

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type DaySchedule = {
  open: string;
  close: string;
  enabled: boolean;
};

export type Service = {
  name: string;
  duration: number; // in minutes
  price: number;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type CallLog = {
  id: string;
  business_id: string;
  caller_number: string;
  caller_name?: string;
  transcript_url?: string;
  duration_seconds: number;
  booked: boolean;
  summary?: string;
  created_at: string;
};

export type Booking = {
  id: string;
  business_id: string;
  call_id?: string;
  caller_name: string;
  caller_number: string;
  appointment_time: string;
  service_name: string;
  status: 'confirmed' | 'cancelled';
  created_at: string;
};
