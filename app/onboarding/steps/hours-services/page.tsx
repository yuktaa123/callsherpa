'use client';

import { useOnboarding } from '@/components/onboarding/onboarding-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { WeeklySchedule, DayOfWeek, Service } from '@/lib/types';

export default function HoursServicesStep() {
  const { data, updateData, nextStep, prevStep } = useOnboarding();
  const router = useRouter();
  const [hours, setHours] = useState<WeeklySchedule>(data.hours as WeeklySchedule);
  const [services, setServices] = useState<Service[]>(data.services || []);

  const handleHourChange = (day: DayOfWeek, field: 'open' | 'close', value: string) => {
    setHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const handleDayToggle = (day: DayOfWeek) => {
    setHours(prev => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled }
    }));
  };

  const addService = () => {
    setServices([...services, { name: '', duration: 30, price: 0 }]);
  };

  const updateService = (index: number, field: keyof Service, value: string | number) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], [field]: value };
    setServices(newServices);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const onContinue = () => {
    updateData({ hours, services });
    nextStep();
    router.push('/onboarding/steps/faqs');
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Hours & Services</h2>
        <p className="text-gray-500">When are you open and what do you offer?</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Business Hours</h3>
        <div className="space-y-3">
          {(Object.keys(hours) as DayOfWeek[]).map((day) => (
            <div key={day} className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 w-32">
                <Checkbox 
                  id={day} 
                  checked={hours[day].enabled} 
                  onCheckedChange={() => handleDayToggle(day)}
                />
                <Label htmlFor={day} className="capitalize">{day}</Label>
              </div>
              <div className="flex items-center space-x-2 flex-1">
                <Input 
                  type="time" 
                  value={hours[day].open} 
                  disabled={!hours[day].enabled}
                  onChange={(e) => handleHourChange(day, 'open', e.target.value)}
                  className="w-32"
                />
                <span>to</span>
                <Input 
                  type="time" 
                  value={hours[day].close} 
                  disabled={!hours[day].enabled}
                  onChange={(e) => handleHourChange(day, 'close', e.target.value)}
                  className="w-32"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-t pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Services</h3>
          <Button type="button" variant="outline" size="sm" onClick={addService}>
            <Plus className="h-4 w-4 mr-2" /> Add Service
          </Button>
        </div>
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="flex items-end space-x-2 p-4 border rounded-lg bg-gray-50">
              <div className="grid flex-1 gap-2">
                <Label>Service Name</Label>
                <Input 
                  placeholder="e.g. Consultation" 
                  value={service.name}
                  onChange={(e) => updateService(index, 'name', e.target.value)}
                />
              </div>
              <div className="grid w-24 gap-2">
                <Label>Mins</Label>
                <Input 
                  type="number" 
                  value={service.duration}
                  onChange={(e) => updateService(index, 'duration', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="grid w-24 gap-2">
                <Label>Price ($)</Label>
                <Input 
                  type="number" 
                  value={service.price}
                  onChange={(e) => updateService(index, 'price', parseInt(e.target.value) || 0)}
                />
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-red-500"
                onClick={() => removeService(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {services.length === 0 && (
            <p className="text-sm text-gray-500 italic">No services added yet. Add at least one to enable booking.</p>
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={() => { prevStep(); router.push('/onboarding/steps/business-info'); }} className="flex-1">
          Back
        </Button>
        <Button onClick={onContinue} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
