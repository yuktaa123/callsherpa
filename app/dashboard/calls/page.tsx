'use client';

import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, Phone, Clock, Calendar } from 'lucide-react';

const mockCalls = [
  { 
    id: '1', 
    number: '(555) 987-6543', 
    name: 'John Smith', 
    duration: '2:15', 
    date: '2026-06-16 14:05', 
    booked: true,
    summary: 'Customer called to book a dental cleaning. Appointment scheduled for today at 2:00 PM.',
    transcript: [
      { role: 'receptionist', text: 'Hello! Thank you for calling Sunnyvale Dental. How can I help you today?' },
      { role: 'caller', text: 'Hi, I would like to book a cleaning for this afternoon if possible.' },
      { role: 'receptionist', text: 'I can certainly help with that. We have an opening at 2:00 PM today. Would that work for you?' },
      { role: 'caller', text: 'Yes, that works perfectly.' },
      { role: 'receptionist', text: 'Great. Can I have your name, please?' },
      { role: 'caller', text: 'John Smith.' },
      { role: 'receptionist', text: 'Thank you, John. I have booked you for 2:00 PM. You will receive an SMS confirmation shortly.' }
    ]
  },
  { 
    id: '2', 
    number: '(555) 234-5678', 
    name: 'Emily Davis', 
    duration: '1:45', 
    date: '2026-06-16 09:30', 
    booked: true,
    summary: 'Inquiry about teeth whitening prices. Customer booked for tomorrow at 10:30 AM.',
    transcript: [
      { role: 'receptionist', text: 'Sunnyvale Dental, how can I help you?' },
      { role: 'caller', text: 'Hi, how much do you charge for teeth whitening?' },
      { role: 'receptionist', text: 'Our professional whitening starts at $299. Would you like to schedule an appointment?' },
      { role: 'caller', text: 'Yes, do you have anything tomorrow morning?' },
      { role: 'receptionist', text: 'We have 10:30 AM available tomorrow. Shall I book that for you?' },
      { role: 'caller', text: 'Yes please.' }
    ]
  },
  { 
    id: '3', 
    number: '(555) 456-7890', 
    name: 'Unknown', 
    duration: '0:50', 
    date: '2026-06-15 16:20', 
    booked: false,
    summary: 'Caller asked about office hours on Sundays. Receptionist informed them the office is closed on Sundays.',
    transcript: [
      { role: 'receptionist', text: 'Hello, Sunnyvale Dental.' },
      { role: 'caller', text: 'Hi, are you guys open this Sunday?' },
      { role: 'receptionist', text: 'I am sorry, we are closed on Sundays. Our regular hours are Monday through Friday, 9 to 5, and Saturday by appointment.' },
      { role: 'caller', text: 'Okay, thanks anyway.' }
    ]
  },
];

export default function CallsPage() {
  const [selectedCall, setSelectedCall] = useState<typeof mockCalls[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCalls = mockCalls.filter(call => 
    call.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    call.number.includes(searchQuery) ||
    call.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Call Logs</h1>
          <p className="text-gray-500">View and listen to all calls handled by your AI receptionist.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search calls..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Caller</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCalls.map((call) => (
              <TableRow key={call.id}>
                <TableCell>
                  <div className="font-medium">{call.name}</div>
                  <div className="text-sm text-gray-500">{call.number}</div>
                </TableCell>
                <TableCell>{call.date}</TableCell>
                <TableCell>{call.duration}</TableCell>
                <TableCell>
                  {call.booked ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Booked</Badge>
                  ) : (
                    <Badge variant="secondary">Inquiry</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedCall(call)}>
                    <FileText className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!selectedCall} onOpenChange={(open) => !open && setSelectedCall(null)}>
        {selectedCall && (
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Call with {selectedCall.name}
                {selectedCall.booked && <Badge className="bg-green-100 text-green-700 border-none">Booked</Badge>}
              </DialogTitle>
              <DialogDescription>
                {selectedCall.date} • {selectedCall.duration} duration
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  AI Summary
                </h3>
                <p className="text-sm bg-gray-50 p-3 rounded-lg border italic">
                  &quot;{selectedCall.summary}&quot;
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2 border-b pb-2">
                  <Phone className="h-4 w-4 text-primary" />
                  Full Transcript
                </h3>
                <div className="space-y-4">
                  {selectedCall.transcript.map((line, i) => (
                    <div key={i} className={`flex flex-col ${line.role === 'receptionist' ? 'items-start' : 'items-end'}`}>
                      <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">
                        {line.role === 'receptionist' ? 'AI Receptionist' : 'Caller'}
                      </span>
                      <div className={`text-sm p-3 rounded-lg max-w-[80%] ${
                        line.role === 'receptionist' 
                          ? 'bg-primary/10 text-slate-900 rounded-tl-none' 
                          : 'bg-gray-100 text-slate-900 rounded-tr-none'
                      }`}>
                        {line.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border bg-white shadow-sm overflow-hidden">{children}</div>;
}
