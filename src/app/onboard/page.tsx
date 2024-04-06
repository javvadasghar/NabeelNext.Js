"use client";
import { FC, useEffect, useState } from "react";
import React from "react";

const Onboard: FC = () => {
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

        <div className="gap-8 mb-6">
          <div className="flex justify-center">
            <h1 className="text-dark-black font-bold text-[30px]">
              You are not onboared. please onboard your paypal with our platform
              to create listings
            </h1>
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-dark-green text-black rounded-[50%] px-[50px] py-[10px] font-bold text-[24px] italic"
            >
              Onboard Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
