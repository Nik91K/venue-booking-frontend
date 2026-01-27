import { Heart } from 'lucide-react';
import { useState } from 'react';
import { addFavorite, removeFavorite } from '@/api/slices/establishmentSlice';
import type { Role } from '@/types/common';
import { useAppDispatch } from '@/api/hooks';
import { addError } from '@/api/slices/errorSlice';
import { convertError } from '@/hooks/logger/errorConverter';

type FavoriteButtonProps = {
  establishmentId?: number;
  role: Role;
  className?: string;
};

const FavoriteButton = ({
  establishmentId,
  role,
  className,
}: FavoriteButtonProps) => {
  const dispatch = useAppDispatch();

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (role === 'GUEST') {
      return;
    }

    if (!establishmentId) {
      dispatch(
        addError({
          title: 'Error',
          message: 'Establishment ID is missing.',
          type: 'error',
        })
      );
      return;
    }

    try {
      if (isFavorite) {
        dispatch(removeFavorite(establishmentId));
      } else {
        dispatch(addFavorite(establishmentId));
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      dispatch(addError(convertError(error)));
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={role === 'GUEST' ? 'hidden' : className}
      aria-label="Add to favorites"
    >
      <Heart
        className={`w-5 h-5 transition-colors ${
          isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
        }`}
      />
    </button>
  );
};

export default FavoriteButton;
