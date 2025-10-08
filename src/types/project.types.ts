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

	  projectName: string;
  tillnowtime: string;
  steps?: string;
  projectDescription?: string;
  csp?: string;
  repoUrl?: string;
  profile?: string;
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

export interface UpdateProjectRepoPayload {
  repoUrl: string;
  ownerName: string;
  branch: string;
}

export interface UpdateProjectRepoResponse {
  success: boolean;
  project?: ProjectWithTime;
  error?: string;
}

export interface Space {
  spaceId: string;
  spaceName: string;
  spaceDescription: string;
}

export interface CloneRepoResponse {
  success: boolean;
  spaces?: Space[];
  logs?: string;
  error?: string;
}
