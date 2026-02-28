import type { LucideIcon } from 'lucide-react';
import type { UserType } from '@/types/user';

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
  commentsCount: number;
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

export type VenueType = {
  id: number;
  name: string;
};

export type CommentType = {
  id: number;
  text: string;
  rating: number;
  createdAt: string;
  establishmentId: number;
  user: UserType;
};

export type BookingOrderFormRef = {
  submit: () => void;
};

export type UpdateEstablishmentType = {
  name: string;
  description: string;
  totalSeats: number;
  coverPhoto: string;
  photos: string[];
  type: VenueType;
  address: string;
  locationDetails?: LocationDetails;
};
