import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosPrivate from '@/config/axios';
import { apiEndpoints } from '@/config/api-endpoints';

// Async thunk to update user password
export const updatePassword = createAsyncThunk<
  { message: string },
  { oldPassword: string; newPassword: string },
  { rejectValue: string }
>("auth/updatePassword", async ({ oldPassword, newPassword }, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate.put<{ message: string }>(apiEndpoints.auth.updatePassword, {
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (error: unknown) {
    let message = 'Failed to update password';
    if (
      error &&
      typeof error === 'object' &&
      // @ts-expect-error axios error shape
      error.response?.data?.error
    ) {
      // @ts-expect-error axios error shape
      message = error.response.data.error as string;
    }
    return rejectWithValue(message);
  }
});