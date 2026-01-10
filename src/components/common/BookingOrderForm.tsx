import type { BookingType } from '@/types/establishmentCard';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState, forwardRef, useImperativeHandle } from 'react';
import type { BookingOrderFormRef } from '@/types/establishmentCard';
import { useAppDispatch } from '@/api/hooks';
import { createBooking } from '@/api/slices/bookingSlice';
import { addError } from '@/api/slices/errorSlice';
import { convertError } from '@/hooks/logger/errorConverter';

type BookingOrderProps = {
  onSubmit?: (booking: BookingType) => void;
  establishmentId: number;
};

const BookingOrderForm = forwardRef<BookingOrderFormRef, BookingOrderProps>(
  ({ establishmentId }, ref) => {
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<BookingType>({
      establishment: establishmentId,
      bookingDate: new Date(),
      bookingTime: '',
      numberOfGuests: 1,
    });

    const handleChange = (
      field: keyof BookingType,
      value: string | number | Date
    ) => {
      setFormData({ ...formData, [field]: value });
    };

    const formatDate = (date: Date): string => {
      return date.toISOString().slice(0, 10);
    };

    const handleSubmit = async () => {
      try {
        await dispatch(
          createBooking({
            establishment: formData.establishment,
            bookingDate: formData.bookingDate,
            numberOfGuests: formData.numberOfGuests,
            bookingTime: formData.bookingTime,
          })
        ).unwrap();
      } catch (error: any) {
        dispatch(addError(convertError(error)));
      }
    };

    useImperativeHandle(ref, () => ({
      submit: handleSubmit,
    }));

    return (
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="bookingDate">Booking Date</Label>
          <Input
            id="bookingDate"
            type="date"
            value={formatDate(formData.bookingDate)}
            onChange={e =>
              handleChange('bookingDate', new Date(e.target.value))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bookingTime">Booking Time</Label>
          <Input
            id="bookingTime"
            type="time"
            value={formData.bookingTime}
            onChange={e => handleChange('bookingTime', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfGuests">Number of Guests</Label>
          <Input
            id="numberOfGuests"
            type="number"
            value={formData.numberOfGuests}
            onChange={e =>
              handleChange('numberOfGuests', parseInt(e.target.value) || 0)
            }
            min="1"
          />
        </div>
      </div>
    );
  }
);

export default BookingOrderForm;
