import { useSearchParams } from "react-router";
import { Button } from "../../../components/Button";
import Card from "../../../components/Card";
import { OTPInput } from "../../../components/OTPInput/OTPInput";
import { useVerifySignin } from "../../../hooks/VerifySignin";

const VerifyContainer = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

  const { loading, verifySignin } = useVerifySignin();
  const onComplete = (otpValue: string) => {
    verifySignin({ email, verificationCode: otpValue });
  };

  return (
    <main className="flex  flex-col gap-8 justify-center items-center h-screen bg-[#f9fafb]">
      <h1 className="text-3xl font-bold">Check your email for a code</h1>
      <Card className="max-w-md gap-7 pb-7">
        <OTPInput onComplete={onComplete} />
        <Button className="w-full" loading={loading}>
          <span className="text-white">Continue</span>
        </Button>
      </Card>
      <span className="text-center text-sm text-neutral-500">
        Can’t find your code? Check your spam folder!
      </span>
    </main>
  );
};

export default VerifyContainer;
