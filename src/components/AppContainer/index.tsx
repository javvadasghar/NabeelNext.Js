import React, { FC } from "react";
import BottomNav from "../BottomNav";
import TopNav from "../TopNav";

export interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: FC<AppContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex flex-1 flex-col">{children}</div>
      <BottomNav />
    </div>
  );
};

export default AppContainer;
