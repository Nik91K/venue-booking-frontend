import type { BookingType } from '@/types/booking';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Calendar, Clock, Users, Hash } from 'lucide-react';

const BookingCard = ({ booking }: { booking: BookingType }) => {
  const isConfirmed = booking.status === 'CONFIRMED';

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Hash className="w-4 h-4 text-muted-foreground" />
            Booking #{booking.id}
          </CardTitle>

          <Badge
            variant={isConfirmed ? 'default' : 'destructive'}
            className="uppercase tracking-wide"
          >
            {booking.status}
          </Badge>
        </div>

        {booking.user && (
          <CardDescription>
            {booking.user.name} {booking.user.email}
          </CardDescription>
        )}
        <CardDescription>
          Establishment {booking.establishment.name}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{booking.bookingTime}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{booking.numberOfGuests} guests</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
