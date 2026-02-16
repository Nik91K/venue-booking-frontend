import type { CreateUserError } from '@/types/error';

export const convertError = (error: any): CreateUserError => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = error.response;
    return {
      title: `Error ${response.status}`,
      message: response.data?.message || 'An error occurred',
      type: 'error',
    };
  }

  if (error instanceof TypeError && error.message.includes('fetch')) {
    return {
      title: 'Network Error',
      message:
        'Unable to connect to the server, please check your internet connection',
      type: 'error',
    };
  }

  if (error instanceof Error) {
    return {
      title: 'Error',
      message: error.message,
      type: 'error',
    };
  }

  return {
    title: 'Unknown Error',
    message: 'An unknown error has occurred',
    type: 'error',
  };
};
