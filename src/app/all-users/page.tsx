"use client";
import Image from "next/image";
import axios from "axios";
import { FC, useState, useEffect } from "react";
import { toast } from "sonner";
import isAuth from "@/components/auth/isAuth";

// ADMIN PAGE

interface User {
  id: string;
  name: string;
  image: string;
  listingCount: number;
  status: string;
  isActive: boolean;
  username: string;
  email: string;
}

const AllUsers: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    console.error("Access token not found");
    return;
  }
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/admin/fetchAllUsers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setUsers(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const toggleUserAccount = async (userId: string) => {
    setLoadingUserId(userId);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const response = await axios.get(
        `http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/admin/toggleUserAccount/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  status: user.status === "active" ? "suspended" : "active",
                }
              : user
          )
        );
        await fetchAllUsers();
      }
    } catch (error) {
      console.error("Error toggling user account:", error);
    } finally {
      setLoadingUserId(null);
    }
  };

  const sendWarningEmail = async (receiverEmail: string, username: string) => {
    try {
      const response = await axios.post(
        "http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/mailer/sendWarningEmail",
        {
          recieverEmail: receiverEmail,
          username: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Warning email sent successfully.");
      }
    } catch (error) {
      console.error("Error sending warning email:", error);
    }
  };

  return (
    <div className="p-4">
      {users.map((user) => {
        return (
          <div key={user.id} className="mt-6">
            <div className="flex">
              <div className="flex flex-1 items-center gap-4">
                {/* <Image
                  src={user.image}
                  alt="user-image"
                  width={50}
                  height={50}
                  className="object-contain"
                /> */}

                {/* <div> */}
                <div className="text-[20px] text-bright-green italic">
                  {user.username}
                </div>
                <div className="text-[16px] italic">
                  Total Listings
                  <span className="text-bright-green">
                    ({user.listingCount})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`flex flex-col items-center rounded-[50%] px-[20px] py-[8px] ${
                    user.isActive ? "bg-bright-green" : "bg-red-800"
                  }`}
                  onClick={() => toggleUserAccount(user.id)}
                  style={{
                    cursor:
                      loadingUserId === user.id ? "not-allowed" : "pointer",
                  }}
                >
                  <div
                    className={`italic font-bold ${
                      user.isActive ? "text-black" : "text-bright-green"
                    }`}
                  >
                    {user.isActive ? "Activate" : "Restrict"}
                  </div>

                  <Image
                    src="/images/underline.png"
                    alt="underline"
                    width={100}
                    height={40}
                    className={user.status === "active" ? "" : "grayscale"}
                  />
                </div>

                <button
                  onClick={() => sendWarningEmail(user.email, user.username)}
                  className="flex flex-col items-center bg-red-800 rounded-[50%] px-[20px] py-[8px]"
                >
                  <div className="italic font-bold text-bright-green">
                    Send Warning Email
                  </div>

                  <Image
                    src="/images/underline.png"
                    alt="underline"
                    width={100}
                    height={40}
                  />
                </button>
              </div>
            </div>

            <hr className="border-bright-green mt-6 border-2 w-full" />
          </div>
        );
      })}
    </div>
  );
};

export default isAuth(AllUsers);
