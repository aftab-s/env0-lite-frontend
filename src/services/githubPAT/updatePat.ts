import axiosPrivate from '@/config/axios';

export const updatePAT = async (pat: string): Promise<{ message: string }> => {
  try {
    const response = await axiosPrivate.put<{ message: string }>('/api/github-pat/update-pat', { pat });
    return response.data;
  } catch (error: unknown) {
    let message = 'Failed to update PAT';
    if (
      error &&
      typeof error === 'object' &&
      // @ts-expect-error axios error shape
      error.response?.data?.error
    ) {
      // @ts-expect-error axios error shape
      message = error.response.data.error as string;
    }
    throw new Error(message);
  }
};