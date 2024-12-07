import { Button } from "../../../components/Button";
import Card from "../../../components/Card";
import { Input } from "../../../components/Input";
import { useSignin } from "./useSignin";

const SigninContainer = () => {
  const { get, on } = useSignin();
  return (
    <main className="flex  flex-col gap-8 justify-center items-center h-screen bg-[#f9fafb]">
      <h1 className="text-3xl font-extrabold">bettermode</h1>
      <Card className="max-w-md gap-7 pb-7">
        <form onSubmit={on.handleSignin} className="w-full flex flex-col gap-5">
          <label className="text-sm font-medium text-gray-900">Email</label>
          <Input
            className="mt-3"
            onChange={on.handleInputChange}
            value={get.email}
          />
          <Button className="w-full" type="submit" loading={get.loading}>
            <span className="text-white">Sign in with email</span>
          </Button>
        </form>
      </Card>
    </main>
  );
};

export default SigninContainer;
