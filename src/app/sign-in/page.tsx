"use client";
import TextInput from "@/components/Form/TextInput";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { FC } from "react";

const SignIn: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const SignInPostApi = "http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/auth/signin"
    try {
      const response = await fetch(SignInPostApi, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Failed to sign in');
      }
    } catch (error) {
      setError('Failed to sign in. Please try again.');
    }
  };

  const handleForgotPasswordClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      debugger;
      const response = await fetch(
        "http://iwiygi-dev-server-env.eba-tsczssg5.us-east-1.elasticbeanstalk.com/api/auth/forgotPassword",
        {
          method: "POST",
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      debugger;
      if (!response.ok) {
        debugger;
        throw new Error("Failed to submit email for password reset.");
      }
      // If successful, you might want to show a success message to the user
      console.log("Email submitted successfully:", email);
      // Close the modal after submission
      // handleCloseModal();
    } catch (error) {
      console.error("Error submitting email for password reset:", error);
      // Handle error gracefully, show error message to the user
    }
  };

  return (
    <div className="p-4 flex flex-col gap-[100px]">
      <div className="bg-black border-2 border-bright-green p-2">
      <form onSubmit={handleSubmit}>
        <div className="text-center text-[30px] font-bold italic tracking-wider mb-4">
          - MEMBER SIGN IN -
        </div>

        <div className="flex gap-4 mb-6">
          <TextInput label="USERNAME:"  value={username} onChange={(e) => setUsername(e.target.value)}   className="w-full" />
          <TextInput label="PASSWORD:" type="password" value={password}  onChange={(e) => setPassword(e.target.value)}   className="w-full" />
        </div>

        <div className="flex justify-center gap-8 mb-6">
          <div className="flex justify-center">
            <button type="submit" className="bg-dark-green text-black rounded-[50%] px-[50px] py-[10px] font-bold text-[24px] italic">
              Sign in
            </button>
          </div>

          <div className="flex justify-center">
            <button className="bg-dark-green text-black rounded-[50%] px-[50px] py-[10px] font-bold text-[24px] italic"
            onClick={handleForgotPasswordClick}>
              Forgot Your Password or Username?
            </button>
          </div>
        </div>
        </form>
      </div>

       {/* Modal */}
       {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-black border-2 border-bright-green p-2">
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            <form onSubmit={handleForgotPasswordSubmit}>
              <TextInput
                label="Enter your email:"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="mt-4 gap-4 flex justify-end">
                <button
                  type="button"
                  className="bg-dark-green text-black rounded-[50%] px-[50px] py-[10px] font-bold text-[24px] italic"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-dark-green text-black rounded-[50%] px-[50px] py-[10px] font-bold text-[24px] italic"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Link href="/sign-up">
        <div className="flex justify-center mb-[100px]">
          <div className="border-2 border-bright-green bg-black rounded-[50%] px-[200px] py-[10px] text-center flex flex-col items-center">
            <div className="italic text-[24px] font-bold">Not a Member ?</div>
            <div className="italic text-[24px] font-bold">
              Click here to Sign Up . . .
            </div>
            <div className="italic text-[24px] font-bold">
              It&apos;s Quick, Free & Easy !
            </div>

            <Image
              src="/images/underline.png"
              alt="underline"
              width={160}
              height={40}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SignIn;
