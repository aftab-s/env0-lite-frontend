import axiosPrivate from '@/config/axios';
import { GetSpacesResponse } from '@/types/space.types';

export const getSpacesByProjectId = async (projectId: string): Promise<GetSpacesResponse> => {
  const response = await axiosPrivate.get<GetSpacesResponse>(`/api/project/${projectId}/spaces`);
  return response.data;
};