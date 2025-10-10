// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/Auth/loginSlice";
import signupReducer from "./slice/Auth/signUpSlice";
import userManagementReducer from "./slice/Auth/userManagementSlice";
import repoListReducer from "./slice/Github/repoListSlice";
import projectListReducer from "./slice/Projects/projectListByOwnerSlice";
import deploymentsReducer from "./slice/Deployements/deploymentSlice";
import spaceListReducer from "./slice/Projects/SpaceListSlice";
import credsReducer from "./slice/Creds/credsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    userManagement: userManagementReducer,
    repoList: repoListReducer,
    projectList: projectListReducer,
    deployments: deploymentsReducer,
    spaceList: spaceListReducer,
    creds: credsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
