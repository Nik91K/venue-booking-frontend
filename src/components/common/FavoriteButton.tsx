import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { addFavorite, removeFavorite } from '@api/slices/establishmentSlice';
import type { Role } from '@/types/common';
import { useAppDispatch } from '@api/hooks';
import { addError } from '@api/slices/errorSlice';
import { convertError } from '@hooks/logger/errorConverter';

type FavoriteButtonProps = {
  establishmentId?: number;
  role: Role;
  className?: string;
  isFavorite?: boolean;
};

const FavoriteButton = ({
  establishmentId,
  role,
  className,
  isFavorite: initialIsFavorite = false,
}: FavoriteButtonProps) => {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (role === 'GUEST' || !establishmentId || isLoading) return;

    setIsLoading(true);

    try {
      if (isFavorite) {
        await dispatch(removeFavorite(establishmentId)).unwrap();
      } else {
        await dispatch(addFavorite(establishmentId)).unwrap();
      }
    } catch (error) {
      dispatch(addError(convertError(error)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className={role === 'GUEST' ? 'hidden' : className}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      disabled={isLoading}
    >
      <Heart
        className={`w-5 h-5 transition-colors ${
          isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
        } ${isLoading ? 'opacity-50' : ''}`}
      />
    </button>
  );
};

export default FavoriteButton;
