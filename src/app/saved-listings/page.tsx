"use client";
import Listings from "@/components/Listings/SavedListing";
import isAuth from "@/components/auth/isAuth";
import { FC, useEffect, useState } from "react";

const SavedListings: FC = () => {
  const [data, setData] = useState([]);
  const [noFound, setNoFound] = useState("");
  const GetSavedListings = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      const response = await fetch(
        "http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/listings/fetchSavedListings",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        const responseData = await response.json();
        if (responseData.error == "Not Found") {
          setNoFound(responseData.message);
        }
        console.log(responseData);
      } else {
        const Successresponse = await response.json();
        setData(Successresponse?.data);
      }
    } catch (error) {
      // Handle error - show error message to the user, etc.
    }
  };

  useEffect(() => {
    GetSavedListings();
  }, []);
  return (
    <div className="px-4 py-12">
      <div className="text-[24px] font-bold italic mb-4">Saved Listings:</div>
      {noFound !== "" ? (
        <div>No Saved Listing. </div>
      ) : (
        <Listings listings={data} />
      )}
    </div>
  );
};

export default isAuth(SavedListings);
