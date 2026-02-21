export const monthlyBookings = [
  { month: 'January', completed: 342, cancelled: 45, noShow: 12, pending: 28 },
  { month: 'February', completed: 389, cancelled: 52, noShow: 15, pending: 31 },
  { month: 'March', completed: 456, cancelled: 48, noShow: 11, pending: 35 },
  { month: 'April', completed: 523, cancelled: 61, noShow: 18, pending: 42 },
  { month: 'May', completed: 598, cancelled: 58, noShow: 14, pending: 38 },
  { month: 'June', completed: 687, cancelled: 72, noShow: 21, pending: 47 },
  { month: 'July', completed: 742, cancelled: 68, noShow: 19, pending: 51 },
  { month: 'August', completed: 721, cancelled: 65, noShow: 17, pending: 45 },
  {
    month: 'September',
    completed: 678,
    cancelled: 71,
    noShow: 22,
    pending: 49,
  },
  { month: 'October', completed: 645, cancelled: 63, noShow: 16, pending: 41 },
  { month: 'November', completed: 712, cancelled: 69, noShow: 20, pending: 44 },
  { month: 'December', completed: 823, cancelled: 78, noShow: 24, pending: 56 },
];

export const dailyBookings = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  bookings: Math.floor(20 + Math.random() * 15 + Math.sin(i / 7) * 10),
  revenue: Math.floor(800 + Math.random() * 600 + Math.sin(i / 7) * 400),
}));

export const bookingsByTimeSlot = [
  { time: '00:00', bookings: 2 },
  { time: '01:00', bookings: 1 },
  { time: '02:00', bookings: 0 },
  { time: '03:00', bookings: 0 },
  { time: '04:00', bookings: 0 },
  { time: '05:00', bookings: 1 },
  { time: '06:00', bookings: 3 },
  { time: '07:00', bookings: 8 },
  { time: '08:00', bookings: 15 },
  { time: '09:00', bookings: 28 },
  { time: '10:00', bookings: 42 },
  { time: '11:00', bookings: 56 },
  { time: '12:00', bookings: 78 },
  { time: '13:00', bookings: 84 },
  { time: '14:00', bookings: 67 },
  { time: '15:00', bookings: 52 },
  { time: '16:00', bookings: 48 },
  { time: '17:00', bookings: 63 },
  { time: '18:00', bookings: 89 },
  { time: '19:00', bookings: 97 },
  { time: '20:00', bookings: 82 },
  { time: '21:00', bookings: 61 },
  { time: '22:00', bookings: 34 },
  { time: '23:00', bookings: 12 },
];

export const bookingsByWeekday = [
  { day: 'Monday', bookings: 428, avgDuration: 85, revenue: 18900 },
  { day: 'Tuesday', bookings: 456, avgDuration: 82, revenue: 19800 },
  { day: 'Wednesday', bookings: 492, avgDuration: 88, revenue: 21600 },
  { day: 'Thursday', bookings: 534, avgDuration: 91, revenue: 23400 },
  { day: 'Friday', bookings: 687, avgDuration: 95, revenue: 32100 },
  { day: 'Saturday', bookings: 823, avgDuration: 102, revenue: 42300 },
  { day: 'Sunday', bookings: 645, avgDuration: 98, revenue: 28700 },
];
