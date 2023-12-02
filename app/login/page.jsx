"use client";
import Header from "@/components/Header";
import LoginButton from "@/components/LoginButton";
import LoginInput from "@/components/LoginInput";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function resetInputs() {
    setEmail("");
    setPassword("");
  }
  function loginAccount() {
    if (password === "" || email === "") return;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
      .finally(() => {
        resetInputs();
      });
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex my-4 h-full items-center justify-center">
        <div className="w-[50%] hidden md:block">
          <Image
            className="object-cover w-full h-full rounded-r-lg"
            src="/images/mechanic.jpg"
            alt="mechanic_imag"
            width={500}
            height={500}
          />
        </div>
        <div className="w-full md:w-[50%] flex flex-col items-center justify-center text-center px-[15%] md:px-[10%]">
          <h1 className="font-bold text-2xl mb-2">Login</h1>
          {/* <p className="mb-2 text-sm">Enter your details below</p> */}
          <LoginInput
            placeholder={"Email"}
            value={email}
            onChange={setEmail}
            type="email"
          />

          <LoginInput
            placeholder={"Password"}
            value={password}
            onChange={setPassword}
            type="password"
          />
          <LoginButton text={"Login"} onClick={loginAccount} />
          <LoginButton outline={true} text={"Log in with Google"} />
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500">
            Don&rsquo;t have an account?
            <Link
              href={"/signup"}
              className="text-gray-600 underline underline-offset-4"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
