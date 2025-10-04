import axiosPrivate from '@/config/axios';
import { apiEndpoints } from '@/config/api-endpoints';
import type { CreateProjectPayload, CreateProjectResponse } from '@/types/project.types';

export async function createProject(payload: CreateProjectPayload): Promise<CreateProjectResponse> {
	const response = await axiosPrivate.post<CreateProjectResponse>(
		apiEndpoints.project.createProject,
		payload
	);
	return response.data;
}
