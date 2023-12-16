import { FC } from "react";
import Listing, { ListingProps } from "../Listing";

export interface ListingsProps {
  listings: Array<Omit<ListingProps, "index">>;
}

const Listings: FC<ListingsProps> = ({ listings }) => {
  return (
    <div className="flex flex-col">
      {listings.map((listing, index) => {
        return <Listing key={listing.id} {...listing} index={index} />;
      })}
    </div>
  );
};

export default Listings;
