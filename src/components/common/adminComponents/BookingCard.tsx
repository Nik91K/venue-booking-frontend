import type { BookingType } from '@/types/booking';

const BookingCard = ({ booking }: { booking: BookingType }) => {
  const isConfirmed = booking.status === 'CONFIRMED';

  return (
    <div className="p-4 border rounded-lg space-y-1">
      <p>Booking ID: {booking.id}</p>
      <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
      <p>Time: {booking.bookingTime}</p>
      <p>Guests: {booking.numberOfGuests}</p>
      <p>
        Status:
        <span
          className={isConfirmed ? 'text-green-500 ml-2' : 'text-red-500 ml-2'}
        >
          {booking.status}
        </span>
      </p>
      {booking.user && (
        <p className="text-sm text-muted-foreground">
          {booking.user.name} ({booking.user.email})
        </p>
      )}
    </div>
  );
};

export default BookingCard;
