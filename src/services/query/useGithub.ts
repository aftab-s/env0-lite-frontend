import { apiEndpoints } from "@/config";
import axiosPrivate from "@/config/axios";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  owner: string;
}

export type RepoTreeNode = {
  id: string;
  name: string;
  path: string;
  type: "file" | "folder";
  children?: RepoTreeNode[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface FetchRepoTreeParams {
  owner: string;
  repo: string;
  branch?: string; // optional, defaults to "main"
  pat?: string;
}


export async function fetchUserRepos(pat:string): Promise<Repo[]> {
  const apiBaseUrl = apiEndpoints.github;
  
  const response = await axiosPrivate.get(`${apiBaseUrl.getRepo}/${pat}`,);

  return response.data;
}


