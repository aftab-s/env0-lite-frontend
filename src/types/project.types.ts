export interface CreateProjectPayload {
	projectName: string;
	projectDescription?: string;
}

export interface ProjectEntity {
	id: string;
	projectName: string;
	projectDescription?: string;
	ownerId: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface CreateProjectResponse {
	success: boolean;
	project: ProjectEntity;
}

export interface CreateProjectErrorResponse {
	success: false;
	error: string;
}
