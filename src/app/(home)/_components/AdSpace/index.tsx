import { FC, useState } from "react";
import Image from "next/image";

interface Ad {
  id: string;
  adImage: string;
  adSpaceNumber: number;
  adImageUrl: string;
}

interface AdSpaceProps {
  ads: Ad[];
}

const AdSpace: FC<AdSpaceProps> = ({ ads }) => {
  return (
    <>
      {ads.map((ad) => (
        <div key={ad.id}>
          {ad.adSpaceNumber === 2 ? (
            <div className="flex w-[800px] h-[140px]">
              <Image
                src={ad.adImageUrl}
                style={{ maxHeight: "100%" }}
                key={ad.id}
                alt={`Ad ${ad.id}`}
                width={800}
                height={140}
              />
            </div>
          ) : (
            <div className="flex w-[200px] h-[620px]">
              <Image
                src={ad.adImageUrl}
                key={ad.id}
                alt={`Ad ${ad.id}`}
                width={200}
                height={620}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default AdSpace;
