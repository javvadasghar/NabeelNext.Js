import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const TopNav: FC = () => {
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
          <Link href="#" className="italic font-bold">
            Home
          </Link>
          <Link href="#" className="italic font-bold">
            Back
          </Link>
          <Link href="#" className="italic font-bold">
            Categories
          </Link>
          <Link href="#" className="italic font-bold">
            Keyword Search
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
        </nav>

        <div className="border-2 border-bright-green flex flex-1 bg-black w-[800px] mr-2" />
      </div>
    </header>
  );
};

export default TopNav;
