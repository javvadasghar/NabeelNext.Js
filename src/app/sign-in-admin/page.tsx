"use client";
import TextInput from "@/components/Form/TextInput";
import { FC, useState } from "react";
import { toast } from "sonner";
// ADMIN PAGE

const SignInAdmin: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    const SignInPostApi =
      "https://api.iwantityougotit.com/api/admin/signin";
    try {
      const response = await fetch(SignInPostApi, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const responseData = await response.json();
        setError(responseData.message);
      } else {
        const data = await response.json();
        if (data?.data?.user?.role === "admin") {
          toast.success("Signed in successfully!");
          const access_token = data?.data?.tokens?.access_token;
          localStorage.setItem("accessToken", access_token);
          window.location.href = "/";
        } else setError("Signin Failed. Admin not Found.");
      }
    } catch (error) {
      // setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-[100px]">
      <div className="bg-black border-2 border-bright-green p-2">
        <form onSubmit={handleSubmit}>
          <div className="text-center text-[30px] font-bold italic tracking-wider mb-4">
            - ADMIN SIGN IN -
          </div>

          <div className="flex gap-4 mb-6">
            <TextInput
              label="USERNAME:"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
            <TextInput
              label="PASSWORD:"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full"
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-center mb-6">
            <button
              type="submit"
              className="bg-dark-green text-black rounded-[50%] px-[50px] py-[10px] font-bold text-[24px] italic"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInAdmin;
