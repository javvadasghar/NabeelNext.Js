"use client";

import TextArea from "@/components/Form/TextArea";
import TextInput from "@/components/Form/TextInput";
import { categories } from "@/utils/constants";
import { cn } from "@/utils/tailwindMerge";
import { FC, useCallback, useState } from "react";
import UploadImageForm from "./_components/UploadImageForm";

const CreateListing: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const updateSelectedCategory = useCallback((cat: string) => {
    setSelectedCategory(cat);
  }, []);

  return (
    <form className="p-4 flex flex-col gap-2">
      <div>
        <TextInput
          vertical
          label={`Listing Title`}
          containerClassName="gap-0"
          labelClassName="text-bright-green font-normal"
          className="w-full"
          style={{
            padding: 0,
            paddingTop: "2px",
            paddingBottom: "2px",
            fontSize: "24px",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        />
      </div>

      <div>
        <TextArea
          vertical
          label="Description"
          containerClassName="gap-0"
          labelClassName="text-bright-green font-normal"
          className="w-full"
          style={{
            padding: 0,
            paddingTop: "2px",
            paddingBottom: "2px",
            fontSize: "16px",
            fontStyle: "italic",
          }}
        />
      </div>

      <div>
        <label className="text-[24px] text-bright-green font-normal">
          Photo
        </label>
        <UploadImageForm />
      </div>

      <div>
        <label className="text-[24px] text-bright-green font-normal">
          Category
        </label>
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-4 gap-y-4 gap-x-6">
            {categories.map((item) => (
              <div
                key={item}
                className={cn(
                  "border-2 bg-black w-[220px] h-[70px] flex items-center justify-center text-center font-bold cursor-pointer",
                  selectedCategory === item ? "border-bright-green" : ""
                )}
                onClick={() => updateSelectedCategory(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="italic w-[200px] self-end mt-6 bg-bright-green px-1 py-2 text-black"
      >
        Save Listing
      </button>
    </form>
  );
};

export default CreateListing;
