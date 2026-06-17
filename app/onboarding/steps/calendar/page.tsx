'use client';

import { useOnboarding } from '@/components/onboarding/onboarding-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type FormData = {
  calendly_link: string;
};

export default function CalendarStep() {
  const { data, updateData, nextStep, prevStep } = useOnboarding();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      calendly_link: data.calendly_link || '',
    }
  });

  const onSubmit = (formData: FormData) => {
    updateData(formData);
    nextStep();
    router.push('/onboarding/steps/payment');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <CalendarIcon className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Connect your calendar</h2>
        <p className="text-gray-500">CallSherpa uses Calendly to check your availability and book appointments.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="calendly_link">Calendly Link</Label>
          <Input 
            id="calendly_link" 
            placeholder="calendly.com/your-business" 
            {...register('calendly_link', { 
              required: 'Calendly link is required',
              pattern: {
                value: /calendly\.com\/[\w-]+/,
                message: "Please enter a valid Calendly link"
              }
            })}
          />
          {errors.calendly_link && <p className="text-sm text-red-500">{errors.calendly_link.message}</p>}
          <p className="text-xs text-gray-400 mt-1 flex items-center">
            Don't have a link? <a href="https://calendly.com/signup" target="_blank" rel="noreferrer" className="text-primary hover:underline ml-1 flex items-center">Create a free account <ExternalLink className="h-3 w-3 ml-0.5" /></a>
          </p>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
          <strong>Tip:</strong> Make sure your Calendly event durations match the services you added in the previous step.
        </div>

        <div className="flex gap-4 pt-4">
          <Button variant="outline" type="button" onClick={() => { prevStep(); router.push('/onboarding/steps/faqs'); }} className="flex-1">
            Back
          </Button>
          <Button type="submit" className="flex-1">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
