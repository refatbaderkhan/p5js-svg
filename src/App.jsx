import "./App.css";
import React from "react";
import FinalSVG from "./Final_SVG";
import PSketch from "./PSketch";

function App() {
  return (
    <div className="app">
      <div id="svg-wrapper">
        <div id="svg-container">
          <FinalSVG />
          <PSketch />
        </div>
      </div>
    </div>
  );
}

export default App;
