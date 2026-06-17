import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Phone, Calendar, MessageSquare, Clock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Phone className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl">CallSherpa</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/onboarding">
            Get Started
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your AI Receptionist, Available 24/7
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Never miss another appointment. CallSherpa answers your calls, handles FAQs, and books appointments directly into your calendar.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/onboarding">Start Your 14-Day Free Trial</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Small Businesses Love CallSherpa
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                <Clock className="h-10 w-10 text-primary mb-2" />
                <h3 className="text-xl font-bold">24/7 Availability</h3>
                <p className="text-sm text-gray-500 text-center">
                  Your business stays open even when you're sleeping. No more missed opportunities after hours.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                <MessageSquare className="h-10 w-10 text-primary mb-2" />
                <h3 className="text-xl font-bold">Smart FAQ Handling</h3>
                <p className="text-sm text-gray-500 text-center">
                  Our AI learns your business details and answers common questions just like a human would.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                <Calendar className="h-10 w-10 text-primary mb-2" />
                <h3 className="text-xl font-bold">Direct Booking</h3>
                <p className="text-sm text-gray-500 text-center">
                  Integrates with Calendly to book appointments during the call without you lifting a finger.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                <CheckCircle2 className="h-10 w-10 text-primary mb-2" />
                <h3 className="text-xl font-bold">SMS Confirmation</h3>
                <p className="text-sm text-gray-500 text-center">
                  Automatically sends SMS confirmations to customers after booking to reduce no-shows.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Replace high human costs with AI efficiency
                </h2>
                <p className="text-gray-300 md:text-xl">
                  A human receptionist costs $3,000+/month. CallSherpa costs $149/month. Same reliability, better availability.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                    <span>No training required</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                    <span>Instant setup</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                    <span>Multi-lingual support</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <Card className="w-full max-w-sm bg-white text-slate-900">
                  <CardHeader>
                    <CardTitle>Professional Plan</CardTitle>
                    <CardDescription>Everything you need to grow</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-4xl font-bold">$149<span className="text-xl font-normal text-gray-500">/mo</span></div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                        <span>Dedicated Local Phone Number</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                        <span>Unlimited Calls</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                        <span>Calendly Integration</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                        <span>SMS Confirmations</span>
                      </li>
                    </ul>
                    <Button className="w-full" asChild>
                      <Link href="/onboarding">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2026 CallSherpa. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
