// slices/projectListByOwner.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosPrivate from "@/config/axios";
import { apiEndpoints } from "@/config/api-endpoints";
import {
  GetProjectsByOwnerResponse,
  GetProjectsByOwnerErrorResponse,
  ProjectWithTime,
  UpdateProjectRepoPayload,
  UpdateProjectRepoResponse,
} from "@/types/project.types";
import { updateProjectRepo } from "@/services/project/addRepo";

interface ProjectListState {
  projects: ProjectWithTime[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectListState = {
  projects: [],
  loading: false,
  error: null,
};

// Async thunk for getting projects by owner
export const getProjectsByOwner = createAsyncThunk<
  GetProjectsByOwnerResponse,
  void,
  { rejectValue: GetProjectsByOwnerErrorResponse }
>("projects/getProjectsByOwner", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate.get<GetProjectsByOwnerResponse>(
      apiEndpoints.project.getProjectByOwner
    );
    return response.data;
  } catch (error: unknown) {
    let message = "Failed to fetch projects";
    if (
      error &&
      typeof error === "object" &&
      // @ts-expect-error: optional chaining for axios style error shape
      error.response?.data?.error
    ) {
      // @ts-expect-error: axios error shape
      message = error.response.data.error as string;
    }
    return rejectWithValue({ success: false, error: message });
  }
});

// Async thunk for updating project repo
export const updateProjectRepoThunk = createAsyncThunk<
  UpdateProjectRepoResponse,
  { projectId: string; payload: UpdateProjectRepoPayload },
  { rejectValue: { success: false; error: string } }
>("projects/updateProjectRepo", async ({ projectId, payload }, { rejectWithValue }) => {
  try {
    const response = await updateProjectRepo(projectId, payload);
    return response;
  } catch (error: unknown) {
    let message = "Failed to update project repo";
    if (
      error &&
      typeof error === "object" &&
      // @ts-expect-error: axios error shape
      error.response?.data?.error
    ) {
      // @ts-expect-error: axios error shape
      message = error.response.data.error as string;
    }
    return rejectWithValue({ success: false, error: message });
  }
});

const projectListSlice = createSlice({
  name: "projectList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectsByOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjectsByOwner.fulfilled, (state, action: PayloadAction<GetProjectsByOwnerResponse>) => {
        state.loading = false;
        state.projects = action.payload.projects;
      })
      .addCase(getProjectsByOwner.rejected, (state, action: PayloadAction<GetProjectsByOwnerErrorResponse | undefined>) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to fetch projects";
      })
      .addCase(updateProjectRepoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectRepoThunk.fulfilled, (state, action: PayloadAction<UpdateProjectRepoResponse>) => {
        state.loading = false;
        if (action.payload.project) {
          const index = state.projects.findIndex(p => p.projectId === action.payload.project!.projectId);
          if (index !== -1) {
            state.projects[index] = action.payload.project;
          }
        }
      })
      .addCase(updateProjectRepoThunk.rejected, (state, action: PayloadAction<{ success: false; error: string } | undefined>) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to update project repo";
      });
  },
});

export default projectListSlice.reducer;
