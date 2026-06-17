'use client';

import { useOnboarding } from '@/components/onboarding/onboarding-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
};

export default function BusinessInfoStep() {
  const { data, updateData, nextStep } = useOnboarding();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: data.name || '',
      email: data.email || '',
    }
  });

  const onSubmit = (formData: FormData) => {
    updateData(formData);
    nextStep();
    router.push('/onboarding/steps/hours-services');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Tell us about your business</h2>
        <p className="text-gray-500">This helps our AI receptionist introduce your business correctly.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Business Name</Label>
          <Input 
            id="name" 
            placeholder="e.g. Sunnyvale Dental" 
            {...register('name', { required: 'Business name is required' })}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Business Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="contact@example.com" 
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <Button type="submit" className="w-full">Continue</Button>
      </form>
    </div>
  );
}
