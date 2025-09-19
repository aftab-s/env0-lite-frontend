// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string | null;
  role: string | null;
}

const initialState: AuthState = {
  email: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    clearUser: (state: AuthState) => {
      state.email = null;
      state.role = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
