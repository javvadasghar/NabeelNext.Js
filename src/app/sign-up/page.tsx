import TextInput from "@/components/Form/TextInput";
import Image from "next/image";
import { FC } from "react";

const SignUp: FC = () => {
  return (
    <div className="p-4 ">
      <div className="bg-black border-2 border-bright-green p-2">
        <div className="text-center text-[30px] font-bold italic tracking-wider mb-4">
          - CREATE YOUR NEW ACCOUNT -
        </div>

        <div className="flex flex-col gap-6">
          <TextInput label="USERNAME:" />
          <TextInput label="PASSWORD:" type="password" />
          <TextInput label="RETYPE PASSWORD:" type="password" />
          <TextInput label="EMAIL:" type="email" />
          <TextInput label="MAILING ADDRESS:" />

          <div className="flex gap-4 pr-6">
            <TextInput label="CITY:" className="w-full" />
            <TextInput label="STATE:" className="w-full" />
            <TextInput label="ZIP:" className="w-full" />
          </div>

          <div className="flex justify-center pt-[100px] pb-[50px]">
            <div className="border-4 border-bright-green rounded-[50%] flex flex-col items-center px-[100px] py-[20px] w-fit">
              <div className="italic text-[24px] font-bold">
                Click Here to finish
              </div>
              <div className="italic text-[24px] font-bold">
                creating you New Account
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
      </div>
    </div>
  );
};

export default SignUp;
