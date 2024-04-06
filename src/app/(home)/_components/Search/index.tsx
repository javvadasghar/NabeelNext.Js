"use client";
import { Button, Dropdown, TextInput } from "flowbite-react";
import { FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaTags, FaTextWidth } from "react-icons/fa6";
import { categories } from "@/utils/categories";

const Search: FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchData, setSearchData] = useState([]);

  const handleSearch = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }
    // Construct the API endpoint with the keyword as the listingTitle parameter

    let apiUrl = "";
    if (selectedCategory) {
      apiUrl = `http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/listings/searchByCategory/${selectedCategory}`;
    } else if (keyword) {
      apiUrl = `http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/listings/searchByListing/${keyword}`;
    } else {
      return;
    }

    // Perform the API request using fetch or axios
    fetch(apiUrl, {
      method: "GET", // or "POST", "PUT", etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the authorization header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchData(data?.data);
        localStorage.setItem("data", JSON.stringify(data?.data));
        window.location.href = "listings/search";
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex">
      <style>
        {`
          .transition-opacity {
            overflow: auto;
            height: 20rem;
          }
        `}
      </style>
      <Dropdown
        label=""
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="flex flex-1 overflow-auto bg-white items-center h-[50px] w-[200px] cursor-pointer px-2">
            <FaTags className="text-[16px] text-grey-light mr-4" />
            <div className="text-grey-light text-[14px] font-normal">
              {selectedCategory ? selectedCategory : "Select Category"}
            </div>
          </div>
        )}
        onChange={(event) => {
          const selectedValue = (event.target as HTMLInputElement).value;
          setSelectedCategory(selectedValue);
        }}
      >
        {categories.map((item) => (
          <div
            key={item}
            className="border-2 border-bright-green bg-black flex items-center justify-center text-center font-bold"
          >
            <Dropdown.Item
              onClick={() => {
                setSelectedCategory(item);
              }}
            >
              {" "}
              {item}
            </Dropdown.Item>
          </div>
        ))}
      </Dropdown>

      <div className="bg-white flex items-center">
        <hr className="border-0 border-l-[1px] border-l-grey-light bg-red-400 h-[20px] w-0" />
      </div>

      <TextInput
        type="text"
        icon={() => <FaTextWidth className="text-[16px] text-grey-light" />}
        placeholder="Enter Keyword here..."
        style={{
          borderRadius: 0,
          borderWidth: 0,
          height: "50px",
          width: "250px",
          color: "#999999",
          fontSize: "14px",
          fontWeight: "normal",
        }}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <Button
        style={{ borderRadius: 0, height: "50px", width: "200px" }}
        className="bg-bright-green"
        onClick={handleSearch}
      >
        <FaSearch className="text-[16px] mr-4" />
        Search
      </Button>
    </div>
  );
};

export default Search;
