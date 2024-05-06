"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";


export default function isAuth(Component: any) {

  return function IsAuth(props: any) {
    const accessToken = localStorage.getItem("accessToken");
    //   if (!accessToken) {
    //     console.error("Access token not found");
    //     return;
    //   }
    const auth = accessToken;


    useEffect(() => {
      if (!auth) {
        return redirect("/sign-in");
      }
    }, []);


    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}