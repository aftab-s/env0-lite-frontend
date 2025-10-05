import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Deployment } from "@/types/deployment.types";
import { getDeployments } from "@/services/deployements/deploymentService";

interface DeploymentsState {
  list: Deployment[];
  loading: boolean;
  error: string | null;
}

const initialState: DeploymentsState = {
  list: [],
  loading: false,
  error: null,
};

// Async thunk to fetch deployments
export const fetchDeployments = createAsyncThunk(
  "deployments/fetchDeployments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDeployments();
      return response; // Deployment[]
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch deployments");
    }
  }
);

const deploymentsSlice = createSlice({
  name: "deployments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeployments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeployments.fulfilled, (state, action: PayloadAction<Deployment[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDeployments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default deploymentsSlice.reducer;
