// Centralized authentication-related TypeScript types for reuse across slices & services

// Credentials supplied by the user when logging in
export interface LoginCredentials {
	email: string;
	password: string;
}

// Credentials for user signup
export interface SignupCredentials {
	name: string;
	email: string;
	password: string;
	role: string; // e.g. 'user' | 'admin'
}

// Expected shape of a successful login response from the backend
export interface LoginResponse {
	token: string;
	userId: string;
	username: string;
	role: string;
	email: string;
	githubPAT: string | null;
	onboardingCompleted: boolean;
	isProjectThere: string;
}

// Response returned by backend after successful signup (no token here)
export interface SignupResponse {
	userId: string;
	username: string;
	name: string;
	email: string;
	role: string;
	status: string; // e.g. 'active' or pending status
	githubPAT: string | null;
	onboardingCompleted: boolean;
}

// State for signup flow (separate from auth/login state)
export interface SignupState {
	loading: boolean;
	error: string | null;
	success: boolean;
	user: SignupResponse | null;
}

// Redux slice state for authentication (token-bearing state)
export interface AuthState {
	token: string | null;
	userId: string | null;
	username: string | null;
	role: string | null;
	email: string | null;
	githubPAT: string | null;
	onboardingCompleted: boolean;
	isProjectThere: string | null;
	loading: boolean;
	error: string | null;
}

// The rejection (error) value we standardize on for async thunks
export type AuthRejectValue = string;

