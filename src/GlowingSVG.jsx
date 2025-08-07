// src/components/GlowingSVG.jsx
import React, { useRef, useEffect } from "react";
import p5 from "p5";

const GlowingSVG = ({ svgPath }) => {
  //   const canvasRef = useRef(null);

  //   useEffect(() => {
  //     const sketch = (p) => {
  //       let svg;

  //       p.preload = () => {
  //         // Load the SVG file from the specified path
  //         svg = p.loadSVG(svgPath);
  //       };

  //       p.setup = () => {
  //         // Create a canvas with the same dimensions as the SVG
  //         const svgWidth = svg.width;
  //         const svgHeight = svg.height;
  //         p.createCanvas(svgWidth, svgHeight);
  //       };

  //       p.draw = () => {
  //         p.clear();
  //         p.background(255); // A temporary background color to see the effect

  //         // Draw the SVG
  //         p.image(svg, 0, 0);

  //         // Here's where the glowing effect would be applied.
  //         // This is a simplified example; a full implementation requires
  //         // parsing the SVG or using a custom rendering function.
  //         // (See next section for more details)

  //         p.noLoop(); // Draw once since the SVG is static
  //       };
  //     };

  //     const p5Instance = new p5(sketch, canvasRef.current);

  //     return () => {
  //       p5Instance.remove();
  //     };
  //   }, [svgPath]);

  //   return <div ref={canvasRef} />;
  return <div svgPath />; // Placeholder for the SVG rendering logic
};

export default GlowingSVG;
