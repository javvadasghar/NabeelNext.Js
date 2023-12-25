import TextInput from "@/components/Form/TextInput";
import { FC } from "react";

const SignInAdmin: FC = () => {
  return (
    <div className="p-4 flex flex-col gap-[100px]">
      <div className="bg-black border-2 border-bright-green p-2">
        <div className="text-center text-[30px] font-bold italic tracking-wider mb-4">
          - ADMIN SIGN IN -
        </div>

        <div className="flex gap-4 mb-6">
          <TextInput label="USERNAME:" className="w-full" />
          <TextInput label="PASSWORD:" type="password" className="w-full" />
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-dark-green text-black rounded-[50%] px-[50px] py-[10px] font-bold text-[24px] italic">
            Sign in
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInAdmin;
