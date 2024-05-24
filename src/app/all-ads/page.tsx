"use client";
import { FC, useState, useRef, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";

// ADMIN PAGE

interface Ad {
  id: string;
  adImage: string;
  adSpaceNumber: number;
  adImageUrl: string;
}

const AllAds: FC = () => {
  const [adImages, setAdImages] = useState<(File | null)[]>([null, null, null]);
  const fileInputRefs = useRef<HTMLInputElement[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    debugger;
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/admin/fetchAllAds`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        debugger;
        const fetchedAds: Ad[] = response.data.data;
        const newAdImages = [...adImages];
        fetchedAds.forEach((ad) => {
          const index = ad.adSpaceNumber - 1;
          newAdImages[index] = ad.adImageUrl;
        });

        setAdImages(newAdImages);

        setAds(fetchedAds);
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const handleFileInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        setAdImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = file;
          return newImages;
        });

        handleUpload(file, index);
      }
    };

  const handleUpload = async (file: File, index: number) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      const formData = new FormData();

      formData.append("adImage", file);
      formData.append("adSpaceNumber", String(index + 1));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/admin/postAd",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      window.location.href = "/all-ads";
    } catch (error) {
      console.error("Error uploading ad:", error);
    }
  };

  const handleDelete = async (adId: string) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/api/admin/deleteAd/${adId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("Ad Deleted successfully");
      window.location.href = "/all-ads";
      setAds((prevAds) => prevAds.filter((ad) => ad.id !== adId));
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  const handleClickUploadButton = (index: number) => {
    fileInputRefs.current[index].click();
  };

  return (
    <div className="p-4 mx-auto flex flex-col gap-8">
      <div className="flex gap-5 items-center">
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileInputChange(1)}
          ref={(input) =>
            (fileInputRefs.current[1] = input as HTMLInputElement)
          }
        />
        <div className="flex w-[800px] h-[120px] bg-black border-2 border-bright-green">
          {adImages[1] && (
            <Image
              src={adImages[1]}
              alt={`Ad space 2`}
              width={800}
              height={120}
            />
          )}
        </div>
        <div className="flex flex-col ">
          <button
            className="italic font-bold text-black items-center bg-bright-green h-fit rounded-[50%] px-[10px] py-[14px]"
            onClick={() => handleClickUploadButton(1)}
          >
            Upload New 2
          </button>
          <button
            className="italic font-bold text-black mt-2 items-center bg-bright-green h-fit rounded-[50%] px-[10px] py-[14px]"
            onClick={() =>
              handleDelete(
                ads.filter((e) => e.adSpaceNumber === 2)[0]?.adId || ""
              )
            }
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        {[0, 2].map((adSpaceNumber, index) => (
          <div key={adSpaceNumber} className="flex gap-5 items-center">
            <input
              alt="NO FILE"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileInputChange(adSpaceNumber)}
              ref={(input) =>
                (fileInputRefs.current[adSpaceNumber] =
                  input as HTMLInputElement)
              }
            />
            <div className="flex w-[200px] h-[620px] bg-black border-2 border-bright-green">
              {adImages[adSpaceNumber] && (
                <Image
                  src={adImages[adSpaceNumber]}
                  alt={`Ad space ${adSpaceNumber + 1}`}
                  width={200}
                  height={620}
                />
              )}
            </div>
            <div className="flex flex-col">
              <button
                className="italic font-bold text-black bg-bright-green h-fit rounded-[50%] px-[10px] py-[14px]"
                onClick={() => handleClickUploadButton(adSpaceNumber)}
              >
                Upload New {adSpaceNumber + 1}
              </button>
              <button
                className="italic font-bold text-black mt-2 bg-bright-green h-fit rounded-[50%] px-[10px] py-[14px]"
                onClick={() =>
                  handleDelete(
                    ads.filter((e) => e.adSpaceNumber)[0]?.adId || ""
                  )
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAds;
