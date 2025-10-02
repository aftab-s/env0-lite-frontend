import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosPrivate from '@/config/axios';
import { apiEndpoints } from '@/config/api-endpoints';
import type { RepoListState, RepositoryItem, RepoListReject } from '@/types/repo.types';

const initialState: RepoListState = {
	items: [],
	loading: false,
	error: null,
};

export const fetchRepositories = createAsyncThunk<
	RepositoryItem[],
	void,
	{ rejectValue: RepoListReject }
>('github/fetchRepositories', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosPrivate.get<RepositoryItem[]>(apiEndpoints.github.getRepo);
		return response.data;
	} catch (e: unknown) {
		let msg = 'Failed to fetch repositories';
		if (
			e &&
			typeof e === 'object' &&
			// @ts-expect-error axios
			e.response?.data?.error
		) {
			// @ts-expect-error axios
			msg = e.response.data.error as string;
		}
		return rejectWithValue(msg);
	}
});

const repoListSlice = createSlice({
	name: 'repoList',
	initialState,
	reducers: {
		clearRepoList: (state) => {
			state.items = [];
			state.error = null;
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRepositories.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchRepositories.fulfilled, (state, action: PayloadAction<RepositoryItem[]>) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchRepositories.rejected, (state, action: PayloadAction<RepoListReject | undefined>) => {
				state.loading = false;
				state.error = action.payload || 'Failed to fetch repositories';
			});
	},
});

export const { clearRepoList } = repoListSlice.actions;
export default repoListSlice.reducer;
