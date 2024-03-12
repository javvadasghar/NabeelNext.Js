import React, { FC } from "react";
import BottomNav from "../BottomNav";
import Chats from "../Chats";
import TopNav from "../TopNav";

export interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: FC<AppContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen relative">
      <TopNav />
      <div className="flex flex-1 flex-col">{children}</div>
      <BottomNav />

      {/* <Chats /> */}
    </div>
  );
};

export default AppContainer;
