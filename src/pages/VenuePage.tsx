import LayoutPage from '@/layoutPage';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { getEstablishmentById } from '@/api/slices/establishmentSlice';
import { getEstablishmentComments } from '@/api/slices/establishmentSlice';
import { useAppSelector, useAppDispatch } from '@/api/hooks';
import AlertDialogConponent from '@/components/common/AlertDialog';
import { ArrowLeft, Clock, Heart, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CarouselComponent } from '@/components/common/CarouselComponent';
import CommentForm from '@/components/common/comment/CommentForm';
import CommentComponent from '@/components/common/comment/CommentComponent';
import { addError } from '@/api/slices/errorSlice';
import { convertError } from '@/hooks/logger/errorConverter';
import BookingOrderForm from '@/components/common/BookingOrderForm';
import type { BookingOrderFormRef } from '@/types/establishmentCard';

const EstablishmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  const { loading, selectedEstablishment, error } = useAppSelector(
    state => state.establishment
  );
  const { user } = useAppSelector(state => state.auth);

  const userRole = user?.role || 'GUEST';
  const establishment = selectedEstablishment;

  useEffect(() => {
    if (id) {
      dispatch(getEstablishmentById(Number(id)));
      dispatch(getEstablishmentComments(Number(id)));
    }
  }, [id, dispatch]);

  const handleLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    if (error) {
      dispatch(addError(convertError(new Error(error))));
    }
  });

  const bookingFormRef = useRef<BookingOrderFormRef>(null);

  const handleAction = () => {
    bookingFormRef.current?.submit();
  };

  if (loading) {
    return (
      <LayoutPage>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Spinner />
        </div>
      </LayoutPage>
    );
  }

  if (error || !establishment) {
    return (
      <LayoutPage>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-lg">Establishment not found</p>
          <Button onClick={() => navigate('/explore')}>
            Back to Establishments
          </Button>
        </div>
      </LayoutPage>
    );
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <LayoutPage>
      <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-6">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2 flex items-center"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="w-full h-100 sm:h-125 lg:h-150">
            <CarouselComponent images={establishment.photos} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0 mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white-900">
                    {establishment.name}
                  </h1>
                  <Badge variant="secondary" className="mt-2">
                    {establishment.type.name}
                  </Badge>
                </div>
                <button
                  onClick={toggleFavorite}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all self-start"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>
              <p className="text-white-700 leading-relaxed">
                {establishment.description}
              </p>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white-900">Address</p>
                  <p>{establishment.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white-900">Hours</p>
                  <p>Open now • Closes at 10:00 PM</p>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {establishment.features.map(feature => {
                  const Icon = feature.icon;
                  return (
                    <Badge
                      key={feature.id}
                      variant="secondary"
                      className="flex items-center gap-2 py-2 px-3"
                    >
                      <Icon size={16} />
                      <span>{feature.title}</span>
                    </Badge>
                  );
                })}
              </div>
            </div>
            <div className="pt-4">
              {userRole === 'GUEST' ? (
                <AlertDialogConponent
                  triggerText="Book Now"
                  title="Login Required"
                  description="You need to be logged in to make a reservation. Please log in or create an account to continue."
                  actionText="Go to Login"
                  onAction={handleLogin}
                  triggerClassName="w-full"
                />
              ) : (
                <AlertDialogConponent
                  triggerText="Book Now"
                  title="Login Required"
                  description="Fill in the details below to create a new booking order."
                  actionText="Create Booking"
                  onAction={handleAction}
                  triggerClassName="w-full"
                >
                  <BookingOrderForm
                    establishmentId={Number(id)}
                    ref={bookingFormRef}
                  />
                </AlertDialogConponent>
              )}
            </div>
          </div>
        </div>
        <CommentForm establishmentId={Number(id)} />
        <CommentComponent establishment={selectedEstablishment} />
      </div>
    </LayoutPage>
  );
};

export default EstablishmentPage;
