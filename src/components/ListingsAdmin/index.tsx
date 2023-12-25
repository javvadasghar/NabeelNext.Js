import { FC } from "react";
import ListingAdmin, { ListingAdminProps } from "../ListingAdmin";

export interface ListingsAdminProps {
  listings: Array<Omit<ListingAdminProps, "index">>;
}

const ListingsAdmin: FC<ListingsAdminProps> = ({ listings }) => {
  return (
    <div>
      {listings.map((listing, index) => {
        return <ListingAdmin key={listing.id} index={index} {...listing} />;
      })}
    </div>
  );
};

export default ListingsAdmin;
