import type { LucideIcon } from 'lucide-react';

export type EstablishmentType = {
  id: number;
  name: string;
  description: string;
  totalSeats: number;
  rating: number;
  coverPhoto: string;
  createdAt: string;
  photos: string[];
  type: VenueType;
  address: string;
  locationDetails?: LocationDetails;
  workingHours?: string;
  features: Features[];
  comments: CommentType[];
  ownerId: number;
  isFavorite: boolean;
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

type VenueType = {
  id: number;
  name: string;
};

export type CommentType = {
  id: number;
  text: string;
  rating: number;
  createdAt: string;
  establishmentId: number;
  userId: number;
};

export type BookingOrderFormRef = {
  submit: () => void;
};
