"use client";
import React, { FC, useEffect, useRef } from "react";
import BottomNav from "../BottomNav";
import TopNav from "../TopNav";
import { useWindowSize } from "usehooks-ts";

export interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: FC<AppContainerProps> = ({ children }) => {
  const { height: windowHeight } = useWindowSize();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      if (height < windowHeight) {
        // console.log("move bottomNav to bottom");
      } else {
        // console.log("bottom nav should be inline");
      }
    }
  }, [windowHeight]);

  return (
    <>
      <TopNav />
      <div ref={ref}>{children}</div>
      <BottomNav />
    </>
  );
};

export default AppContainer;
