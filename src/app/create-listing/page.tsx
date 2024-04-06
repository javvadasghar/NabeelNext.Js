"use client";

import TextArea from "@/components/Form/TextArea";
import TextInput from "@/components/Form/TextInput";
import { categories } from "@/utils/categories";
import { cn } from "@/utils/tailwindMerge";
import { FC, useCallback, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import UploadImageForm from "./_components/UploadImageForm";

const CreateListing: FC = () => {
  const [pdfImage, setPdfImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");

  const updateSelectedCategory = useCallback((cat: string) => {
    setSelectedCategory(cat);
  }, []);

  const handlePdfImageChange = useCallback((files: File) => {
    setPdfImage(files);
  }, []);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", "222");
      formData.append("category", selectedCategory);
      if (pdfImage) {
        formData.append("featuredImage", pdfImage);
      }
      const response = await axios.post(
        "http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/listings/createlisting",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Listing created successfully");
      } else {
      }
    } catch (error) {
      if (error && error.response) {
        const responseData = error.response.data;
        if (
          responseData.message ===
          "Not Found. Please make sure you on-boarded your paypal with our platform"
        ) {
          window.location.href = "/onboard";
        } else {
          setError(responseData.message);
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
      console.error("Error creating listing:", error);
    }
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
        className="italic w-[200px] font-bold self-end mt-6 bg-bright-green px-1 py-2 text-black"
      >
        Create Listing
      </button>
    </form>
  );
};

export default CreateListing;
