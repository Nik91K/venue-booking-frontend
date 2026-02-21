import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@components/ui/badge';
import { Star, MapPin, Clock, MessageCircle } from 'lucide-react';
import type {
  BookingOrderFormRef,
  EstablishmentType,
} from '@/types/establishment';
import type { Role } from '@/types/common';
import AlertDialogConponent from '@/components/common/dialog/AlertDialog';
import { Skeleton } from '@components/ui/skeleton';
import BookingOrderForm from '@components/common/BookingOrderForm';
import FavoriteButton from '@components/common/FavoriteButton';
import type { ScheduleType } from '@/types/schedule';
import { getEstablishmentStatus } from '@hooks/useSchedule';
import { useMemo } from 'react';

type EstablishmentCardProps = {
  establishment: EstablishmentType;
  role: Role;
  onLogin?: () => void;
  handleAction?: () => void;
  bookingFormRef?: React.Ref<BookingOrderFormRef>;
  schedules?: ScheduleType[];
};

const EstablishmentCard = ({
  establishment,
  role,
  onLogin,
  handleAction,
  bookingFormRef,
  schedules,
}: EstablishmentCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      window.location.href = '/login';
    }
  };

  const status = useMemo(() => {
    return getEstablishmentStatus(schedules || []);
  }, [schedules]);

  return (
    <div className="flex rounded-lg overflow-hidden bg-white flex-col h-full">
      <div className="relative w-full h-48 overflow-hidden bg-gray-200 group">
        {!imageLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        <Link to={`/establishment/${establishment.id}`}>
          <img
            src={establishment.coverPhoto}
            alt={establishment.name}
            className="w-full h-full object-cover transition-transform"
            onLoad={() => setImageLoaded(true)}
          />
        </Link>
        <FavoriteButton
          establishmentId={establishment.id}
          role={role}
          isFavorite={establishment.isFavorite || false}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all duration-200 hover:scale-105`}
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <Link
          to={`/establishment/${establishment.id}`}
          className="grid gap-3 flex-1"
        >
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
              {establishment.name}
            </h2>
          </div>

          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex items-start gap-1">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="line-clamp-2 flex-1">{establishment.address}</p>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 shrink-0" />
              <p className="font-medium">{status.open ? 'Open' : 'Closed'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              className="flex items-center gap-1 text-xs"
              variant={'default'}
            >
              {establishment.type?.name ?? 'Unknown Type'}
            </Badge>
          </div>
        </Link>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
          <div className="flex gap-1">
            <div className="flex items-center gap-0.5">
              <span className="text-gray-600">{establishment.rating}</span>
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
            </div>
            <div className="flex items-center gap-0.5">
              <span className="text-gray-600">
                {establishment.commentsCount}
              </span>
              <MessageCircle size={16} className="text-gray-600" />
            </div>
          </div>

          {role === 'GUEST' ? (
            <AlertDialogConponent
              triggerText="Book Now"
              title="Login Required"
              description="You need to be logged in to make a reservation. Please log in or create an account to continue."
              actionText="Go to Login"
              onAction={handleLogin}
            />
          ) : (
            <AlertDialogConponent
              triggerText="Book Now"
              title="Let's reserve this"
              description="Fill in the details below to create a new booking order."
              actionText="Create Booking"
              onAction={handleAction}
            >
              <BookingOrderForm
                establishmentId={establishment.id}
                ref={bookingFormRef}
              />
            </AlertDialogConponent>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstablishmentCard;
