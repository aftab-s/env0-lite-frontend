import axiosPrivate from '@/config/axios';
import { apiEndpoints } from '@/config/api-endpoints';

export interface SavePatResponse {
	message: string;
}

export async function saveGithubPAT(pat: string): Promise<SavePatResponse> {
	const response = await axiosPrivate.post<SavePatResponse>(
		apiEndpoints.github.savePat, // endpoint currently mapped to save PAT
		{ pat }
	);
	return response.data;
}
