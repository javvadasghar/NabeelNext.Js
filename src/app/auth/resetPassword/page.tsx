"use client";
import TextInput from "@/components/Form/TextInput";
import { FC } from "react";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const ResetPassword: FC = () => {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const queryString =
    typeof window !== "undefined" ? window.location.search : "";
  const urlParams = new URLSearchParams(queryString);
  useEffect(() => {
    let gettoken = urlParams.get("token");
    if (gettoken) {
      setToken(gettoken);
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be 8 characters atleast");
      return;
    }

    const ResetPasswordPostApi =
      "https://api.iwantityougotit.com/api/auth/resetPassword";
    try {
      const response = await fetch(ResetPasswordPostApi, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      } else toast.success("Password Reset successfully!");
    } catch (error) {
      setError("Failed to Reset Password. Please try again.");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-[100px]">
      <div className="bg-black border-2 border-bright-green p-2">
        <form onSubmit={handleSubmit}>
          <div className="text-center text-[30px] font-bold italic tracking-wider mb-4">
            Reset Password
          </div>

          <div className="flex gap-4 mb-6">
            <TextInput
              required
              label="PASSWORD:"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}

          <div className="flex justify-center gap-8 mb-6">
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-dark-green text-black rounded-[50%] px-[50px] py-[10px] font-bold text-[24px] italic"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
