import { Wifi, ParkingCircle, Music } from 'lucide-react';
import type { EstablishmentCard } from '@/types/establishmentCard';

export const ESTABLISHMENT_CARD: EstablishmentCard[] = [
  {
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    title: 'The Golden Bistro',
    type: 'Restaurant',
    location: 'USA, New York',
    locationDetails: {
      city: 'New York',
      street: '5th Avenue',
      building: '742',
    },
    workingHours: new Date('2024-01-01T09:00:00'),
    features: [
      { icon: Wifi, title: 'Free WiFi' },
      { icon: ParkingCircle, title: 'Parking' },
      { icon: Music, title: 'Live Music' },
    ],
    rating: 4.8,
    reviews: 342,
  },
];
