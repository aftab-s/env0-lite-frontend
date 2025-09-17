import { useMutation } from "@tanstack/react-query";
import { apiEndpoints } from "@/config";
import axiosPrivate from "@/config/axios";

interface SignInParams {
  email: string;
  password: string;
}

interface SignInResponse {
  token: string;
  user: { id: string; name: string };
}

export const useAuthentication = () => {
  const apiBaseUrl = apiEndpoints.auth;

  const signInMutation = useMutation<SignInResponse, Error, SignInParams>({
    mutationFn: async (params: SignInParams) => {
      return axiosPrivate.post(apiBaseUrl.login, params).then(res => res.data.Data);
    },
  });

  return { signInMutation };
};
