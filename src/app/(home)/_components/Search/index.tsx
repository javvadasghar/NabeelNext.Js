"use client";
import { Button, Dropdown, TextInput } from "flowbite-react";
import { FC } from "react";
import { FaSearch } from "react-icons/fa";
import { FaTags, FaTextWidth } from "react-icons/fa6";

const Search: FC = () => {
  return (
    <div className="flex">
      <Dropdown
        label=""
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="flex flex-1 bg-white items-center h-[50px] w-[250px] cursor-pointer px-2">
            <FaTags className="text-[16px] text-grey-light mr-4" />
            <div className="text-grey-light text-[14px] font-normal">
              Select Category
            </div>
          </div>
        )}
      >
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Item>Sign out</Dropdown.Item>
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
      />

      <Button
        style={{ borderRadius: 0, height: "50px", width: "200px" }}
        className="bg-bright-green"
      >
        <FaSearch className="text-[16px] mr-4" />
        Search
      </Button>
    </div>
  );
};

export default Search;
