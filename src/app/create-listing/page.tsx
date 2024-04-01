"use client";

import TextArea from "@/components/Form/TextArea";
import TextInput from "@/components/Form/TextInput";
import { categories } from "@/utils/categories";
import { cn } from "@/utils/tailwindMerge";
import { FC, useCallback, useState } from "react";
import { toast } from "sonner";
import UploadImageForm from "./_components/UploadImageForm";

const CreateListing: FC = () => {
  const [pdfImage, setPdfImage] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");

  const updateSelectedCategory = useCallback((cat: string) => {
    setSelectedCategory(cat);
  }, []);

  const handlePdfImageChange = useCallback((base64data: string) => {
    setPdfImage(base64data);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      const response = await fetch(
        "http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/listings/createlisting",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            title,
            description,
            category: selectedCategory,
            price: "222",
            pdfImage,
          }),
        }
      );
      if (!response.ok) {
        const responseData = await response.json();
        setError(responseData.message);
      } else {
        toast.success("Listing created successfully");
      }
    } catch (error) {}
  };

  return (
    <form className="p-4 flex flex-col gap-2" onSubmit={handleSubmit}>
      <div>
        <TextInput
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <TextArea
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="text-[24px] text-bright-green font-normal">
          Photo
        </label>
        <UploadImageForm onPdfImageChange={handlePdfImageChange} />
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
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        className="italic w-[200px] self-end mt-6 bg-bright-green px-1 py-2 text-black"
      >
        Create Listing
      </button>
    </form>
  );
};

export default CreateListing;
