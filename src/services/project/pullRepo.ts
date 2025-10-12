import axiosPrivate from "@/config/axios";
import { apiEndpoints } from "@/config/api-endpoints";
import { CloneRepoResponse } from "@/types/project.types";

/**
 * Calls backend to hard reset repo to remote main and sync spaces
 * Endpoint: PUT /api/project/:projectId/reset-branch
 */
	export async function resetBranchAndSyncSpaces(
		projectId: string
	): Promise<CloneRepoResponse> {
	try {
		// Get endpoint and replace :projectId
		const endpoint = apiEndpoints.project.pullInjector.replace(':projectId', projectId);
		const response = await axiosPrivate.put<CloneRepoResponse>(endpoint);
		// Backend may return additional fields like message, added, removed.
		// We only surface the typed fields defined in CloneRepoResponse.
		return response.data;
	} catch (error: unknown) {
		let message = "Failed to reset branch";
		if (typeof error === "string") {
			message = error;
		} else if (error && typeof error === "object") {
			const errObj = error as { response?: { data?: { error?: string } }; message?: string };
			message = errObj.response?.data?.error || errObj.message || message;
		}
		return { success: false, error: message };
	}
}

export default resetBranchAndSyncSpaces;

