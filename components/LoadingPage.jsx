import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#4299e1",
};
export default function Loading() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <ClipLoader
        color={"#4299e1"}
        loading={true}
        cssOverride={override}
        size={50}
        aria-label="Loading..."
        data-testid="loader"
      />
    </div>
  );
}
