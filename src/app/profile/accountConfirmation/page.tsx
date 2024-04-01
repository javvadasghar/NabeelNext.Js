"use client";
import { FC, useEffect, useState } from "react";
import React from "react";
import Link from "next/link";

const AccountConfirmation: FC = () => {
  const [error, setError] = useState("");
  const [successmsg, setsuccessmsg] = useState("");
  const queryString =
    typeof window !== "undefined" ? window.location.search : "";
  const urlParams = new URLSearchParams(queryString);
  useEffect(() => {
    let gettoken = urlParams.get("token");
    if (gettoken) {
      handleVerification();
    }
  }, []);

  const handleVerification = async () => {
    let gettoken = urlParams.get("token");
    const ResetPasswordPostApi = `http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/auth/verifyUser/${gettoken}`;
    try {
      const response = await fetch(ResetPasswordPostApi, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      } else setsuccessmsg("User Verified");
    } catch (error) {
      setError("Failed to Reset Password. Please try again.");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-[100px]">
      <div className="bg-black border-2 border-bright-green p-2">
        <div className="text-center text-[30px] font-bold italic tracking-wider mb-4">
          {successmsg}
        </div>

        <div className="flex justify-center gap-8 mb-6">
          <div className="flex justify-center">
            <Link className="text-dark-green" href="/profile">
              Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountConfirmation;
