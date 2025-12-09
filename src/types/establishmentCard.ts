import type { LucideIcon } from 'lucide-react';

export type EstablishmentCard = {
  image: string;
  title: string;
  type: string;
  location: string;
  locationDetails: LocationDetails;
  workingHours: Date;
  features: Features[];
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
  icon: LucideIcon;
  title: string;
};
