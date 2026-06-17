import { createClient } from '@/lib/supabase-server';
import DashboardClient from './DashboardClient';
import { redirect } from 'next/navigation';
import { startOfDay, endOfDay, subDays, format, parseISO } from 'date-fns';

export default async function DashboardPage() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/onboarding');
  }

  // Fetch business for this user
  const { data: business, error: businessError } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', user.id)
    .single();

  if (businessError || !business) {
    // If no business, maybe they haven't finished onboarding
    redirect('/onboarding');
  }

  // Fetch call logs for last 7 days
  const sevenDaysAgo = subDays(new Date(), 7).toISOString();
  const { data: callLogs } = await supabase
    .from('call_logs')
    .select('*')
    .eq('business_id', business.id)
    .gte('created_at', sevenDaysAgo);

  // Fetch bookings
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .eq('business_id', business.id)
    .order('appointment_time', { ascending: false })
    .limit(5);

  // Calculate Stats
  const totalCalls = callLogs?.length || 0;
  const totalBookings = callLogs?.filter(c => c.booked).length || 0;
  
  // Avg duration
  const totalSeconds = callLogs?.reduce((acc, c) => acc + (c.duration_seconds || 0), 0) || 0;
  const avgSeconds = totalCalls > 0 ? Math.round(totalSeconds / totalCalls) : 0;
  const avgMinutes = Math.floor(avgSeconds / 60);
  const remainingSeconds = avgSeconds % 60;
  const avgDuration = `${avgMinutes}m ${remainingSeconds}s`;

  // Conversion rate
  const conversionRate = totalCalls > 0 ? ((totalBookings / totalCalls) * 100).toFixed(1) : '0.0';

  // Trends (Mock for now since we don't have enough historical data)
  const trends = {
    calls: 12,
    bookings: 18,
    conversion: 2.4
  };

  // Prepare callData for chart
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = subDays(new Date(), 6 - i);
    return {
      name: days[d.getDay()],
      fullDate: format(d, 'yyyy-MM-dd'),
      total: 0
    };
  });

  callLogs?.forEach(log => {
    const logDate = format(parseISO(log.created_at), 'yyyy-MM-dd');
    const dayData = last7Days.find(d => d.fullDate === logDate);
    if (dayData) {
      dayData.total += 1;
    }
  });

  return (
    <DashboardClient 
      stats={{
        totalCalls,
        totalBookings,
        avgDuration,
        conversionRate,
        trends
      }}
      callData={last7Days}
      recentBookings={bookings || []}
    />
  );
}
