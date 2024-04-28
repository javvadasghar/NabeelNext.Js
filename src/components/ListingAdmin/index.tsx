import Image from "next/image";
import { FC } from "react";
import TextInput from "../Form/TextInput";
import TextArea from "../Form/TextArea";
import axios from "axios";
import { toast } from "sonner";
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
  const handleDeleteListing = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }
    const admin = JSON.parse(localStorage.getItem("User") || "");
    const checkAdmin = admin.role;
    let api = "";
    if (checkAdmin && checkAdmin === "admin") {
      api = `http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/admin/deleteListing/${id}`;
    } else {
      api = `http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/listings/deleteListing/${id}`;
    }
    try {
      await axios.delete(api, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Listing deleted successfully");
      window.location.href = "/all-listings";
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

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
          <button
            onClick={handleDeleteListing}
            className="text-center text-bright-green italic font-bold"
          >
            Delete Listing
          </button>

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
