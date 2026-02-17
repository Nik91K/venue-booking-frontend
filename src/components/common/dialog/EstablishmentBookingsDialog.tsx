import AlertDialogConponent from '@/components/common/dialog/AlertDialog';
import type { BookingType } from '@/types/booking';
import BookingCard from '@/components/common/cards/BookingCard';

type Props = {
  establishmentId: number;
  establishmentName: string;
  bookings: BookingType[];
  loading: boolean;
  onOpen: (id: number) => void;
};

export const EstablishmentBookingsDialog = ({
  establishmentId,
  establishmentName,
  bookings,
  loading,
  onOpen,
}: Props) => {
  return (
    <AlertDialogConponent
      triggerText="View Bookings"
      title={`Bookings for ${establishmentName}`}
      description="View all reservations for this establishment"
      actionText="Close"
      triggerClassName="w-full text-center"
      onOpenChange={open => {
        if (open) {
          onOpen(establishmentId);
        }
      }}
    >
      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length > 0 ? (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {bookings.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </AlertDialogConponent>
  );
};

export default EstablishmentBookingsDialog;
