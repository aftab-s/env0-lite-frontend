export interface DeploymentStep {
  step: string;
  stepStatus: "successful" | "failed" | string; // in case other statuses exist
  message: string;
  timestamp: string;
  _id: string;
}

export interface Deployment {
  _id: string;
  deploymentId: string;
  projectId: string;
  spaceId: string;
  deploymentName: string;
  steps: DeploymentStep[];
  startedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TerraformCommandResponse {
  command: string;
  deploymentId: string;
  deploymentName: string;
  exitCode: number;
  stdout: string;
  stderr: string;
  summary: string | null;
}

export interface TerraformPlanResponse {
  stepName: string;            
  rawFormat: string;          
  data: unknown | null;         
  exitCode: number;            
  stderr: string;              
}

export interface TerraformApplySummary {
  toAdd: number;
  toChange: number;
  toDestroy: number;
}

export interface TerraformApplyResponse {
  command: string;   
  exitCode: number;     
  stdout: string;      
  stderr: string;       
  summary: TerraformApplySummary | null;
}


export type DeploymentsResponse = Deployment[];
