import React from "react";
import Overview2 from "./overview2";
import WorldCupTimeline from "./worldCups";
import Vision from "./vision";
import FuturePlans from "./future";
import Goals from "./goals";
import Statistics from "./statistics";
import Info from "./info";
const Overview = () => {
  return (
    <div>
      {/* Hero / landing section */}
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/overview/first.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          height: "100vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "black",
            opacity: 0.5,
            zIndex: 0,
          }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            padding: "0 4rem",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", maxWidth: "600px" }}>
            Overview of FIFA World Cup 2034!
          </h1>
        </div>

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
          <a href="#details">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: "white", animation: "bounce 1s infinite" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <p style={{ fontSize: "0.875rem", marginTop: "0.5rem", color: "white" }}>
            scroll down
          </p>
        </div>
      </div>

      {/* Overview2 Section */}
      <section id="details">
        <Overview2 />
      </section>
    
  {/* WorldCupTimeline Section */}
  <section id="details2">
  <WorldCupTimeline />
</section>
{/* vision Section */}
<section id="vision">
  <Vision />
</section>
{/* future Section */}
<section id="future">
  <FuturePlans />
</section>
{/* goals Section */}
<section id="goals">
  <Goals />
</section>
{/* statistics Section */}
<section id="statistics">
  <Statistics/>
</section>
{/* info Section */}
<section id="info">
  <Info/>
</section>
</div>
);
};

export default Overview;