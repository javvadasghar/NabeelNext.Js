"use client";
import isAuth from "@/components/auth/isAuth";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { toast } from "sonner";
import { categories } from "@/utils/categories";

const Categories: FC = () => {
  const [error, setError] = useState("");
  const [successmsg, setsuccessmsg] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const queryString =
    typeof window !== "undefined" ? window.location.search : "";
  const urlParams = new URLSearchParams(queryString);

  const handleSearch = async (category: string) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }
    // Construct the API endpoint with the keyword as the listingTitle parameter

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/listings/searchByCategory/${category}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("data", JSON.stringify(response?.data?.data));
        window.location.href = "/listings/search";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="grid grid-cols-4 gap-y-4 gap-x-6">
        {categories.map((item) => (
          <button
            onClick={() => handleSearch(item)}
            key={item}
            className="border-2 border-bright-green bg-black w-[220px] h-[70px] flex items-center justify-center text-center font-bold"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default isAuth(Categories);
