export interface CreateProjectPayload {
	projectName: string;
	projectDescription?: string;
}

export interface ProjectEntity {
	id: string;
	_id?: string;
	projectId: string;
	projectName: string;
	projectDescription?: string;
	ownerId: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface ProjectWithTime extends ProjectEntity {
	tillnowtime: string;
	steps: string;
}

export interface CreateProjectResponse {
	success: boolean;
	project: ProjectEntity;
}

export interface CreateProjectErrorResponse {
	success: false;
	error: string;
}

export interface GetProjectsByOwnerResponse {
	success: boolean;
	projects: ProjectWithTime[];
}

export interface GetProjectsByOwnerErrorResponse {
	success: false;
	error: string;
}
