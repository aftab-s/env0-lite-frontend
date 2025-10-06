import axiosPrivate from '@/config/axios';
import { apiEndpoints } from '@/config/api-endpoints';
import { DeploymentsResponse, TerraformApplyResponse, TerraformCommandResponse, TerraformPlanResponse } from '@/types/deployment.types';

const apiBaseUrl = apiEndpoints.deployment;
export async function getDeployments(): Promise<DeploymentsResponse> {
	const response = await axiosPrivate.get<DeploymentsResponse>(
		apiEndpoints.deployment.getDeployments,
	);
	return response.data;
}

export async function terraformInit(projectId: string, spaceName: string, deploymentId: string): Promise<TerraformCommandResponse> {
	const response = await axiosPrivate.post(`${apiBaseUrl.terraform}/${projectId}/init`, {spaceName, deploymentId});
	return response.data;
}

export async function terraformPlan(projectId: string, spaceName: string, deploymentId: string): Promise<TerraformPlanResponse> {
	const response = await axiosPrivate.post(`${apiBaseUrl.terraform}/${projectId}/plan`, {spaceName, deploymentId});
	return response.data;
}

export async function terraformApply(projectId: string, spaceName: string, deploymentId: string): Promise<TerraformApplyResponse> {
    const response = await axiosPrivate.post(`${apiBaseUrl.terraform}/${projectId}/apply`, {spaceName, deploymentId});
    return response.data;
}
