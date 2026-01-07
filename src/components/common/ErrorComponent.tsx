import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAppDispatch, useAppSelector } from '@/api/hooks';
import { clearErrors } from '@/api/slices/errorSlice';

const ErrorComponent = () => {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.errors.list);

  if (errors.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-3 z-50 w-90">
      {errors.map((error, index) => (
        <Alert key={index} variant="destructive">
          <AlertTitle>{error.title}</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>

          <button
            onClick={() => dispatch(clearErrors())}
            className="mt-2 text-sm underline"
          >
            Close
          </button>
        </Alert>
      ))}
    </div>
  );
};

export default ErrorComponent;
