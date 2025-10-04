// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/Auth/loginSlice";
import signupReducer from "./slice/Auth/signUpSlice";
import repoListReducer from "./slice/Github/repoListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    repoList: repoListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
