'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Business, WeeklySchedule, DayOfWeek, Service, FAQ } from '@/lib/types';

type OnboardingData = Partial<Business>;

type OnboardingContextType = {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const initialHours: WeeklySchedule = {
  monday: { open: '09:00', close: '17:00', enabled: true },
  tuesday: { open: '09:00', close: '17:00', enabled: true },
  wednesday: { open: '09:00', close: '17:00', enabled: true },
  thursday: { open: '09:00', close: '17:00', enabled: true },
  friday: { open: '09:00', close: '17:00', enabled: true },
  saturday: { open: '09:00', close: '17:00', enabled: false },
  sunday: { open: '09:00', close: '17:00', enabled: false },
};

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<OnboardingData>({
    hours: initialHours,
    services: [],
    faqs: [],
  });
  const [currentStep, setCurrentStep] = useState(1);

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const setStep = (step: number) => setCurrentStep(step);

  return (
    <OnboardingContext.Provider value={{ data, updateData, currentStep, nextStep, prevStep, setStep }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
