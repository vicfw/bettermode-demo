import { useState } from "react";
import { API_URL } from "../constants";

export const useVerifySignin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const verifySignin = async (body: {
    email: string;
    verificationCode: string;
  }) => {
    try {
      setLoading(true);
      const result = await fetch("https://app.bettermode.com/api/auth/signin", {
        body: JSON.stringify(body),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await result.json();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e);
      }
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return { verifySignin, loading, error };
};
