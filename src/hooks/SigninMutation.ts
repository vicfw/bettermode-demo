import { useMutation } from "@apollo/client";
import { API_URL } from "../constants";
import { SIGNIN } from "../graphql/mutation/signup.graphql";

export const useSigninMutation = () => {
  const [signinMutation, { loading }] = useMutation(SIGNIN, {
    context: {
      uri: `${API_URL}/global`,
    },
  });

  return { signinMutation, loading };
};
