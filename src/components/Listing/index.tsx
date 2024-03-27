import { FC } from "react";
import TextArea from "../Form/TextArea";
import TextInput from "../Form/TextInput";
import Image from "next/image";

export interface ListingItem {
  title: string;
  description: string;
  image: string;
  isSaved: boolean;
}

export interface ListingProps extends ListingItem {
  id: string;
  index: number;
}

const Listing: FC<ListingProps> = ({
  title,
  description,
  image,
  isSaved,
  index,
}) => {
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

            <div className="text-bright-green italic text-center mt-1">
              Click to Expand
            </div>
          </div>
        </div>

        <div className="text-center flex flex-col items-center">
          <label className="text-bright-green italic text-[24px]">Photo</label>
          <Image src={image} alt="listing" width={100} height={180} />
          <div className="text-bright-green italic text-center mt-1">
            Click to Expand
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="flex flex-col items-center bg-bright-green h-fit rounded-[50%] px-[10px] py-[14px]">
            <div className="italic font-bold text-black">
              I&apos;ve Got It !
            </div>

            <Image
              src="/images/underline.png"
              alt="underline"
              width={100}
              height={40}
              className="grayscale"
            />
          </div>

          <button className="italic border border-bright-green px-1 py-2 bg-blue-dark">
            Share
          </button>

          {!isSaved && (
            <button className="italic border border-bright-green px-1 py-2 bg-bright-yellow-2 text-black">
              Save Listing
            </button>
          )}
        </div>
      </div>

      <hr className="border-bright-green mt-6 border-2 w-full" />
    </div>
  );
};

export default Listing;
