import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { configureAwsProfile } from '@/services/awsCreds/credsInjector';
import { ConfigureAwsProfileRequest } from '@/types/creds.types';

interface CredsState {
  loading: boolean;
  error: string | null;
}

const initialState: CredsState = {
  loading: false,
  error: null,
};

export const configureAwsProfileThunk = createAsyncThunk<
  string,
  { projectId: string; data: ConfigureAwsProfileRequest },
  { rejectValue: string }
>(
  'creds/configureAwsProfile',
  async ({ projectId, data }, { rejectWithValue }) => {
    try {
      const response = await configureAwsProfile(projectId, data);
      return response.profile;
    } catch (error: unknown) {
      let message = 'Failed to configure AWS profile';
      if (error && typeof error === 'object' && 'response' in error && (error as { response?: { data?: { error?: string } } }).response?.data?.error) {
        message = (error as { response: { data: { error: string } } }).response.data.error;
      }
      return rejectWithValue(message);
    }
  }
);

const credsSlice = createSlice({
  name: 'creds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(configureAwsProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(configureAwsProfileThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(configureAwsProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to configure AWS profile';
      });
  },
});

export default credsSlice.reducer;