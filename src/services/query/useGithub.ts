import { apiEndpoints } from "@/config";
import axiosPrivate from "@/config/axios";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

export type RepoTreeNode = {
  id: string;
  name: string;
  path: string;
  type: "file" | "folder";
  children?: RepoTreeNode[];
};

interface FetchRepoTreeParams {
  email: string;
  owner: string;
  repo: string;
  branch?: string; // optional, defaults to "main"
}


export async function fetchUserRepos(email: string,): Promise<Repo[]> {
  const apiBaseUrl = apiEndpoints.github;

  const response = await axiosPrivate.get(`${apiBaseUrl.getRepo}/${email}`,);

  return response.data;
}

export async function fetchRepoTree({
  email,
  owner,
  repo,
  branch = "main",
}: FetchRepoTreeParams): Promise<RepoTreeNode[]> {
  const apiBaseUrl = apiEndpoints.github;

  const url = `${apiBaseUrl.getTree}/${email}/${owner}/${repo}/tree`;
  
  const response = await axiosPrivate.get(url, {
    params: { ref: branch }, 
  });


  return response.data;
}
