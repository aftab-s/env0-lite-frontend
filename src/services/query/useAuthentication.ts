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
  email: string;
  role: string;
  password: string
}

interface SignInResponse {
  token: string;
  user: { id: string; name: string };
}

interface SignInByEmailResponse {
    userId: string,
    username: string,
    name: string,
    email: string,
    role: string,
    createdAt: string,
    updatedAt: string,
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

export async function checkUserByEmail(params: {email: string}): Promise<SignInByEmailResponse> {
  const apiBaseUrl = apiEndpoints.auth;

  const response = await axiosPrivate.post(apiBaseUrl.byEmail, params);
  return response.data;
}
