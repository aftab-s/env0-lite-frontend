import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSpacesByProjectId } from '@/services/space/spaceService';
import { Space } from '@/types/space.types';

interface SpaceListState {
  spaces: Space[];
  loading: boolean;
  error: string | null;
}

const initialState: SpaceListState = {
  spaces: [],
  loading: false,
  error: null,
};

export const getSpacesByProjectIdThunk = createAsyncThunk<
  Space[],
  string,
  { rejectValue: string }
>(
  'spaces/getSpacesByProjectId',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await getSpacesByProjectId(projectId);
      return response.spaces;
    } catch (error: unknown) {
      let message = 'Failed to fetch spaces';
      if (error && typeof error === 'object' && 'response' in error && (error as { response?: { data?: { error?: string } } }).response?.data?.error) {
        message = (error as { response: { data: { error: string } } }).response.data.error;
      }
      return rejectWithValue(message);
    }
  }
);

const spaceListSlice = createSlice({
  name: 'spaceList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSpacesByProjectIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpacesByProjectIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.spaces = action.payload;
      })
      .addCase(getSpacesByProjectIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch spaces';
      });
  },
});

export default spaceListSlice.reducer;