import {
  CalendarCheck,
  Bell,
  Heart,
  Star,
  BarChart2,
  Map,
  ShieldCheck,
  UserCheck,
  Building2,
} from 'lucide-react';

export const HERO_STATS = [
  { num: '500+', label: 'Establishments' },
  { num: '12k', label: 'Bookings made' },
  { num: '4.8★', label: 'Average rating' },
] as const;

export const CAROUSEL_IMAGES = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
];

export const FEATURES = [
  {
    icon: Map,
    title: 'Interactive Map',
    desc: 'Explore venues near you with live Google Maps. Filter by type, rating, and real-time availability.',
  },
  {
    icon: CalendarCheck,
    title: 'Instant Booking',
    desc: 'Reserve a table in seconds — choose date, time, and party size. Confirmation arrives immediately.',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    desc: 'Automated reminders keep guests and staff in sync. No more no-shows or missed reservations.',
  },
  {
    icon: Heart,
    title: 'Wishlist',
    desc: 'Save establishments you love or want to try. Your personal discovery list, always one tap away.',
  },
  {
    icon: Star,
    title: 'Reviews',
    desc: 'Genuine guest reviews help establishments grow and help future visitors choose wisely.',
  },
  {
    icon: BarChart2,
    title: 'Owner Analytics',
    desc: 'Occupancy rates, peak hours, repeat visitors — all in one clean dashboard for establishment owners.',
  },
];

export const ROLES = [
  {
    icon: UserCheck,
    label: 'Guest',
    badge: 'Open to all',
    desc: 'Browse the full catalogue and explore the map — no account required.',
  },
  {
    icon: CalendarCheck,
    label: 'User',
    badge: 'Registered',
    desc: 'Book tables, manage reservations, build your wishlist, and leave reviews.',
  },
  {
    icon: Building2,
    label: 'Owner',
    badge: 'Establishment',
    desc: 'Create and manage your venue profile, view analytics, and respond to reviews.',
  },
  {
    icon: ShieldCheck,
    label: 'Moderator',
    badge: 'Admin',
    desc: 'Review and approve content. Maintain quality and safety standards platform-wide.',
  },
];

export const BOOKING_STEPS = [
  {
    title: 'Find your spot',
    desc: 'Open the interactive map and search by location, cuisine type, or name. Filter by rating, distance, and availability.',
  },
  {
    title: 'Reserve a table',
    desc: 'Pick date, time, and party size, then confirm — the whole flow takes under a minute. No phone calls needed.',
  },
  {
    title: 'Show up & enjoy',
    desc: "You'll get a reminder before your booking. After the visit, share your experience with a review.",
  },
];
