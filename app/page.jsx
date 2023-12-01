"use client";
import CategoriesBar from "@/components/CategoriesBar";
import Header from "@/components/Header";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user && user.emailVerified) {
          const uid = user.uid;
        } else {
          router.push("/login");
        }
      }),
    [router]
  );
  const q = query(collection(db, "users"), orderBy("time", "desc"));
  useEffect(
    () =>
      onSnapshot(collection(db, "users"), (snapshot) => {
        const result = snapshot.docs.map((doc) => doc.data());
        console.log(result);
        setUsers(result);
      }),
    []
  );
  return (
    <main className="h-screen overflow-hidden flex flex-col">
      <Header />
      <CategoriesBar />
      {/* <ul>
        {users.map((user) => (
          <p key={user.email}>{user.name}</p>
        ))}
      </ul> */}
    </main>
  );
}
