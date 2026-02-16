import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { clearError } from '@api/slices/errorSlice';
import { useEffect } from 'react';
import { X } from 'lucide-react';

const ErrorComponent = () => {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors.list);

  useEffect(() => {
    const timers = errors
      .filter(error => error.type !== 'error')
      .map(error =>
        setTimeout(() => {
          dispatch(clearError(error.id));
        }, 5000)
      );

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [errors, dispatch]);

  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 space-y-3 z-50 w-96 max-w-[calc(100vw-2rem)]">
      {errors.map((error, index) => (
        <Alert
          key={index}
          variant={error.type === 'error' ? 'destructive' : 'default'}
          className="flex gap-2 animate-in slide-in-from-right duration-300 shadow-lg"
        >
          <button
            onClick={() => dispatch(clearError(error.id))}
            className="shrink-0 rounded-sm opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 p-1"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
          <div>
            <AlertTitle>{error.title}</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </div>
        </Alert>
      ))}
    </div>
  );
};

export default ErrorComponent;
