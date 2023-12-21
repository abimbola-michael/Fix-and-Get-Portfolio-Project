import React from "react";

export default function CircleProgressView({
  size = 120,
  progress = 0,
  progressColor = "rgb(59 130 246)",
  strokeColor = "#e0e0e0",
  strokeWidth = 10,
}) {
  return (
    <div className={`w-[${size}px] h-[${size}px]`}>
      <svg className={`w-[${size}px] h-[${size}px]`}>
        <circle
          className={`w-[${size}px] h-[${size}px]`}
          style={{
            stroke: strokeColor, // Choose the color for the background stroke
            strokeWidth: `${strokeWidth}px`, // Set the stroke width
            fill: "transparent",
            r: `${size / 2}`,
            cx: `${size / 2 + strokeWidth}`,
            cy: `${size / 2 + strokeWidth}`,
          }}
        />
        <circle
          className={`duration-500 ease-in-out w-[${size}px] h-[${size}px]`}
          style={{
            stroke: progressColor, // Choose the color for the background stroke
            strokeWidth: `${strokeWidth}px`, // Set the stroke width
            fill: "transparent",
            r: `${size / 2}`,
            cx: `${size / 2 + strokeWidth}`,
            cy: `${size / 2 + strokeWidth}`,
            strokeDasharray: "314", // Circumference of the circle
            strokeDashoffset: ((100 - progress) / 100) * 314,
            transition: "stroke-dashoffset 0.35s",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
    </div>
  );
}
