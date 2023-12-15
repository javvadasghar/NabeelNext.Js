import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const BottomNav: FC = () => {
  return (
    <footer className="flex bg-dark-2 px-10 pb-10 pt-4 border-t-2 border-t-black">
      <Image
        src="/images/logo.png"
        alt="logo"
        width={400}
        height={400}
        className="flex flex-1 object-contain"
      />

      <div className="flex flex-1" />
      <div className="flex flex-1" />

      <div className="flex flex-1 flex-col items-start gap-3">
        <div className="flex flex-col items-center">
          <div className="italic font-bold text-[28px]">Information</div>
          <Image
            src="/images/underline.png"
            alt="underline"
            width={160}
            height={40}
          />
        </div>

        <Link href="#" className="font-bold">
          Company Contact & Info
        </Link>
        <Link href="#" className="font-bold">
          Terms of Service
        </Link>
        <Link href="#" className="font-bold">
          Privacy Policy
        </Link>
      </div>

      <div className="flex flex-1 flex-col items-start gap-3">
        <div className="flex flex-col items-center">
          <div className="italic font-bold text-[28px]">Help & Support</div>
          <Image
            src="/images/underline.png"
            alt="underline"
            width={160}
            height={40}
          />
        </div>

        <Link href="#" className="font-bold">
          FAQ
        </Link>
        <Link href="#" className="font-bold">
          Terms and Conditions
        </Link>
        <Link href="#" className="font-bold">
          Contact Us
        </Link>
      </div>
    </footer>
  );
};

export default BottomNav;
