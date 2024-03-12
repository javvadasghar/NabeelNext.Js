import Image from "next/image";
import { FC } from "react";

// ADMIN PAGE

const AllAds: FC = () => {
  return (
    <div className="p-4 mx-auto flex flex-col gap-8">
      <div className="flex items-center gap-5">
        <div className="border-2 border-bright-green flex flex-1 bg-black w-[800px] h-[120px]" />

        <div className="flex flex-col items-center bg-bright-green h-fit rounded-[50%] px-[10px] py-[14px]">
          <div className="italic font-bold text-black">Upload New</div>

          <Image
            src="/images/underline.png"
            alt="underline"
            width={100}
            height={40}
            className="grayscale"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
          <div className="w-[200px] h-[620px] bg-black border-2 border-bright-green" />

          <div className="flex flex-col items-center bg-bright-green h-fit rounded-[50%] px-[10px] py-[14px]">
            <div className="italic font-bold text-black">Upload New</div>

            <Image
              src="/images/underline.png"
              alt="underline"
              width={100}
              height={40}
              className="grayscale"
            />
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <div className="w-[200px] h-[620px] bg-black border-2 border-bright-green" />

          <div className="flex flex-col items-center bg-bright-green h-fit rounded-[50%] px-[10px] py-[14px]">
            <div className="italic font-bold text-black">Upload New</div>

            <Image
              src="/images/underline.png"
              alt="underline"
              width={100}
              height={40}
              className="grayscale"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAds;
