// slices/login.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axiosPrivate from "@/config/axios";
import { apiEndpoints } from "@/config/api-endpoints";
import {
  AuthState,
  LoginCredentials,
  LoginResponse,
  AuthRejectValue,
} from "@/types/auth.types";

const initialState: AuthState = {
  token: Cookies.get("token") || null,
  userId: null,
  username: null,
  role: null,
  email: null,
  githubPAT: null,
  onboardingCompleted: false,
  loading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: AuthRejectValue }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const { email, password } = credentials;
    const response = await axiosPrivate.post<LoginResponse>(
      apiEndpoints.auth.login,
      { email, password }
    );

    // Persist token (7 day expiry)
    Cookies.set("token", response.data.token, { expires: 7 });

    return response.data; // includes token + user info
  } catch (error: unknown) {
    let message = "Login failed";
    if (
      error &&
      typeof error === "object" &&
      // @ts-expect-error: optional chaining for axios style error shape
      error.response?.data?.error
    ) {
      // @ts-expect-error: axios error shape
      message = error.response.data.error as string;
    }
    return rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.username = null;
      state.role = null;
      state.email = null;
      state.githubPAT = null;
      state.onboardingCompleted = false;
      Cookies.remove("token"); // clear cookie
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.username = action.payload.username;
        state.role = action.payload.role;
        state.email = action.payload.email;
        state.githubPAT = action.payload.githubPAT;
        state.onboardingCompleted = action.payload.onboardingCompleted;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<AuthRejectValue | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
