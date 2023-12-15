import React, { FC } from "react";
import BottomNav from "../BottomNav";
import TopNav from "../TopNav";

export interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: FC<AppContainerProps> = ({ children }) => {
  return (
    <>
      <TopNav />
      {children}
      <BottomNav />
    </>
  );
};

export default AppContainer;
