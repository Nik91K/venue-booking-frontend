import { useAppDispatch, useAppSelector } from '@api/hooks';
import { clearAllErrors } from '@api/slices/errorSlice';
import { useEffect } from 'react';
import { toast } from 'sonner';

const ErrorComponent = () => {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors.list);

  useEffect(() => {
    if (errors.length > 0) {
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
      });

      dispatch(clearAllErrors());
    }
  }, [errors, dispatch]);

  return null;
};

export default ErrorComponent;
