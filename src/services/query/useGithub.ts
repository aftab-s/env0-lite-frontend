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

export async function fetchBranch(owner: string, repo: string): Promise<string[]> {
  // Placeholder implementation - replace with actual API call
  try {
    const apiBaseUrl = apiEndpoints.github;
    const response = await axiosPrivate.get(`${apiBaseUrl.getRepo}/${owner}/${repo}/branches`);
    return response.data.map((branch: any) => branch.name);
  } catch (error) {
    console.error('Error fetching branches:', error);
    return ['main', 'develop']; // Default branches
  }
}

export async function fetchRepoTree(params: FetchRepoTreeParams): Promise<RepoTreeNode[]> {
  // Placeholder implementation - replace with actual API call
  try {
    const { owner, repo, branch = 'main', pat } = params;
    const apiBaseUrl = apiEndpoints.github;
    const response = await axiosPrivate.get(`${apiBaseUrl.getRepo}/${owner}/${repo}/tree/${branch}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching repo tree:', error);
    // Return placeholder structure
    return [
      {
        id: '1',
        name: 'src',
        path: 'src',
        type: 'folder',
        children: [
          { id: '2', name: 'index.js', path: 'src/index.js', type: 'file' }
        ]
      },
      { id: '3', name: 'README.md', path: 'README.md', type: 'file' }
    ];
  }
}


