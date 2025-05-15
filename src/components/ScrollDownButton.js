// ScrollDownButton.js
import React from "react";

const ScrollDownButton = ({ targetId }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <a href={`#${targetId}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ color: "white", animation: "bounce 1s infinite" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </a>
      <p style={{ fontSize: "0.875rem", marginTop: "0.5rem", color: "white" }}>scroll down</p>
    </div>
  );
};

export default ScrollDownButton;