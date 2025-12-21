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

export const establishmentPerformance = [
  {
    name: 'Downtown Branch',
    bookings: 1247,
    revenue: 54800,
    occupancy: 87,
    fill: 'var(--color-downtown)',
  },
  {
    name: 'Westside Location',
    bookings: 986,
    revenue: 42300,
    occupancy: 78,
    fill: 'var(--color-westside)',
  },
  {
    name: 'East End Venue',
    bookings: 834,
    revenue: 36900,
    occupancy: 71,
    fill: 'var(--color-eastend)',
  },
  {
    name: 'Northside Hub',
    bookings: 712,
    revenue: 31200,
    occupancy: 65,
    fill: 'var(--color-northside)',
  },
  {
    name: 'South Plaza',
    bookings: 623,
    revenue: 27100,
    occupancy: 58,
    fill: 'var(--color-southplaza)',
  },
];

export const bookingSources = [
  { source: 'Website', bookings: 3842, fill: 'var(--color-website)' },
  { source: 'Mobile App', bookings: 2918, fill: 'var(--color-mobile)' },
  { source: 'Phone', bookings: 1456, fill: 'var(--color-phone)' },
  { source: 'Walk-in', bookings: 987, fill: 'var(--color-walkin)' },
  { source: 'Partner Sites', bookings: 634, fill: 'var(--color-partner)' },
];

export const customerSegments = [
  {
    segment: 'Regular (10+ bookings)',
    count: 2341,
    revenue: 98700,
    fill: 'var(--color-regular)',
  },
  {
    segment: 'Frequent (5-9 bookings)',
    count: 4562,
    revenue: 142300,
    fill: 'var(--color-frequent)',
  },
  {
    segment: 'Occasional (2-4 bookings)',
    count: 7823,
    revenue: 178900,
    fill: 'var(--color-occasional)',
  },
  {
    segment: 'First-time',
    count: 12456,
    revenue: 156200,
    fill: 'var(--color-firsttime)',
  },
];

export const weeklyOccupancy = [
  {
    week: 'Week 1',
    downtown: 82,
    westside: 75,
    eastend: 68,
    northside: 71,
    southplaza: 64,
  },
  {
    week: 'Week 2',
    downtown: 85,
    westside: 78,
    eastend: 71,
    northside: 73,
    southplaza: 66,
  },
  {
    week: 'Week 3',
    downtown: 88,
    westside: 81,
    eastend: 74,
    northside: 76,
    southplaza: 69,
  },
  {
    week: 'Week 4',
    downtown: 91,
    westside: 83,
    eastend: 77,
    northside: 79,
    southplaza: 72,
  },
];

export const bookingDurations = [
  { duration: '30 min', count: 1247 },
  { duration: '60 min', count: 3842 },
  { duration: '90 min', count: 2918 },
  { duration: '120 min', count: 1634 },
  { duration: '150 min', count: 823 },
  { duration: '180+ min', count: 456 },
];

export const avgBookingValue = [
  { month: 'Jan', value: 42.5 },
  { month: 'Feb', value: 44.2 },
  { month: 'Mar', value: 43.8 },
  { month: 'Apr', value: 45.6 },
  { month: 'May', value: 47.3 },
  { month: 'Jun', value: 49.8 },
  { month: 'Jul', value: 51.2 },
  { month: 'Aug', value: 50.4 },
  { month: 'Sep', value: 48.9 },
  { month: 'Oct', value: 47.6 },
  { month: 'Nov', value: 49.3 },
  { month: 'Dec', value: 52.8 },
];

export const peakHoursAnalysis = [
  { hour: '12:00-14:00', bookings: 162, revenue: 7890, occupancy: 94 },
  { hour: '18:00-20:00', bookings: 186, revenue: 9240, occupancy: 97 },
  { hour: '09:00-11:00', bookings: 126, revenue: 5670, occupancy: 82 },
  { hour: '15:00-17:00', bookings: 115, revenue: 5120, occupancy: 78 },
  { hour: '20:00-22:00', bookings: 143, revenue: 6780, occupancy: 86 },
];

