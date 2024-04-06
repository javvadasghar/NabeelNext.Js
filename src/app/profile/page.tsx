"use client";
import TextInput from "@/components/Form/TextInput";
import { FC, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const Profile: FC = () => {
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleToggleChangePasswordPopup = () => {
    setShowChangePasswordPopup(!showChangePasswordPopup);
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      if (!oldPassword || !newPassword) {
        setError("Please enter both old and new password.");
        return;
      }

      const ChangePasswordPostApi =
        "http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/auth/updatePassword";
      const response = await fetch(ChangePasswordPostApi, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        setError(responseData.message);
      } else {
        toast.success("Password Changed successfully!");
        setShowChangePasswordPopup(false);
      }
    } catch (error) {
      // setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-black border-2 border-bright-green p-2">
        <div className="flex gap-4 justify-center py-[30px]">
          <Link
            href="/user-listing"
            className="text-center border-2 border-bright-green rounded-[50%] px-[70px] py-[12px]"
          >
            <div className="italic text-[24px] font-bold leading-3">Go to</div>
            <div className="italic text-[24px] font-bold">My Listings</div>
          </Link>

          <Link
            href="/saved-listings"
            className="text-center border-2 border-bright-green rounded-[50%] px-[70px] py-[12px]"
          >
            <div className="italic text-[24px] font-bold leading-3">Go to</div>
            <div className="italic text-[24px] font-bold">Saved Listings</div>
          </Link>
        </div>

        <div className="text-center text-[30px] font-bold italic tracking-wider mb-4">
          - Your Profile Page -
        </div>

        <div className="flex flex-col gap-6 pb-[100px]">
          <TextInput label="USERNAME:" />
          <div className="flex gap-6">
            <TextInput label="PASSWORD:" type="password" />
            <button
              className="text-black font-bold bg-dark-green rounded px-3 py-1"
              onClick={handleToggleChangePasswordPopup}
            >
              Change Password
            </button>
          </div>
          <TextInput label="RETYPE PASSWORD:" type="password" />
          <TextInput label="EMAIL:" type="email" />
          <TextInput label="MAILING ADDRESS:" />

          <div className="flex gap-4 pr-6">
            <TextInput label="CITY:" className="w-full" />
            <TextInput label="STATE:" className="w-full" />
            <TextInput label="ZIP:" className="w-full" />
          </div>
        </div>
        <div className="gap-0 flex justify-center">
          <button
            type="submit"
            className="bg-dark-green text-black rounded-[50%] px-[50px] py-[10px] font-bold text-[24px] italic"
          >
            Update Profile
          </button>
        </div>
      </div>
      {showChangePasswordPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-black border-2 border-bright-green p-2 mt-2">
            <form onSubmit={handleChangePasswordSubmit} className="mb-2 pt-2">
              <div className="mt-4 gap-6 mb-4">
                <TextInput
                  label="OLD PASSWORD:"
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                  name="oldpassword"
                  type="password"
                />
                <TextInput
                  className="mt-2"
                  label="NEW PASSWORD:"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  name="newpassword"
                  type="password"
                />
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <div className="gap-4 mt-4 flex justify-center">
                <button
                  type="submit"
                  className="bg-dark-green text-black rounded-[50%] px-[50px] py-[10px] font-bold text-[24px] italic"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
