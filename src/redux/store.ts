// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/Auth/loginSlice";
import signupReducer from "./slice/Auth/signUpSlice";
import repoListReducer from "./slice/Github/repoListSlice";
import projectListReducer from "./slice/Projects/projectListByOwnerSlice";
import deploymentsReducer from "./slice/Deployements/deploymentSlice";
import spaceListReducer from "./slice/Projects/SpaceListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    repoList: repoListReducer,
    projectList: projectListReducer,
    deployments: deploymentsReducer,
    spaceList: spaceListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
