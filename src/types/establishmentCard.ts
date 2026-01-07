import type { LucideIcon } from 'lucide-react';

export type EstablishmentType = {
  id: number;
  name: string;
  description: string;
  totalSeats: number;
  coverPhoto: string;
  createdAt: string;
  photos: string[];
  type: {
    id: number;
    name: string;
    image: string;
  };
  address: string;
  locationDetails?: LocationDetails;
  workingHours?: string;
  features: Features[];
  comments: CommentType[];
  ownerId: number;
};

export type LocationDetails = {
  city: string;
  street: string;
  building: string;
  zipCode?: string;
};

type Features = {
  id: number;
  icon: LucideIcon;
  title: string;
};

export type CommentType = {
  id: number;
  text: string;
  rating: number;
  createdAt: string;
  establishmentId: number;
  userId: number;
};

export type BookingType = {
  establishment: number;
  bookingDate: Date;
  bookingTime: string;
  numberOfGuests: number;
};
