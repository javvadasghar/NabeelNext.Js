"use client";
import Image from "next/image";
import { FC, useState } from "react";
import Link from "next/link";
import AdSpace from "./_components/AdSpace";
import Search from "./_components/Search";
import { categories } from "@/utils/constants";

const Home: FC = () => {
  const [showVideo, setShowVideo] = useState(false);
  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };
  return (
    <div className="px-6 pt-2 pb-6">
      <div className="flex">
        <AdSpace />

        <div className="flex flex-1 items-center flex-col gap-6">
          <div className="text-bright-green italic text-[30px] font-bold">
            FREE to Join & FREE to Use . . .
          </div>

          <div
            onClick={toggleVideo}
            className="text-center bg-black border-2 border-bright-green rounded-[50%] px-[100px] py-[6px] cursor-pointer"
          >
            <div className="italic text-bright-green text-xl font-bold">
              How does it work ?
            </div>
            <div className="italic text-bright-green text-xl">- video -</div>
          </div>

          {showVideo && (
            <video controls className="w-full border-2 border-bright-green">
              <source
                src="https://iwiygi-assets.s3.amazonaws.com/iwiygi-assets/I+Want+It+You+Got+It_Video.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}

          <hr className="w-[600px] bg-white" />

          <Link
            href="/create-listing"
            className="text-center bg-black border-2 border-bright-yellow rounded-[50%] px-[100px] py-[10px] cursor-pointer"
          >
            <div className="italic text-bright-yellow text-xl font-bold">
              - CLICK HERE -
            </div>
            <div className="italic text-bright-yellow text-xl font-bold">
              to create listings
            </div>
          </Link>

          <hr className="w-[600px] bg-white" />

          <div className="text-center flex flex-col gap-1">
            <div className="text-bright-green italic text-[30px] font-bold">
              Seek / Look / Buy / Sell - in just a few clicks !
            </div>

            <div className="italic text-lg font-bold">
              Search
              <span className="underline underline-offset-4 decoration-bright-green">
                {" "}
                active{" "}
              </span>
              listings in over 30 Categories
            </div>
          </div>

          <Search />

          <div className="text-center bg-black border-2 border-bright-green rounded-[50%] px-[100px] py-[10px] flex flex-col items-center">
            <div className="italic text-xl font-bold">Popular Categories</div>
            <div className="italic text-xl font-bold">of Wanted Items</div>

            <Image
              src="/images/underline.png"
              alt="underline"
              width={160}
              height={40}
            />
          </div>
        </div>

        <AdSpace />
      </div>

      <div className="flex flex-col items-center mt-4">
        <div className="grid grid-cols-4 gap-y-4 gap-x-6">
          {categories.map((item) => (
            <div
              key={item}
              className="border-2 border-bright-green bg-black w-[220px] h-[70px] flex items-center justify-center text-center font-bold"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
