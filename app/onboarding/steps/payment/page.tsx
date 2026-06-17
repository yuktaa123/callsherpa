'use client';

import { useOnboarding } from '@/components/onboarding/onboarding-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, CreditCard, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PaymentStep() {
  const { data, prevStep } = useOnboarding();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    try {
      const { completeOnboarding } = await import('../../actions');
      const result = await completeOnboarding(data);
      
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Onboarding error:', error);
      alert('Failed to complete onboarding. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Start your 14-day free trial</h2>
        <p className="text-gray-500">You won&apos;t be charged until your trial ends.</p>
      </div>

      <Card className="border-primary bg-primary/5">
        <CardHeader>
          <CardTitle>Professional Plan</CardTitle>
          <CardDescription>24/7 AI Receptionist + Dedicated Number</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">$149</span>
            <span className="text-gray-500">/mo after 14 days</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
              <span>Unlimited call handling</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
              <span>Calendly integration</span>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
              <span>SMS confirmations</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Button 
          className="w-full h-12 text-lg" 
          onClick={handleComplete}
          disabled={loading}
        >
          {loading ? 'Setting up your agent...' : 'Start Trial & Go to Dashboard'}
        </Button>
        <p className="text-xs text-center text-gray-400 flex items-center justify-center">
          <Lock className="h-3 w-3 mr-1" /> Secure payment powered by Stripe
        </p>
      </div>

      <div className="pt-4">
        <Button variant="ghost" onClick={() => { prevStep(); router.push('/onboarding/steps/calendar'); }} className="w-full">
          Back to Calendar
        </Button>
      </div>
    </div>
  );
}
