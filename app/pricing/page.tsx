import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Phone } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Phone className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl">CallSherpa</span>
        </Link>
      </header>
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              One plan. Everything included. No hidden fees.
            </p>
          </div>
          <div className="mt-12 flex justify-center">
            <Card className="w-full max-w-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Professional</CardTitle>
                <CardDescription>Perfect for small businesses and service providers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <span className="text-5xl font-bold">$149</span>
                  <span className="text-xl text-gray-500">/month</span>
                </div>
                <div className="space-y-4">
                  <PricingItem text="24/7 AI Voice Receptionist" />
                  <PricingItem text="Dedicated Local Phone Number" />
                  <PricingItem text="Unlimited FAQ Handling" />
                  <PricingItem text="Calendly Booking Integration" />
                  <PricingItem text="Real-time Call Transcripts" />
                  <PricingItem text="SMS Appointment Confirmations" />
                  <PricingItem text="Dashboard with Call Analytics" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full text-lg h-12" asChild>
                  <Link href="/onboarding">Start 14-Day Free Trial</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3 text-center">
            <div>
              <h3 className="font-bold text-lg mb-2">No Credit Card Required</h3>
              <p className="text-sm text-gray-500">Try everything free for 14 days and see the value for yourself.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Cancel Anytime</h3>
              <p className="text-sm text-gray-500">No long-term contracts. Pause or cancel your subscription whenever you want.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Dedicated Support</h3>
              <p className="text-sm text-gray-500">We'll help you configure your AI agent to perfectly match your business needs.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function PricingItem({ text }: { text: string }) {
  return (
    <div className="flex items-center">
      <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
      <span>{text}</span>
    </div>
  );
}
