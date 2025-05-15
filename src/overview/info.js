import React from "react";
import { Link } from "react-router-dom";

const Info = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/overview/info2.jpg)`,
        backgroundSize: "cover",           // ✅ fills the space
        backgroundPosition: "center",      // ✅ centers image
        backgroundRepeat: "no-repeat",     // ✅ no tiling
        padding: "4rem 1rem",
        backgroundColor: "#f4f4f4",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "2rem",
          backgroundColor: "#d0d0d0",
          borderRadius: "1rem",
        }}
      >
        <h2 style={{ fontSize: "1.75rem", fontWeight: "600", marginBottom: "2rem" }}>
          Want to know more about Saudi’s 2030 Vision?
        </h2>
        <Link
          to="/vision2030"
          style={{
            backgroundColor: "#1c1c1c",
            color: "white",
            padding: "0.75rem 2rem",
            borderRadius: "2rem",
            textDecoration: "none",
            fontSize: "0.95rem",
          }}
        >
          Discover more
        </Link>
      </div>
    </div>
  );
};

export default Info;
