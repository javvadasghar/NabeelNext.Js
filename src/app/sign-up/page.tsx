"use client";
import TextInput from "@/components/Form/TextInput";
import Image from "next/image";
import axios from "axios";
import { FC, useState } from "react";
import { toast } from "sonner";

const SignUp: FC = () => {
  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    retypepassword: "",
    city: "",
    state: "",
    zip: "",
    mailingAddress: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    localStorage.removeItem("email");
    if (formData.password !== formData.retypepassword) {
      setError("Passwords do not match.");
      return;
    }
    const SignUpPostApi =
      `${process.env.NEXT_PUBLIC_API}/api/auth/signup`;

    try {
      await axios.post(SignUpPostApi, formData).then((response) => {
        if (response) {
          localStorage.setItem("email", formData.email);
          setFormSubmitted(true);
          toast.success(
            "Sign up Completed. Verification email has been sent, Please check Spam Folder"
          );
        }
      });
    } catch (error) {
      // setError(error?.response?.data?.message);
    }
  };

  const handleVerficationcodeSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const getEmail = localStorage.getItem("email");
    if (!getEmail) return;
    else {
      const VerficationcodeSendApi = `${process.env.NEXT_PUBLIC_API}/api/auth/resendVerificationEmail/${getEmail}`;

      try {
        await axios.post(VerficationcodeSendApi, formData).then((response) => {
          if (response) {
            toast.success(
              "Verification email has been sent again, Please check Spam Folder"
            );
          }
        });
      } catch (error) {
        // setError(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="p-4 ">
      <div className="bg-black border-2 border-bright-green p-2">
        <div className="text-center text-[30px] font-bold italic tracking-wider mb-4">
          - CREATE YOUR NEW ACCOUNT -
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <TextInput
              name="username"
              label="USERNAME:"
              value={formData.username}
              onChange={handleChange}
            />
            <TextInput
              label="PASSWORD:"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
            />
            <TextInput
              label="RETYPE PASSWORD:"
              name="retypepassword"
              value={formData.retypepassword}
              onChange={handleChange}
              type="password"
            />
            <TextInput
              label="EMAIL:"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
            />
            <TextInput
              label="MAILING ADDRESS:"
              name="mailingAddress"
              value={formData.mailingAddress}
              onChange={handleChange}
            />

            <div className="flex gap-4 pr-6">
              <TextInput
                label="CITY:"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full"
              />
              <TextInput
                label="STATE:"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full"
              />
              <TextInput
                label="ZIP:"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}

            <div className="flex justify-center pt-[100px] pb-[50px]">
              <div className="border-4 border-bright-green rounded-[50%] flex flex-col items-center px-[100px] py-[20px] w-fit">
                <div className="italic text-[24px] font-bold">
                  Click Here to finish
                </div>
                <button type="submit" className="italic text-[24px] font-bold">
                  creating you New Account
                </button>

                <Image
                  src="/images/underline.png"
                  alt="underline"
                  width={160}
                  height={40}
                />
              </div>
            </div>
            {formSubmitted && (
              <div className="flex justify-center">
                <div
                  onClick={handleVerficationcodeSend}
                  className="border-4 border-bright-green rounded-[50%] flex flex-col items-center px-[100px] py-[20px] w-fit"
                >
                  <div className="italic text-[16px] font-bold">
                    Did not get the Verification Email?
                  </div>
                  <button
                    type="submit"
                    className="italic text-[16px] font-bold"
                  >
                    Click here to Get Again
                  </button>

                  <Image
                    src="/images/underline.png"
                    alt="underline"
                    width={160}
                    height={40}
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
