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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User, Phone, CheckCircle2, XCircle } from 'lucide-react';

const mockBookings = [
  { id: '1', name: 'John Smith', number: '(555) 987-6543', service: 'Dental Cleaning', time: '2026-06-16 14:00', status: 'confirmed' },
  { id: '2', name: 'Emily Davis', number: '(555) 234-5678', service: 'Teeth Whitening', time: '2026-06-17 10:30', status: 'confirmed' },
  { id: '3', name: 'Michael Brown', number: '(555) 345-6789', service: 'Initial Consultation', time: '2026-06-18 11:15', status: 'confirmed' },
  { id: '4', name: 'Sarah Wilson', number: '(555) 456-7890', service: 'Emergency Filling', time: '2026-06-18 16:30', status: 'confirmed' },
  { id: '5', name: 'David Lee', number: '(555) 567-8901', service: 'X-Ray', time: '2026-06-19 09:00', status: 'cancelled' },
];

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = mockBookings.filter(booking => 
    booking.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    booking.number.includes(searchQuery) ||
    booking.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-gray-500">Manage all appointments scheduled by your AI receptionist.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search bookings..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Appointment Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div className="font-medium">{booking.name}</div>
                  <div className="text-sm text-gray-500">{booking.number}</div>
                </TableCell>
                <TableCell>{booking.service}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {booking.time}
                  </div>
                </TableCell>
                <TableCell>
                  {booking.status === 'confirmed' ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none flex w-fit items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Confirmed
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 flex w-fit items-center gap-1">
                      <XCircle className="h-3 w-3" /> Cancelled
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Cancel</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
