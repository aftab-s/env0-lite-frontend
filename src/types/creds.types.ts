export interface ConfigureAwsProfileRequest {
  profileName: string;
  accessKeyId: string;
  secretAccessKey: string;
  region?: string;
}

export interface ConfigureAwsProfileResponse {
  success: boolean;
  message: string;
  profile: string;
}