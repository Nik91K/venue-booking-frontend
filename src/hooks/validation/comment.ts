export const validateCommentForm = (formData: {
  rating: number;
  text: string;
}) => {
  const error: Record<string, string> = {};

  if (formData.rating < 1) {
    error.rating = 'Select rating';
  }

  if (formData.rating > 5) {
    error.rating = 'Max rating 5';
  }

  if (formData.text.trim().length <= 2) {
    error.text = 'Enter more than 1 characters';
  }

  if (formData.text.trim().length > 600) {
    error.text = 'Enter less than 600 characters';
  }

  return error;
};
