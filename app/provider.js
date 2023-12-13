"use client";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { useRouter } from "next/navigation";
import { changeCurrentUserId } from "@/slices/appSlice";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ProviderChild>{children}</ProviderChild>
    </Provider>
  );
}

export function ProviderChild({ children }) {
  const dispatch = useDispatch();
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        dispatch(changeCurrentUserId(user?.uid ?? ""));
      }),
    []
  );
  return children;
}
