export interface RepoBranchesItem {
	name: string;
}

export interface RepositoryItem {
	name: string;
	owner: string | null;
	branches: string[]; // just names per backend response mapping
}

export interface RepoListState {
	items: RepositoryItem[];
	loading: boolean;
	error: string | null;
}

export type RepoListReject = string;
