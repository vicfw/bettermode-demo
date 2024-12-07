import { useState } from "react";
import { useSigninMutation } from "../../../hooks/SigninMutation";
import { useNavigate } from "react-router";

export const useSignin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const { loading, signinMutation } = useSigninMutation();

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signinMutation({
        variables: {
          input: {
            email,
            captchaToken: "",
          },
        },
      });
      navigate(`/auth/verify?email=${email}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return { get: { email, loading }, on: { handleInputChange, handleSignin } };
};
