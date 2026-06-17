'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Save, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500">Configure your business info, AI behavior, and integrations.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General Info</TabsTrigger>
          <TabsTrigger value="hours">Hours & Services</TabsTrigger>
          <TabsTrigger value="faqs">AI & FAQs</TabsTrigger>
          <TabsTrigger value="phone">Phone & Voice</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Basic details about your business.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="biz-name">Business Name</Label>
                <Input id="biz-name" defaultValue="Sunnyvale Dental" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="biz-email">Contact Email</Label>
                <Input id="biz-email" defaultValue="contact@sunnyvaledental.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="biz-calendly">Calendly Link</Label>
                <Input id="biz-calendly" defaultValue="calendly.com/sunnyvaledental" />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Operating Hours</CardTitle>
              <CardDescription>When should your AI receptionist tell callers you are open?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <div key={day} className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 w-32">
                    <Checkbox id={day} checked={true} />
                    <Label htmlFor={day}>{day}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input type="time" defaultValue="09:00" className="w-32" />
                    <span>to</span>
                    <Input type="time" defaultValue="17:00" className="w-32" />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>
                <Save className="h-4 w-4 mr-2" /> Save Hours
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="faqs" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>AI Knowledge Base</CardTitle>
                <CardDescription>Information the AI uses to answer customer questions.</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" /> Add FAQ
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-gray-50 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="font-bold">Where are you located?</Label>
                  <Button variant="ghost" size="icon" className="text-red-500 h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input defaultValue="We are located at 123 Sunshine Blvd, Sunnyvale, CA." />
              </div>
              <div className="p-4 border rounded-lg bg-gray-50 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="font-bold">Do you take insurance?</Label>
                  <Button variant="ghost" size="icon" className="text-red-500 h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input defaultValue="Yes, we take all major PPO insurance plans." />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>
                <Save className="h-4 w-4 mr-2" /> Save Knowledge Base
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="phone" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Phone Configuration</CardTitle>
              <CardDescription>Your business phone number and voice settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">(555) 123-4567</p>
                    <p className="text-sm text-gray-500">Your dedicated CallSherpa number</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 border-none hover:bg-green-100">Active</Badge>
              </div>

              <div className="space-y-2">
                <Label>Voice Assistant Model</Label>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 bg-primary/5 border-primary">Professional Sarah (Default)</Button>
                  <Button variant="outline" className="flex-1">Professional James</Button>
                  <Button variant="outline" className="flex-1">Friendly Maya</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="greeting">Custom Greeting (Optional)</Label>
                <Input id="greeting" placeholder="e.g. Hello, thank you for calling Sunnyvale Dental..." />
                <p className="text-xs text-gray-500">If left blank, our AI will generate a professional greeting based on your business name.</p>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>
                <Save className="h-4 w-4 mr-2" /> Save Phone Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
