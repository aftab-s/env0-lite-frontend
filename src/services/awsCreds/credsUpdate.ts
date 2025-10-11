import axiosPrivate from '@/config/axios';
import { apiEndpoints } from '@/config/api-endpoints';
import type { ConfigureAwsProfileRequest, ConfigureAwsProfileResponse } from '@/types/creds.types';

/**
 * Updates AWS profile credentials for a project in the backend container.
 * @param projectId - The project ID
 * @param data - AWS credentials and region
 * @returns ConfigureAwsProfileResponse
 */
export const updateAwsProfile = async (
	projectId: string,
	data: ConfigureAwsProfileRequest
): Promise<ConfigureAwsProfileResponse> => {
	try {
		// Get endpoint and replace :projectId
		const endpoint = apiEndpoints.credsInjector.updateAWSProfile.replace(':projectId', projectId);
		const response = await axiosPrivate.put<ConfigureAwsProfileResponse>(
			endpoint,
			data
		);
		return response.data;
	} catch (error: unknown) {
		let message = 'Failed to update AWS profile';
		if (typeof error === 'string') {
			message = error;
		} else if (error && typeof error === 'object') {
			const errObj = error as { response?: { data?: { error?: string } }; message?: string };
			message = errObj.response?.data?.error || errObj.message || message;
		}
		return {
			success: false,
			message,
			profile: data.profileName,
		};
	}
};
