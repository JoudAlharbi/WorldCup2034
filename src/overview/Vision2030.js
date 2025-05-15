import React from "react";

const Vision2030 = () => {
  return (
    <div style={{ padding: "4rem 1rem", textAlign: "center", backgroundColor: "#f4f4f4" }}>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "2rem",
          backgroundColor: "#d0d0d0",
          borderRadius: "1rem",
        }}
      >
        <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          Saudi Arabia was announced on December 12, 2024, as the host of the 2034 World Cup— 
          achieving the highest bid score in history. Under the slogan <strong>#Welcome_to_the_World</strong>, 
          the Kingdom aims to offer a world-class experience, aligned with Vision 2030 to become a global sports hub.
        </p>

        {/* 🎥 Embedded Video */}
        <div style={{ marginTop: "2rem", borderRadius: "1rem", overflow: "hidden" }}>
          <video
            width="100%"
            height="300"
            controls
            style={{ borderRadius: "1rem" }}
          >
            <source src={`${process.env.PUBLIC_URL}/overview/vid_vis.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Vision2030;
