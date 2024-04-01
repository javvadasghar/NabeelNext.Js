import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
// let role = "client";

const TopNav: FC = () => {
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setRole("user");
    }
  }, []);
  const [role, setRole] = useState("client");

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      const response = await fetch(
        "http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/auth/logout",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        localStorage.clear();
        window.location.href = "/sign-in";
      }
    } catch (error) {}
  };
  return (
    <header className="bg-grey flex justify-between pl-8 border-b-2 border-b-black">
      <Image
        src="/images/logo.png"
        alt="logo"
        width={400}
        height={400}
        className="mt-6"
      />

      <div className="flex flex-1 flex-col items-end justify-between">
        <nav className="flex bg-dark gap-12 items-center pt-4 pl-6 pr-12">
          {role == "admin" ? (
            <>
              <Link href="#" className="italic font-bold">
                Users
              </Link>
              <Link href="#" className="italic font-bold">
                Listings
              </Link>
              <Link href="#" className="italic font-bold">
                Ads
              </Link>

              <Link href="#" className="flex gap-1">
                <Image
                  src="/images/avatar.png"
                  alt="avatar"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <div className="w-[80px] font-bold">Sign In / Sign Up</div>
              </Link>
            </>
          ) : (
            <>
              <Link href="/" className="italic font-bold">
                Home
              </Link>
              {/* <Link href="#" className="italic font-bold">
                Back
              </Link> */}
              {/* <Link href="#" className="italic font-bold">
                Categories
              </Link> */}
              {/* <Link href="#" className="italic font-bold">
                Keyword Search
              </Link> */}
              {role === "user" ? (
                <button onClick={handleLogout} className="w-[80px] font-bold">
                  Log out
                </button>
              ) : (
                <Link href="/sign-in" className="flex gap-1">
                  <Image
                    src="/images/avatar.png"
                    alt="avatar"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <div className="w-[80px] font-bold">Sign In / Sign Up</div>
                </Link>
              )}
            </>
          )}
        </nav>

        {role !== "admin" && (
          <div className="border-2 border-bright-green flex flex-1 bg-black w-[800px] mr-2" />
        )}
      </div>
    </header>
  );
};

export default TopNav;
