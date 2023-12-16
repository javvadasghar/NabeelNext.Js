import TextArea from "@/components/Form/TextArea";
import TextInput from "@/components/Form/TextInput";
import Image from "next/image";
import { FC } from "react";

const savedListings = [
  {
    id: "0",
    title: 'Christian Dior "Beverly" Handbag 1990\'s',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
];

const SavedListings: FC = () => {
  return (
    <div className="px-4 py-12">
      <div className="text-[24px] font-bold italic mb-4">Saved Listings:</div>

      <div>
        {savedListings.map((listing, index) => {
          return (
            <div key={listing.id} className="flex gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <TextInput
                  vertical
                  label={`Listing #${index + 1} Title`}
                  containerClassName="gap-0"
                  labelClassName="text-bright-green font-normal"
                  className="w-full"
                  value={listing.title}
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
                    vertical
                    label="Description"
                    containerClassName="gap-0"
                    labelClassName="text-bright-green font-normal"
                    className="w-full"
                    value={listing.description}
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
                <label className="text-bright-green italic text-[24px]">
                  Photo
                </label>
                <Image
                  src="https://random.imagecdn.app/100/180"
                  alt="listing"
                  width={100}
                  height={180}
                />
                <div className="text-bright-green italic text-center mt-1">
                  Click to Expand
                </div>
              </div>

              <div className="flex flex-col gap-4 items-center">
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedListings;
