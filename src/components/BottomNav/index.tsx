"use client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface BottomNavProps {
  onFaqClick: () => void;
  onContactUsClick: () => void;
  onTermsofUseClick: () => void;
  onPrivacyPolicyClick: () => void;
}

const BottomNav: FC<BottomNavProps> = ({
  onFaqClick,
  onContactUsClick,
  onTermsofUseClick,
  onPrivacyPolicyClick,
}) => {
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
        <button onClick={onPrivacyPolicyClick} className="font-bold">
          Privacy Policy
        </button>
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

        <button onClick={onFaqClick} className="font-bold">
          FAQ
        </button>
        <button onClick={onTermsofUseClick} className="font-bold">
          Terms of Use
        </button>
        <button onClick={onContactUsClick} className="font-bold">
          Contact Us
        </button>
      </div>
    </footer>
  );
};

export default BottomNav;
