export interface Space {
  spaceId: string;
  spaceName: string;
  status: string;
  lastRun: Date | null;
  userId: string;
  userName: string;
}

export interface GetSpacesResponse {
  success: boolean;
  spaces: Space[];
}

export interface GetSpacesErrorResponse {
  success: false;
  error: string;
}