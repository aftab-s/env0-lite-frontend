import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosPrivate from '@/config/axios';
import { apiEndpoints } from '@/config/api-endpoints';
import type { UserProfile, AuthRejectValue } from '@/types/auth.types';
import Cookies from 'js-cookie';

interface UserManagementState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserManagementState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk to fetch user profile by ID
export const getUserById = createAsyncThunk<
  UserProfile,
  void,
  { rejectValue: AuthRejectValue }
>("userManagement/getUserById", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate.get<UserProfile>(apiEndpoints.auth.getUserById);
    return response.data;
  } catch (error: unknown) {
    let message = 'Failed to fetch user';
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

// Async thunk to update user profile
export const updateUser = createAsyncThunk<
  UserProfile,
  Partial<UserProfile>,
  { rejectValue: AuthRejectValue }
>("userManagement/updateUser", async (updateData, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate.put<UserProfile>(apiEndpoints.auth.updateUserById, updateData);
    return response.data;
  } catch (error: unknown) {
    let message = 'Failed to update user';
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

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action: PayloadAction<AuthRejectValue | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.user = action.payload;
        // Update cookies with new name and email
        Cookies.set('name', action.payload.name);
        Cookies.set('email', action.payload.email);
      })
      .addCase(updateUser.rejected, (state, action: PayloadAction<AuthRejectValue | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update user';
      });
  },
});

export default userManagementSlice.reducer;