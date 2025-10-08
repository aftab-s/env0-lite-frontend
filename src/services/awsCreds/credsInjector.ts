import axiosPrivate from '@/config/axios';
import { ConfigureAwsProfileResponse, ConfigureAwsProfileRequest } from '@/types/creds.types';

export const configureAwsProfile = async (
  projectId: string,
  data: ConfigureAwsProfileRequest
): Promise<ConfigureAwsProfileResponse> => {
  const response = await axiosPrivate.put<ConfigureAwsProfileResponse>(
    `/api/project/${projectId}/configure-aws-profile`,
    data
  );
  return response.data;
};