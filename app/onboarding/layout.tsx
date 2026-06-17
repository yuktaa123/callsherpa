'use client';

import { OnboardingProvider, useOnboarding } from '@/components/onboarding/onboarding-context';
import { Phone } from 'lucide-react';
import Link from 'next/link';

function OnboardingHeader() {
  const { currentStep } = useOnboarding();
  const steps = [
    'Business Info',
    'Hours & Services',
    'FAQs',
    'Calendar',
    'Payment'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-8">
      <div className="flex items-center justify-between mb-8">
        <Link className="flex items-center justify-center" href="/">
          <Phone className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl">CallSherpa</span>
        </Link>
        <div className="text-sm font-medium text-gray-500">
          Step {currentStep} of {steps.length}
        </div>
      </div>
      <div className="relative h-2 w-full bg-gray-200 rounded-full mb-12">
        <div 
          className="absolute h-2 bg-primary rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
        <div className="absolute top-6 w-full flex justify-between">
          {steps.map((step, index) => (
            <div 
              key={step} 
              className={`text-xs font-medium hidden sm:block ${index + 1 <= currentStep ? 'text-primary' : 'text-gray-400'}`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <OnboardingHeader />
        <main className="flex-1 flex items-start justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border p-6 md:p-10 mb-20">
            {children}
          </div>
        </main>
      </div>
    </OnboardingProvider>
  );
}
