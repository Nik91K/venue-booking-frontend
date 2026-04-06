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
  locationDetails: LocationDetails;
  workingHours?: string;
  features: Features[];
  commentsCount: number;
  comments: CommentType[];
  ownerId: number;
  isFavorite: boolean;
  lat?: number;
  lng?: number;
  moderators: number[];
};

export type LocationDetails = {
  city?: string;
  street?: string;
  building?: string;
  zipCode?: string;
  lat?: number;
  lng?: number;
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

export type CreateEstablishmentType = {
  name: string;
  description: string;
  totalSeats: number;
  typeId: number;
  coverPhoto: File | null;
  photos: File[];
  city: string;
  street: string;
  building: string;
  zipCode: string;
};

export type UpdateEstablishmentType = {
  name: string;
  description: string;
  totalSeats: number;
  typeId: number;
  coverPhoto: File | null;
  photos: File[];
  city?: string;
  street?: string;
  building?: string;
  zipCode?: string;
};
