import { apiEndpoints } from "@/config";
import axiosPrivate from "@/config/axios";

interface LogInParams {
  email: string;
  password: string;
}

interface SignInParams {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface AuthSignInParams {
  name: string;
  email: string;
  role: string;
  password: string
}

interface SignInResponse {
  email: string;
  role: string;
  name: string
}

interface SignInByEmailResponse { 
    name: string,
    email: string,
    role: string,
}

export async function logIn(params: LogInParams): Promise<SignInResponse> {
  const apiBaseUrl = apiEndpoints.auth;

  const response = await axiosPrivate.post(apiBaseUrl.login, params);
  return response.data;
}

export async function signIn(params: SignInParams): Promise<SignInResponse> {
  const apiBaseUrl = apiEndpoints.auth;

  const response = await axiosPrivate.post(apiBaseUrl.signUp, params);
  return response.data;
}

export async function authSignIn(params: AuthSignInParams): Promise<SignInResponse> {
  const apiBaseUrl = apiEndpoints.auth;

  const response = await axiosPrivate.post(apiBaseUrl.signUp, params);
  return response.data;
}

export const checkUserByEmail = async ({ email }: { email: string }) => {
  const apiBaseUrl = apiEndpoints.auth;

  try {
  } catch (err: any) {
    
    if (err.response?.status === 404) {
      return null;
    }
    throw err;
  }
}

