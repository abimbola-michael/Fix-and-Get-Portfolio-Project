import React from "react";
import AppButton from "./AppButton";

export default function LoginActions() {
  return (
    <div className="flex gap-2 items-center">
      <AppButton outline={false} link={"/login"}>
        Login
      </AppButton>
      <AppButton outline={true} link={"/signup"}>
        SignUp
      </AppButton>
    </div>
  );
}
