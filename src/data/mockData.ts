import { Service, Client, Appointment, Staff } from '@/types/shringar';

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Hair Cut & Style',
    description: 'Professional hair cutting and styling service',
    price: 500,
    duration: 60,
    category: 'hair',
    available: true,
  },
  {
    id: '2',
    name: 'Facial Treatment',
    description: 'Deep cleansing and rejuvenating facial',
    price: 800,
    duration: 90,
    category: 'beauty',
    available: true,
  },
  {
    id: '3',
    name: 'Manicure & Pedicure',
    description: 'Complete nail care service',
    price: 600,
    duration: 75,
    category: 'nails',
    available: true,
  },
  {
    id: '4',
    name: 'Body Massage',
    description: 'Relaxing full body massage',
    price: 1200,
    duration: 120,
    category: 'spa',
    available: true,
  },
];

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra',
    totalVisits: 5,
    lastVisit: '2024-01-15',
  },
  {
    id: '2',
    name: 'Anjali Patel',
    email: 'anjali.patel@email.com',
    phone: '+91 87654 32109',
    address: 'Delhi, NCR',
    totalVisits: 8,
    lastVisit: '2024-01-20',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientId: '1',
    serviceId: '1',
    date: '2024-01-25',
    time: '10:00',
    status: 'confirmed',
    totalAmount: 500,
  },
  {
    id: '2',
    clientId: '2',
    serviceId: '2',
    date: '2024-01-26',
    time: '14:00',
    status: 'pending',
    totalAmount: 800,
  },
];

export const mockStaff: Staff[] = [
  {
    id: '1',
    name: 'Neha Kapoor',
    email: 'neha.kapoor@shringar.com',
    phone: '+91 98765 43211',
    role: 'Senior Stylist',
    specialties: ['Hair Styling', 'Hair Coloring'],
    available: true,
  },
  {
    id: '2',
    name: 'Kavya Singh',
    email: 'kavya.singh@shringar.com',
    phone: '+91 98765 43212',
    role: 'Beauty Therapist',
    specialties: ['Facial Treatments', 'Skincare'],
    available: true,
  },
];