import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosPrivate from '@/config/axios';
import { apiEndpoints } from '@/config/api-endpoints';
import type { SignupCredentials, SignupResponse, SignupState, AuthRejectValue } from '@/types/auth.types';

const initialState: SignupState = {
  loading: false,
  error: null,
  success: false,
  user: null,
};

export const signupUser = createAsyncThunk<
  SignupResponse,
  SignupCredentials,
  { rejectValue: AuthRejectValue }
>("auth/signupUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate.post<SignupResponse>(apiEndpoints.auth.signUp, data);
    return response.data;
  } catch (error: unknown) {
    let message = 'Signup failed';
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

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    resetSignupState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<SignupResponse>) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action: PayloadAction<AuthRejectValue | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Signup failed';
      });
  },
});

export const { resetSignupState } = signupSlice.actions;
export default signupSlice.reducer;