import { useRef, useCallback } from 'react';
import type { BookingOrderFormRef } from '@/types/establishment';

export function useBookingFormSubmit() {
  const bookingFormRef = useRef<BookingOrderFormRef>(null);

  const submitBookingForm = useCallback(() => {
    bookingFormRef.current?.submit();
  }, []);

  return {
    bookingFormRef,
    submitBookingForm,
  };
}
