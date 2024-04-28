"use client";
import ListingsAdmin from "@/components/ListingsAdmin";
import { FC, useEffect, useState } from "react";

// ADMIN PAGE
const AllListings: FC = () => {
  const [data, setData] = useState([]);
  const [noFound, setNoFound] = useState("");
  const GetAllListings = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const admin = JSON.parse(localStorage.getItem("User") || "");
      const checkAdmin = admin?.role;
      let api = "";
      if (checkAdmin && checkAdmin === "admin") {
        api =
          "http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/admin/fetchAllListings";
      } else {
        api =
          "http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/listings/fetchAllListings";
      }
      const response = await fetch(api, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        if (responseData.error == "Not Found") {
          setNoFound(responseData.message);
        }
      } else {
        const Successresponse = await response.json();
        {
          admin === "iwiygi_admin"
            ? setData(Successresponse?.data?.listings?.data)
            : setData(Successresponse?.data);
        }
      }
    } catch (error) {
      // Handle error - show error message to the user, etc.
    }
  };

  useEffect(() => {
    GetAllListings();
  }, []);

  return (
    <div className="p-4">
      <ListingsAdmin listings={data} />
    </div>
  );
};

export default AllListings;
