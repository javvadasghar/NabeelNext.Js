import ListingsAdmin from "@/components/ListingsAdmin";
import { FC } from "react";

const listings = [
  {
    id: "0",
    title: 'Christian Dior "Beverly" Handbag 1990\'s',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    image: "https://random.imagecdn.app/100/180",
  },
  {
    id: "1",
    title: 'Captain America #523 "Red Skull Rising"',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    image: "https://random.imagecdn.app/100/180",
  },
  {
    id: "2",
    title: "Fender Stratocaster - 1959 Electric Blue",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    image: "https://random.imagecdn.app/100/180",
  },
];

const AllListings: FC = () => {
  return (
    <div className="p-4">
      <ListingsAdmin listings={listings} />
    </div>
  );
};

export default AllListings;
