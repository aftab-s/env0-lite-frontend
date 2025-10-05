import axiosPrivate from '@/config/axios';
import { UpdateCspResponse } from '@/types/csp.types';

export const updateProjectCsp = async (projectId: string, csp: string): Promise<UpdateCspResponse> => {
  const response = await axiosPrivate.put<UpdateCspResponse>(`/api/project/${projectId}/csp`, { csp });
  return response.data;
};