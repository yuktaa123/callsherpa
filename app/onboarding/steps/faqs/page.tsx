'use client';

import { useOnboarding } from '@/components/onboarding/onboarding-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FAQ } from '@/lib/types';

export default function FAQsStep() {
  const { data, updateData, nextStep, prevStep } = useOnboarding();
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQ[]>(data.faqs || [
    { question: 'Where are you located?', answer: '' },
    { question: 'What is your cancellation policy?', answer: '' }
  ]);

  const addFAQ = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const updateFAQ = (index: number, field: keyof FAQ, value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setFaqs(newFaqs);
  };

  const removeFAQ = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const onContinue = () => {
    updateData({ faqs });
    nextStep();
    router.push('/onboarding/steps/calendar');
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <p className="text-gray-500">Add common questions and answers so our AI can handle them for you.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-3 p-4 border rounded-lg bg-gray-50 relative group">
            <div className="grid gap-2">
              <Label>Question</Label>
              <Input 
                placeholder="e.g. Do you have parking?" 
                value={faq.question}
                onChange={(e) => updateFAQ(index, 'question', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Answer</Label>
              <Input 
                placeholder="e.g. Yes, we have free parking in the rear." 
                value={faq.answer}
                onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeFAQ(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        <Button type="button" variant="outline" className="w-full" onClick={addFAQ}>
          <Plus className="h-4 w-4 mr-2" /> Add another FAQ
        </Button>
      </div>

      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={() => { prevStep(); router.push('/onboarding/steps/hours-services'); }} className="flex-1">
          Back
        </Button>
        <Button onClick={onContinue} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
