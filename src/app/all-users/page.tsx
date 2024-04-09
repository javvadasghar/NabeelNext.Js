"use client";
import Image from "next/image";
import axios from "axios";
import { FC, useState, useEffect } from "react";

// ADMIN PAGE

interface User {
  id: string;
  name: string;
  image: string;
  totalListings: number;
  status: string;
  username: string;
}

const AllUsers: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  useEffect(() => {
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
          setUsers(response?.data?.data?.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

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
      }
    } catch (error) {
      console.error("Error toggling user account:", error);
    } finally {
      setLoadingUserId(null);
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
                    ({user.totalListings})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`flex flex-col items-center rounded-[50%] px-[20px] py-[8px] ${
                    user.status === "active" ? "bg-red-800" : "bg-bright-green"
                  }`}
                  onClick={() => toggleUserAccount(user.id)}
                  style={{
                    cursor:
                      loadingUserId === user.id ? "not-allowed" : "pointer",
                  }}
                >
                  <div
                    className={`italic font-bold ${
                      user.status === "active"
                        ? "text-bright-green"
                        : "text-black"
                    }`}
                  >
                    {user.status === "active" ? "Restrict" : "Activate"}
                  </div>

                  <Image
                    src="/images/underline.png"
                    alt="underline"
                    width={100}
                    height={40}
                    className={user.status === "active" ? "" : "grayscale"}
                  />
                </div>

                <div className="flex flex-col items-center bg-red-800 rounded-[50%] px-[20px] py-[8px]">
                  <div className="italic font-bold text-bright-green">
                    Send Warning Email
                  </div>

                  <Image
                    src="/images/underline.png"
                    alt="underline"
                    width={100}
                    height={40}
                  />
                </div>
              </div>
            </div>

            <hr className="border-bright-green mt-6 border-2 w-full" />
          </div>
        );
      })}
    </div>
  );
};

export default AllUsers;
