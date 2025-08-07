import "./App.css";
import React from "react";
// import GlowingSVG from "./GlowingSVG";
// import parseSVG from "./parseSVG";
import FinalSVG from "./Final_SVG";
import Sketch from "./PSketch";

function App() {
  return (
    <div
      style={{
        backgroundColor: "", // Fixed: removed quotes around black
        height: "100vh",
        width: "100vw", // Changed from 100vh to 100vw for full width
        margin: 0, // Remove default margins
        padding: 0, // Remove default padding
        overflowY: "hidden",
        overflowX: "hidden",
        position: "relative", // Added for proper positioning context
      }}
    >
      <div
        style={{
          position: "absolute", // Changed from fixed to absolute
          bottom: 0,
          left: 0,
          width: "auto", // Changed from 100% to auto for SVG natural width
          height: "auto", // Changed to auto for SVG natural height
        }}
      >
        <FinalSVG />
      </div>
    </div>
  );
}

export default App;
