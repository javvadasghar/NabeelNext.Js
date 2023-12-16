import TextInput from "@/components/Form/TextInput";
import Image from "next/image";
import { FC } from "react";

const SignIn: FC = () => {
  return (
    <div className="p-4 flex flex-col gap-[100px]">
      <div className="bg-black border-2 border-bright-green p-2">
        <div className="text-center text-[30px] font-bold italic tracking-wider mb-4">
          - MEMBER SIGN IN -
        </div>

        <div className="flex gap-4 mb-6">
          <TextInput label="USERNAME:" className="w-full" />
          <TextInput label="PASSWORD:" type="password" className="w-full" />
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-dark-green text-black rounded-[50%] px-[50px] py-[10px] font-bold text-[24px] italic">
            Forgot Your Password or Username?
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-[100px]">
        <div className="border-2 border-bright-green bg-black rounded-[50%] px-[200px] py-[10px] text-center flex flex-col items-center">
          <div className="italic text-[24px] font-bold">Not a Member ?</div>
          <div className="italic text-[24px] font-bold">
            Click here to Sign Up . . .
          </div>
          <div className="italic text-[24px] font-bold">
            It&apos;s Qucik, Free & Easy !
          </div>

          <Image
            src="/images/underline.png"
            alt="underline"
            width={160}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
