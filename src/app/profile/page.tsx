import TextInput from "@/components/Form/TextInput";
import { FC } from "react";

const Profile: FC = () => {
  return (
    <div className="p-4">
      <div className="bg-black border-2 border-bright-green p-2">
        <div className="flex gap-4 justify-center py-[30px]">
          <div className="text-center border-2 border-bright-green rounded-[50%] px-[70px] py-[12px]">
            <div className="italic text-[24px] font-bold leading-3">Go to</div>
            <div className="italic text-[24px] font-bold">My Listings</div>
          </div>

          <div className="text-center border-2 border-bright-green rounded-[50%] px-[70px] py-[12px]">
            <div className="italic text-[24px] font-bold leading-3">Go to</div>
            <div className="italic text-[24px] font-bold">Saved Listings</div>
          </div>
        </div>

        <div className="text-center text-[30px] font-bold italic tracking-wider mb-4">
          - Your Profile Page -
        </div>

        <div className="flex flex-col gap-6 pb-[100px]">
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
