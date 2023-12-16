import Listings from "@/components/Listings";
import { FC } from "react";

const savedListings = [
  {
    id: "0",
    title: 'Christian Dior "Beverly" Handbag 1990\'s',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    image: "https://random.imagecdn.app/100/180",
    isSaved: true,
  },
];

const SavedListings: FC = () => {
  return (
    <div className="px-4 py-12">
      <div className="text-[24px] font-bold italic mb-4">Saved Listings:</div>

      <Listings listings={savedListings} />
    </div>
  );
};

export default SavedListings;
