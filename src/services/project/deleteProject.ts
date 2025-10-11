import axiosPrivate from '@/config/axios';
import { apiEndpoints } from '@/config/api-endpoints';

export const deleteProject = async (projectId: string): Promise<{ success: boolean; message: string }> => {
  try {
    const url = apiEndpoints.project.deleteProject.replace(':projectId', projectId);
    const response = await axiosPrivate.delete<{ success: boolean; message: string }>(url);
    return response.data;
  } catch (error: unknown) {
    let message = 'Failed to delete project';
    if (
      error &&
      typeof error === 'object' &&
      // @ts-expect-error axios error shape
      error.response?.data?.error
    ) {
      // @ts-expect-error axios error shape
      message = error.response.data.error as string;
    }
    throw new Error(message);
  }
};