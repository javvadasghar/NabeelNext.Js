import Image from "next/image";
import { FC } from "react";
import TextInput from "../Form/TextInput";
import TextArea from "../Form/TextArea";
export interface ListingAdminItem {
  featuredImage: string;
  title: string;
  description: string;
}

export interface ListingAdminProps extends ListingAdminItem {
  id: string;
  index: number;
}

const ListingAdmin: FC<ListingAdminProps> = ({
  id,
  title,
  description,
  featuredImage,
  index,
}) => {
  debugger;
  return (
    <div className="mt-6">
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <TextInput
            label={`Listing #${index + 1} Title`}
            containerClassName="gap-0"
            labelClassName="text-bright-green font-normal"
            className="w-full"
            value={title}
            style={{
              padding: 0,
              paddingTop: "2px",
              paddingBottom: "2px",
              fontSize: "24px",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          />

          <div>
            <TextArea
              label="Description"
              containerClassName="gap-0"
              labelClassName="text-bright-green font-normal"
              className="w-full"
              value={description}
              style={{
                padding: 0,
                paddingTop: "2px",
                paddingBottom: "2px",
                fontSize: "16px",
                fontStyle: "italic",
              }}
            />
          </div>
        </div>
        <div className="text-center flex flex-col items-center">
          <label className="text-bright-green italic text-[24px]">Photo</label>
          <Image src={featuredImage} alt="listing" width={100} height={180} />
        </div>
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="text-center text-bright-green italic font-bold">
            Delete Image
          </div>

          <Image
            src="/images/underline.png"
            alt="underline"
            width={100}
            height={40}
          />
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
