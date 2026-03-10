import { useAppDispatch, useAppSelector } from '@api/hooks';
import { clearError } from '@api/slices/errorSlice';
import { useEffect } from 'react';
import { toast } from 'sonner';

const ErrorComponent = () => {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors.list);

  useEffect(() => {
    errors.forEach(error => {
      if (error.type === 'error') {
        toast.error(error.title, {
          description: error.message,
        });
      } else {
        toast.success(error.title, {
          description: error.message,
        });
      }

      dispatch(clearError(error.id));
    });
  }, [errors, dispatch]);

  return null;
};

export default ErrorComponent;