export const bookingFunnel = [
  { stage: 'Page Views', count: 45230, rate: 100 },
  { stage: 'Search/Browse', count: 18092, rate: 40 },
  { stage: 'Selected Date/Time', count: 9046, rate: 20 },
  { stage: 'Started Booking', count: 5428, rate: 12 },
  { stage: 'Completed Payment', count: 4071, rate: 9 },
];

export const satisfactionScores = [
  { month: 'Jan', score: 4.2, responses: 234 },
  { month: 'Feb', score: 4.3, responses: 267 },
  { month: 'Mar', score: 4.4, responses: 289 },
  { month: 'Apr', score: 4.3, responses: 312 },
  { month: 'May', score: 4.5, responses: 341 },
  { month: 'Jun', score: 4.6, responses: 378 },
  { month: 'Jul', score: 4.5, responses: 398 },
  { month: 'Aug', score: 4.4, responses: 367 },
  { month: 'Sep', score: 4.5, responses: 356 },
  { month: 'Oct', score: 4.4, responses: 334 },
  { month: 'Nov', score: 4.6, responses: 378 },
  { month: 'Dec', score: 4.7, responses: 412 },
];

export const chartConfigs = {
  monthlyBookings: {
    completed: { label: 'Completed', color: 'hsl(var(--chart-1))' },
    cancelled: { label: 'Cancelled', color: 'hsl(var(--chart-2))' },
    noShow: { label: 'No Show', color: 'hsl(var(--chart-3))' },
    pending: { label: 'Pending', color: 'hsl(var(--chart-4))' },
  },
  weeklyOccupancy: {
    downtown: { label: 'Downtown', color: 'hsl(var(--chart-1))' },
    westside: { label: 'Westside', color: 'hsl(var(--chart-2))' },
    eastend: { label: 'East End', color: 'hsl(var(--chart-3))' },
    northside: { label: 'Northside', color: 'hsl(var(--chart-4))' },
    southplaza: { label: 'South Plaza', color: 'hsl(var(--chart-5))' },
  },
  establishmentPerformance: {
    downtown: { label: 'Downtown', color: 'hsl(var(--chart-1))' },
    westside: { label: 'Westside', color: 'hsl(var(--chart-2))' },
    eastend: { label: 'East End', color: 'hsl(var(--chart-3))' },
    northside: { label: 'Northside', color: 'hsl(var(--chart-4))' },
    southplaza: { label: 'South Plaza', color: 'hsl(var(--chart-5))' },
  },
  bookingSources: {
    website: { label: 'Website', color: 'hsl(var(--chart-1))' },
    mobile: { label: 'Mobile App', color: 'hsl(var(--chart-2))' },
    phone: { label: 'Phone', color: 'hsl(var(--chart-3))' },
    walkin: { label: 'Walk-in', color: 'hsl(var(--chart-4))' },
    partner: { label: 'Partners', color: 'hsl(var(--chart-5))' },
  },
  customerSegments: {
    regular: { label: 'Regular', color: 'hsl(var(--chart-1))' },
    frequent: { label: 'Frequent', color: 'hsl(var(--chart-2))' },
    occasional: { label: 'Occasional', color: 'hsl(var(--chart-3))' },
    firsttime: { label: 'First-time', color: 'hsl(var(--chart-4))' },
  },
  revenueBreakdown: {
    standard: { label: 'Standard', color: 'hsl(var(--chart-1))' },
    premium: { label: 'Premium', color: 'hsl(var(--chart-2))' },
    group: { label: 'Group', color: 'hsl(var(--chart-3))' },
    event: { label: 'Event', color: 'hsl(var(--chart-4))' },
  },
  cancellationReasons: {
    schedule: { label: 'Schedule Change', color: 'hsl(var(--chart-1))' },
    alternative: { label: 'Found Alternative', color: 'hsl(var(--chart-2))' },
    price: { label: 'Price Concerns', color: 'hsl(var(--chart-3))' },
    emergency: { label: 'Emergency', color: 'hsl(var(--chart-4))' },
    weather: { label: 'Weather', color: 'hsl(var(--chart-5))' },
    other: { label: 'Other', color: 'hsl(220, 70%, 50%)' },
  },
};
