"use client";
import Header from "@/components/Header";
import LoginButton from "@/components/LoginButton";
import LoginInput from "@/components/LoginInput";
import Logo from "@/components/Logo";
import { auth, db, logout, setValue } from "@/firebase";
import { addUser } from "@/firebase/firebase_api";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUserName] = useState("");

  const [password, setPassword] = useState("");
  const router = useRouter();

  function resetInputs() {
    setEmail("");
    setName("");
    setPhone("");
    setPassword("");
    setUserName("");
  }

  async function createAccount() {
    if (password === "" || email === "") return;
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userData = {
          userId: user.uid,
          name,
          email,
          phone,
          username,
        };
        await sendEmailVerification(user);
        await addUser(userData);
        await logout();
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
      {/* <Header /> */}
      <div className="w-full flex items-center justify-center p-3">
        <Logo />
      </div>
      <div className="flex grow my-4 h-full items-center justify-center">
        <div className="w-[50%] hidden md:block">
          <Image
            className="object-cover w-full h-full rounded-r-lg"
            src="/images/laptop.jpg"
            alt="laptop"
            width={500}
            height={500}
          />
        </div>
        <div className="w-full md:w-[50%] flex flex-col items-center justify-center text-center px-[15%] md:px-[10%]">
          <h1 className="font-bold text-2xl mb-2">Create Account</h1>
          {/* <p className="mb-2 text-sm">Enter your details below</p> */}
          <LoginInput placeholder={"Name"} value={name} onChange={setName} />
          <LoginInput
            placeholder={"Username"}
            value={username}
            onChange={setUserName}
          />

          <LoginInput
            placeholder={"Email"}
            value={email}
            onChange={setEmail}
            type="email"
          />
          <LoginInput
            placeholder={"Phone"}
            value={phone}
            onChange={setPhone}
            type="phone"
          />
          <LoginInput
            placeholder={"Password"}
            value={password}
            onChange={setPassword}
            type="password"
          />
          <LoginButton
            text={"Create Account"}
            onClick={createAccount}
            // onClick={() => router.push("/")}
          />
          <LoginButton outline={true} text={"Sign up with Google"} />
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500">
            Already have an account?
            <Link
              href={"/login"}
              className="text-gray-600 underline underline-offset-4"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
