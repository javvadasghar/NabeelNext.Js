import Image from "next/image";
import { FC } from "react";

export interface ListingAdminItem {
  image: string;
  title: string;
  description: string;
}

export interface ListingAdminProps extends ListingAdminItem {
  id: string;
  index: number;
}

const ListingAdmin: FC<ListingAdminProps> = ({ image, title, description }) => {
  return (
    <div className="mt-6">
      <div className="flex gap-5 items-center">
        <Image src={image} alt="listing" width={100} height={180} />

        <div>
          <div className="text-[24px] italic text-bright-green">
            <span className="font-bold">Title: </span>
            {title}
          </div>
          <div className="text-[24px] italic text-bright-green">
            <span className="font-bold">Description: </span>
            {description}
          </div>
        </div>

        <div className="bg-red-800 rounded-[50%] px-[20px] py-[10px] flex flex-col items-center">
          <div className="text-center text-bright-green italic font-bold">
            Delete Image
          </div>

          <Image
            src="/images/underline.png"
            alt="underline"
            width={100}
            height={40}
          />
        </div>

        <div className="bg-red-800 rounded-[50%] px-[20px] py-[10px] flex flex-col items-center">
          <div className="text-center text-bright-green italic font-bold">
            Delete Listing
          </div>

          <Image
            src="/images/underline.png"
            alt="underline"
            width={100}
            height={40}
          />
        </div>
      </div>

      <hr className="border-bright-green mt-6 border-2 w-full" />
    </div>
  );
};

export default ListingAdmin;
