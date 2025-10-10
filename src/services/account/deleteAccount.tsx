import axiosPrivate from '@/config/axios';

// Service to hard delete user account
export const deleteAccount = async (): Promise<{ message: string; userId: string }> => {
  try {
    const response = await axiosPrivate.delete<{ message: string; userId: string }>('/api/users/delete-hard');
    return response.data;
  } catch (error: unknown) {
    let message = 'Failed to delete account';
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