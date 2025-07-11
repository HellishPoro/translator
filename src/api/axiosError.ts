import axios from 'axios';

export const axiosError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError<{ errorMessage: string }>(error) && error.response) {
    return {
      message: error.response?.data?.errorMessage || defaultMessage,
      code: error.response.status,
    };
  } else {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: defaultMessage,
      };
    }
  }
};
