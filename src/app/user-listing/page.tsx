"use client";
import Listings from "@/components/Listings/UserListing";
import { FC, useEffect, useState } from "react";

const UserListing: FC = () => {
  const [data, setData] = useState([]);
  const [noFound, setNoFound] = useState("");
  const GetUserListings = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const user = JSON.parse(localStorage.getItem("User") || "");
      const userId = user.id;
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      const response = await fetch(
        `http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/listings/fetchListingByUserId/${userId}`,
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
      } else {
        const Successresponse = await response.json();
        setData(Successresponse?.data);
      }
    } catch (error) {
      // Handle error - show error message to the user, etc.
    }
  };

  useEffect(() => {
    GetUserListings();
  }, []);

  return (
    <div className="px-4 py-12">
      <div className="text-[24px] font-bold italic mb-4">User Listings:</div>
      {noFound !== "" ? (
        <div>No Listing Found. </div>
      ) : (
        <Listings listings={data} />
      )}
    </div>
  );
};

export default UserListing;
