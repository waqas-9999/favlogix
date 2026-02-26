import React from "react";

function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white">

      {/* Background Images Wrapper */}
      <div className="absolute inset-0 -z-0">

        {/* BG 1 */}
        <img
          src="/images/1-bg.png"
          alt="bg-1"
          className="absolute pointer-events-none select-none"
          style={{
            width: "1455.723px",
            top: "-190px",
            left: "-872px",
            transform: "rotate(-30deg)",
            opacity: 0.55,
          }}
        />

        {/* BG 2 */}
        <img
          src="/images/1-bg.png"
          alt="bg-2"
          className="absolute pointer-events-none select-none"
          style={{
            width: "1455.723px",
            top: "-538px",
            left: "510px",
            transform: "rotate(105deg)",
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold">Your Text Here</h1>
      </div>

    </div>
  );
}

export default Home;