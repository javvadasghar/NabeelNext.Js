import Image from "next/image";
import { FC, useState, useEffect, ChangeEvent } from "react";
import TextInput from "../Form/TextInput";
import TextArea from "../Form/TextArea";
import axios from "axios";
import Share from "../Share";
import imagesold from "../../../public/images/sold.png";
import { toast } from "sonner";
export interface ListingAdminItem {
  featuredImage: string;
  title: string;
  description: string;
}

export interface ListingItem {
  title: string;
  description: string;
  featuredImage: string;
  isSaved: boolean;
  price: string;
  message?: string;
  category: string;
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
  const admin = JSON.parse(localStorage.getItem("User") || "");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showPayPalPopup, setShowPayPalPopup] = useState<boolean>(false);



  const [listingData, setListingData] = useState<ListingItem>({
    title: "",
    description: "",
    featuredImage: "",
    category: "",
    isSaved: false,
    price: "234",
  });

  const [invoiceFields, setInvoiceFields] = useState({
    invoiceeEmail: "",
    invoiceeName: "",
    streetAddress: "",
    city: "",
    adminAreaTwo: "",
    postalCode: "",
    itemPrice: "",
    itemName: "",
  });

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value); // Update the message state with the new value
  };

  const handleInvoiceFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const response = await axios.delete(
        `https://api.iwantityougotit.com/api/listings/deleteListing/${id}`,
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

  const onImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      // setSelectedImage1(URL.createObjectURL(e.target.files[0])
      setSelectedImage1(URL.createObjectURL(e.target.files[0]));
    }
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
      formData.append("category ", listingData.category);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.patch(
        `https://api.iwantityougotit.com/api/listings/updateListing/${id}`,
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
        setShowEditPopup(false);
        window.location.href = "/user-listing";
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };



  const handleBindApi = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      const user = JSON.parse(localStorage.getItem("User") || "");
      const formData = new FormData();
      formData.append("senderUsername", user?.username);
      formData.append(
        "recieverUsername",
        listingData?.listingPostedBy?.username
      );
      formData.append("recieverEmail", listingData?.listingPostedBy?.email);
      formData.append(
        "listingInformation",
        listingData?.id + " " + listingData?.category
      );
      formData.append("message", message);
      // if (attachments) {
      formData.append("attachments", selectedImage1);
      // }

      const response = await axios.post(
        "https://api.iwantityougotit.com/api/mailer/sendBlindEmail",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response?.data?.message);
        toast.success("Email Sent Successfully!");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
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
        "https://api.iwantityougotit.com/api/listings/saveListing",
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
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchListingData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const response = await axios.get(
        `https://api.iwantityougotit.com/api/listings/fetchListing/${id}`,
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

  const handleCreateInvoice = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      const formData = new FormData();
      Object.entries(invoiceFields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await axios.post(
        `https://api.iwantityougotit.com/api/payments/CreateAndSendInvoice`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Invoice Sent to Email successfully");
        setShowPayPalPopup(false);
        // setListingData(response?.data?.data);
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

  const handlePayPalButtonClick = () => {
    setShowPayPalPopup(true);
  };


  const handleClosePopup = () => {
    setShowPayPalPopup(false);
    setShowEditPopup(false);
    setShowPopup(false);
  };

  const handleGotitPopup = () => {
    setShowPopup(true);
    fetchListingData();
  };
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
      api = `https://api.iwantityougotit.com/api/admin/deleteListing/${id}`;
    } else {
      api = `https://api.iwantityougotit.com/api/listings/deleteListing/${id}`;
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

  const handleDeleteImage = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    const api = `https://api.iwantityougotit.com/api/admin/deleteListingImage/${id}`;
    try {
      await axios.delete(api, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Image deleted successfully");
      // You may need to refresh the page or update the UI accordingly
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <>
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
            <label className="text-bright-green italic text-[24px]">
              Photo
            </label>
            <Image src={featuredImage} alt="listing" width={100} height={180} />
          </div>
          {admin.role === "admin" ? (
            <div className="flex flex-col gap-4 items-center justify-center">
              <button
                onClick={handleDeleteImage}
                className="text-center text-bright-green italic font-bold"
              >
                Delete Image
              </button>

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
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center">
              <div
                onClick={handleGotitPopup}
                className="flex flex-col items-center bg-bright-green h-fit rounded-[50%] px-[10px] py-[14px]"
              >
                <button className="italic font-bold text-black">
                  I&apos;ve Got It !
                </button>

                <Image
                  src="/images/underline.png"
                  alt="underline"
                  width={100}
                  height={40}
                  className="grayscale"
                />
              </div>
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
                <Share />
              </button>

              {/* {!isSaved && ( */}
              <button
                onClick={handleSaveListing}
                className="italic border border-bright-green px-1 py-2 bg-bright-yellow-2 text-black"
              >
                Save User Listing
              </button>
              {/* )} */}
              {/* {error && <div className="text-red-500">{error}</div>} */}
            </div>
          )}
        </div>

        <hr className="border-bright-green mt-6 border-2 w-full" />
      </div>
      {showPopup && (
        <div
          style={{ transform: "translate(-50%, -50%)", zIndex: "1" }}
          className="fixed bg-black top-1/2 left-1/2 z-1 border-4 border-bright-green"
        >
          <div className="bg-white p-4">
            <button
              className="absolute top-2 right-2 text-black font-bold"
              onClick={handleClosePopup}
            >
              X
            </button>
            <div className="flex flex-col items-center bg-black w-fit h-fit rounded-[50%] px-[20px] py-[14px]">
              <div className="italic font-bold text-bright-green">
                I&apos;ve Got It !
              </div>
            </div>

            <hr className="border-green-800 mt-2 border-2 w-full" />
            {/* Form fields to edit listing data */}
            <textarea
              label="Message" // Label for the text area
              containerClassName="gap-0"
              labelClassName="text-bright-green font-normal"
              className="w-full text-black min-h-40"
              value={message} // Value of the text area is controlled by the message state
              onChange={handleMessageChange} // onChange event handler to update the message state
              style={{
                minHeight: "4rem",
                padding: 0,
                paddingTop: "2px",
                paddingBottom: "2px",
                fontSize: "16px",
                fontWeight: "600",
                fontStyle: "italic",
              }}
            ></textarea>
            <div className="flex font-bold flex-row items-center justify-center text-blue-700">
              <span className="dot"></span> Be sure your agreed purchase price
              including shipping <span className="dot"></span>
            </div>
            <div className="mt-2 mb-2 flex flex-row items-center justify-around">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
              />
              <div className="relative w-40 h-40 border-2 border-green-300 overflow-hidden">
                {/* Conditional rendering of image or label */}
                {selectedImage1 ? (
                  <Image
                    src={selectedImage1} // Use URL.createObjectURL to display the selected image
                    alt="selected-image"
                    width={160}
                    height={160}
                  />
                ) : (
                  <label
                    htmlFor="image-upload"
                    className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center"
                  >
                    {/* Label for selecting image */}
                    <span className="text-black italic text-[12px] font-bold">
                      Attach Optional Photo
                    </span>
                  </label>
                )}
              </div>
              <div className="flex flex-col items-center bg-black w-fit h-fit rounded-[50%] px-[20px] py-[14px]">
                <button
                  className="italic font-bold text-bright-green"
                  onClick={handleBindApi}
                >
                  Send Message
                </button>
              </div>
            </div>
            <hr className="border-green-800 mt-2 mb-2 border-2 w-full" />
            <div className="flex flex-row text-black items-center justify-center text-center">
              <Image alt="imagr" src={imagesold} />
              {/* <div className="starburst">
              <div className="starburst-text">SOLD</div>
            </div> */}
              <div className="flex flex-col">
                <div className="font-bold">Create a PayPal Invoice Now</div>
                <button
                  onClick={handlePayPalButtonClick}
                  className="p-2 bg-amber-400 italic font-bold"
                >
                  <span className="text-sky-950">Pay</span>
                  <span className="text-cyan-500">Pal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPayPalPopup && (
        <div
          style={{ transform: "translate(-50%, -50%)", zIndex: "1" }}
          className="fixed bg-black top-1/2 left-1/2 z-1 p-4 border-4 border-bright-green"
        >
          <div className="p-4">
            <button
              className="absolute top-2 right-2 text-white font-bold"
              onClick={handleClosePopup}
            >
              X
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex font-bold flex-row items-center justify-center text-blue-700">
              <span className="dot"></span> Be sure your agreed purchase price
              including shipping <span className="dot"></span>
            </div>
            <TextInput
              label={"Invoicee Email"}
              name="invoiceeEmail"
              onChange={handleInvoiceFieldChange}
              containerClassName="gap-0"
              labelClassName="text-[16px] text-bright-green font-normal"
              style={{
                padding: 0,
                paddingTop: "2px",
                paddingBottom: "2px",
                fontSize: "12x",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            />

            <TextInput
              label={"Invoicee Name"}
              containerClassName="gap-0"
              labelClassName="text-[16px] text-bright-green font-normal"
              name="invoiceeName"
              onChange={handleInvoiceFieldChange}
              style={{
                padding: 0,
                paddingTop: "2px",
                paddingBottom: "2px",
                // fontSize: "24px",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            />
            <TextInput
              label={"Street Address"}
              containerClassName="gap-0"
              labelClassName="text-[16px] text-bright-green font-normal"
              name="streetAddress"
              onChange={handleInvoiceFieldChange}
              style={{
                padding: 0,
                paddingTop: "2px",
                paddingBottom: "2px",
                // fontSize: "24px",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            />
            <TextInput
              label={"City"}
              containerClassName="gap-0"
              labelClassName="text-[16px] text-bright-green font-normal"
              name="city"
              onChange={handleInvoiceFieldChange}
              style={{
                padding: 0,
                paddingTop: "2px",
                paddingBottom: "2px",
                // fontSize: "24px",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            />
            <TextInput
              label={"State/Area"}
              containerClassName="gap-0"
              labelClassName="text-[16px] text-bright-green font-normal"
              name="adminAreaTwo"
              onChange={handleInvoiceFieldChange}
              style={{
                padding: 0,
                paddingTop: "2px",
                paddingBottom: "2px",
                // fontSize: "24px",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            />
            <TextInput
              label={"Postal Code"}
              containerClassName="gap-0"
              labelClassName="text-[16px] text-bright-green font-normal"
              name="postalCode"
              onChange={handleInvoiceFieldChange}
              style={{
                padding: 0,
                paddingTop: "2px",
                paddingBottom: "2px",
                // fontSize: "24px",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            />
            <TextInput
              label={"Item Price"}
              containerClassName="gap-0"
              labelClassName="text-[16px] text-bright-green font-normal"
              name="itemPrice"
              onChange={handleInvoiceFieldChange}
              style={{
                padding: 0,
                paddingTop: "2px",
                paddingBottom: "2px",
                // fontSize: "24px",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            />
            <TextInput
              label={"Item Name"}
              containerClassName="gap-0"
              labelClassName="text-[16px] text-bright-green font-normal"
              name="itemName"
              onChange={handleInvoiceFieldChange}
              style={{
                padding: 0,
                paddingTop: "2px",
                paddingBottom: "2px",
                // fontSize: "24px",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            />
          </div>
          <div
            onClick={handleCreateInvoice}
            className="flex mt-4 flex-col items-center bg-bright-green h-fit rounded-[50%] px-[10px] py-[14px]"
          >
            <button className="italic font-bold text-black">
              Create Invoice
            </button>
          </div>
        </div>
      )}

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
                // onChange={(e) =>
                //   setListingData({ ...listingData, featuredImage: e.target.value })
                // }
                src={listingData.featuredImage}
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
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default ListingAdmin;
