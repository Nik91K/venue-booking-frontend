import type { LucideIcon } from 'lucide-react';

export type EstablishmentType = {
  id: number;
  name: string;
  description: string;
  coverPhoto: string;
  images: string[];
  type: string;
  address: string;
  locationDetails: LocationDetails;
  workingHours: Date;
  features: Features[];
  comments: CommentType[];
  rating: number;
  reviews: number;
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

export interface CommentType {
  id: number;
  text: string;
  rating: number;
  createdAt: string;
}
