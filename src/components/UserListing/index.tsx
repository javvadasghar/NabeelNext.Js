import { FC, useState, useEffect } from "react";
import axios from "axios";
import TextArea from "../Form/TextArea";
import TextInput from "../Form/TextInput";
import Image from "next/image";
import { toast } from "sonner";

export interface ListingItem {
  title: string;
  description: string;
  featuredImage: string;
  isSaved: boolean;
  price: string;
}

export interface ListingProps extends ListingItem {
  id: string;
  index: number;
}

const UserListing: FC<ListingProps> = ({
  id,
  title,
  description,
  featuredImage,
  isSaved,
  index,
}) => {
  const [error, setError] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [listingData, setListingData] = useState<ListingItem>({
    title: "",
    description: "",
    featuredImage: "",
    isSaved: false,
    price: "234",
  });

  const fetchListingData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const response = await axios.get(
        `http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/listings/fetchListing/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setListingData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching listing data:", error);
      setError(
        "An error occurred while fetching the listing data. Please try again later."
      );
    }
  };

  const handleEditButtonClick = () => {
    setShowEditPopup(true);
    fetchListingData();
  };

  const handleClosePopup = () => {
    setShowEditPopup(false);
  };

  const handleUpdateListing = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const formData = new FormData();
      formData.append("title", listingData.title);
      formData.append("description", listingData.description);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.patch(
        `http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/listings/updateListing/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        setShowEditPopup(false); // Close the edit popup after successful update
        window.location.href = "/user-listing";
      }
    } catch (error) {
      console.error("Error updating listing:", error);
      setError(
        "An error occurred while updating the listing. Please try again later."
      );
    }
  };

  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const response = await axios.delete(
        `http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/listings/deleteListing/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // if (response) {
      // Successfully deleted
      toast.success("Listing deleted successfully");
      window.location.href = "/user-listing";
      // } else {
      //   const data = await response.json();
      //   setError(data.message);
      // }
    } catch (error) {
      console.error("Error deleting listing:", error);
      setError(
        "An error occurred while deleting the listing. Please try again later."
      );
    }
  };

  const handleSaveListing = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const response = await axios.post(
        "http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/listings/saveListing",
        {
          listingId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
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

            {/* <div className="text-bright-green italic text-center mt-1">
              Click to Expand
            </div> */}
          </div>
        </div>

        <div className="text-center flex flex-col items-center">
          <label className="text-bright-green italic text-[24px]">Photo</label>
          <Image src={featuredImage} alt="listing" width={100} height={180} />
          {/* <div className="text-bright-green italic text-center mt-1">
            Click to Expand
          </div> */}
        </div>

        <div className="flex flex-col gap-4 items-center justify-center">
          <button
            onClick={handleEditButtonClick}
            className="italic border border-bright-green px-1 py-2 bg-blue-dark"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="italic border border-bright-green px-1 py-2 bg-blue-dark"
          >
            Delete
          </button>
          <button className="italic border border-bright-green px-1 py-2 bg-blue-dark">
            Share
          </button>

          {!isSaved && (
            <button
              onClick={handleSaveListing}
              className="italic border border-bright-green px-1 py-2 bg-bright-yellow-2 text-black"
            >
              Save User Listing
            </button>
          )}
          {/* {error && <div className="text-red-500">{error}</div>} */}
        </div>
      </div>

      <hr className="border-bright-green mt-6 border-2 w-full" />

      {/* Edit Popup */}
      {showEditPopup && (
        <div
          style={{ transform: "translate(-50%, -50%)", zIndex: "1" }}
          className="fixed bg-black top-1/2 left-1/2 z-1 border-2 border-bright-green"
        >
          <div className="bg-black p-8 rounded-lg">
            <button
              className="absolute top-2 right-2 text-white-600 font-bold"
              onClick={handleClosePopup}
            >
              X
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Listing</h2>
            {/* Form fields to edit listing data */}
            <TextInput
              label="Title"
              labelClassName="text-bright-green font-normal mb-4"
              value={listingData.title}
              onChange={(e) =>
                setListingData({ ...listingData, title: e.target.value })
              }
            />
            <TextArea
              label="Description"
              labelClassName="text-bright-green font-normal mb-4"
              value={listingData.description}
              onChange={(e) =>
                setListingData({ ...listingData, description: e.target.value })
              }
            />
            <div className="flex flex-row items-center justify-center">
              <label className="text-bright-green italic text-[24px]">
                Photo
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSelectedImage(e.target.files ? e.target.files[0] : null)
                }
                className="hidden"
              />
              <Image
                value={listingData.featuredImage}
                onChange={(e) =>
                  setListingData({ ...listingData, image: e.target.value })
                }
                src={featuredImage}
                alt="listing"
                width={100}
                height={180}
              />
              <label
                htmlFor="image-upload"
                className="text-bright-green italic text-[12px]"
              >
                Choose New Image
              </label>
            </div>
            <button
              className="bg-dark-green text-black rounded-[50%] px-[50px] py-[10px] font-bold text-[24px] italic"
              onClick={handleUpdateListing}
            >
              Update Listing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListing;
