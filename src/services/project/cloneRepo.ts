import axiosPrivate from '@/config/axios';
import { apiEndpoints } from '@/config/api-endpoints';
import type { CloneRepoResponse } from '@/types/project.types';

export async function cloneRepoAndCreateSpaces(projectId: string): Promise<CloneRepoResponse> {
  const response = await axiosPrivate.post<CloneRepoResponse>(
    apiEndpoints.project.clonetoContainer.replace(':projectId', projectId)
  );
  return response.data;
}
