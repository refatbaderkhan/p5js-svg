import "./App.css";
import React from "react";
import FinalSVG from "./Final_SVG";
import PSketch from "./PSketch";

function App() {
  return (
    <div
      style={{
        backgroundColor: "",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <PSketch SVG={FinalSVG} />
    </div>
  );
}

export default App;
