import { Button } from "flowbite-react";
import { FC } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import TextInput from "../Form/TextInput";

const Chats: FC = () => {
  return (
    <div className="bottom-0 right-0 fixed flex mx-6 gap-6 pointer-events-none">
      <div className="w-[280px] h-[360px] rounded-tl-[20px] rounded-tr-[20px] bg-dark-2 pointer-events-auto overflow-hidden flex flex-col">
        <div className="bg-bright-green py-2 px-2 flex items-center justify-between">
          <div>Name</div>

          <div className="flex items-center gap-2">
            <Button
              size="xs"
              className="border border-white bg-transparent hover:bg-red-500"
            >
              Create Offer
            </Button>

            <div className="cursor-pointer">
              <FaChevronDown size={12} color="white" />
            </div>
          </div>
        </div>

        <div className="flex flex-1 px-2 overflow-scroll flex-col"></div>

        <div className="px-2 mb-2 flex gap-2 border-t-2 pt-2">
          <TextInput className="w-full" />
          <div className="flex items-center cursor-pointer">
            <div className="bg-bright-green flex items-center justify-center w-[30px] h-[30px] rounded-[15px]">
              <IoMdSend size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-[280px] h-[360px] rounded-tl-[20px] rounded-tr-[20px] pointer-events-auto">
        Hello
      </div>
      <div className="w-[280px] h-[360px] rounded-tl-[20px] rounded-tr-[20px] pointer-events-auto">
        Hello
      </div>
      <div className="w-[280px] h-[360px] rounded-tl-[20px] rounded-tr-[20px] pointer-events-auto">
        Hello
      </div> */}
    </div>
  );
};

export default Chats;
