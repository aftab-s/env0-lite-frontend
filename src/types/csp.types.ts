import { ProjectWithTime } from './project.types';

export interface UpdateCspRequest {
  csp: string;
}

export interface UpdateCspResponse {
  success: boolean;
  project: ProjectWithTime;
}