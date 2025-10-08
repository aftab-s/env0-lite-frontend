import axiosPrivate from '@/config/axios';
import { apiEndpoints } from '@/config/api-endpoints';
import type { UpdateProjectRepoPayload, UpdateProjectRepoResponse } from '@/types/project.types';

export async function updateProjectRepo(projectId: string, payload: UpdateProjectRepoPayload): Promise<UpdateProjectRepoResponse> {
  const response = await axiosPrivate.put<UpdateProjectRepoResponse>(
    apiEndpoints.project.repoInsert.replace(':projectId', projectId),
    payload
  );
  return response.data;
}