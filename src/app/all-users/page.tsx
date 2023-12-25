import Image from "next/image";
import { FC } from "react";

const users = [
  {
    id: "0",
    image: "/images/avatar.png",
    name: "FirstName LastName",
    totalListings: 9,
    status: "active",
  },
  {
    id: "1",
    image: "/images/avatar.png",
    name: "FirstName LastName",
    totalListings: 9,
    status: "restricted",
  },
  {
    id: "2",
    image: "/images/avatar.png",
    name: "FirstName LastName",
    totalListings: 9,
    status: "restricted",
  },
  {
    id: "3",
    image: "/images/avatar.png",
    name: "FirstName LastName",
    totalListings: 9,
    status: "active",
  },
  {
    id: "4",
    image: "/images/avatar.png",
    name: "FirstName LastName",
    totalListings: 9,
    status: "restricted",
  },
  {
    id: "5",
    image: "/images/avatar.png",
    name: "FirstName LastName",
    totalListings: 9,
    status: "restricted",
  },
];

const AllUsers: FC = () => {
  return (
    <div className="p-4">
      {users.map((user) => {
        return (
          <div key={user.id} className="mt-6">
            <div className="flex">
              <div className="flex flex-1 items-center gap-4">
                <Image
                  src={user.image}
                  alt="user-image"
                  width={50}
                  height={50}
                  className="object-contain"
                />

                <div>
                  <div className="text-[20px] text-bright-green italic">
                    {user.name}
                  </div>
                  <div className="text-[16px] italic">
                    Total Listings{" "}
                    <span className="text-bright-green">
                      ({user.totalListings})
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`flex flex-col items-center rounded-[50%] px-[20px] py-[8px] ${
                    user.status === "active" ? "bg-red-800" : "bg-bright-green"
                  }`}
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

                <div className="flex flex-col items-center bg-red-800 rounded-[50%] px-[20px] py-[8px]">
                  <div className="italic font-bold text-bright-green">
                    Delete User
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
