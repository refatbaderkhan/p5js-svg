import "./App.css";
import React from "react";
import GlowingSVG from "./GlowingSVG";
import parseSVG from "./parseSVG";
import FinalSVG from "./Final_SVG";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#fadadd",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: "2rem",
      }}
    >
      <div>
        <FinalSVG />
      </div>
    </div>
  );
}

export default App;
