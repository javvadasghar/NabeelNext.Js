"use client";
import { FC } from "react";
import ListingAdmin, {
  ListingAdminProps,
} from "../../../components/ListingAdmin";

// ADMIN PAGE
// interface SearchProps {
//   searchhh: Array<Omit<ListingAdminProps, "index">>; // Define props interface
// }

const SearchByCategoryListings: FC<SearchProps> = () => {
  const searchData1 = localStorage.getItem("data");
  const searchhh = searchData1 ? JSON.parse(searchData1) : [];
  return (
    <div className="p-4">
      <div className="text-[24px] font-bold italic mb-4">User Listings:</div>
      {searchhh.length < 1 ? (
        <div>No Listing Found. </div>
      ) : (
        <>
          {searchhh.map((listing, index) => {
            return <ListingAdmin key={listing.id} index={index} {...listing} />;
          })}
        </>
      )}
    </div>
  );
};

export default SearchByCategoryListings;
