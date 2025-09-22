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

export async function fetchRepoTree({
  owner,
  repo,
  branch = "main",
  pat
}: FetchRepoTreeParams): Promise<RepoTreeNode[]> {
  const apiBaseUrl = apiEndpoints.github;

  const url = `${apiBaseUrl.getTree}/${owner}/${repo}/${pat}/tree`;
  
  const response = await axiosPrivate.get(url, {
    params: { ref: branch }, 
  });


  return response.data;
}

export async function fetchBranch({
  owner,
  repo,
  pat
}: FetchRepoTreeParams): Promise<RepoTreeNode[]> {
  const apiBaseUrl = apiEndpoints.github;

  
  const response = await axiosPrivate.post(apiBaseUrl.getBranch, {owner, repo, pat });
  return response.data;
}
