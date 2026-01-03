import LayoutPage from '@/layoutPage';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { getEstablishmentById } from '@/api/slices/establishmentSlice';
import { getEstablishmentComments } from '@/api/slices/establishmentSlice';
import { useAppSelector, useAppDispatch } from '@/api/hooks';
import AlertDialogConponent from '@/components/common/AlertDialog';
import { ArrowLeft, Clock, Heart, MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const EstablishmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  const { loading, selectedEstablishment, error } = useAppSelector(
    state => state.establishment
  );
  const { user } = useAppSelector(state => state.auth);

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

  const handleBooking = () => {
    console.log('Booking for:', establishment?.name);
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
          <p className="text-lg text-gray-600">Establishment not found</p>
          <Button onClick={() => navigate('/establishments')}>
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
      <div className="py-6 space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200">
            <img
              src={establishment.coverPhoto}
              alt={establishment.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-3xl font-bold text-white-900">
                  {establishment.name}
                </h1>
                <Badge variant="secondary" className="mt-2">
                  badge
                </Badge>
              </div>
              <button
                onClick={toggleFavorite}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                aria-label="Add to favorites"
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg">
                  {establishment.rating}
                </span>
                <span>({establishment.reviews} reviews)</span>
              </div>
            </div>
            <p className="text-white-700 leading-relaxed">
              {establishment.description}
            </p>
          </div>
          <Separator />
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                {/* <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">{establishment.address}</p>
                  <p className="text-sm text-gray-500">
                    {establishment.locationDetails.street},{' '}
                    {establishment.locationDetails.building}
                    {establishment.locationDetails.zipCode &&
                      `, ${establishment.locationDetails.zipCode}`}
                  </p> */}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 shrink-0 mt-0.5" />
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
            {user?.role === 'GUEST' ? (
              <AlertDialogConponent
                triggerText="Book Now"
                title="Login Required"
                description="You need to be logged in to make a reservation. Please log in or create an account to continue."
                actionText="Go to Login"
                onAction={handleLogin}
              />
            ) : (
              <Button size="lg" className="w-full" onClick={handleBooking}>
                Book Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default EstablishmentPage;
