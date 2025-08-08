import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

export default (props) => {
  const [paths, setPaths] = useState([]);
  const [transform, setTransform] = useState({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  });

  // Initialize paths and calculate scaling
  useEffect(() => {
    setTimeout(() => {
      // Get all glow paths from SVG
      const pathElements = document.querySelectorAll(".glow-path");
      const pathData = Array.from(pathElements).map((el) => {
        const d = el.getAttribute("d");
        const path2d = new Path2D(d);
        const bbox = el.getBBox();
        return { path2d, bbox, element: el };
      });
      setPaths(pathData);

      // Calculate scaling and offset
      const container = document.getElementById("svg-container");
      const svg = container?.querySelector("svg");

      if (container && svg) {
        const containerRect = container.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();

        const scale = Math.min(
          containerRect.width / 683, // SVG viewBox width
          containerRect.height / 930 // SVG viewBox height
        );

        const offsetX = (containerRect.width - 683 * scale) / 2 / scale;
        const offsetY = (containerRect.height - 930 * scale) / 2 / scale;

        setTransform({ scale, offsetX, offsetY });
      }
    }, 100);
  }, []);

  // Setup p5 canvas
  const setup = (p5, canvasParentRef) => {
    const container = document.getElementById("svg-container");
    if (container) {
      const { width, height } = container.getBoundingClientRect();
      p5.createCanvas(width, height).parent(canvasParentRef);
    }
  };

  // Main drawing function
  const draw = (p5) => {
    p5.clear();

    if (paths.length > 0) {
      const originalPathColor = p5.color("#F0436A");
      const growLightColor = p5.color("#F6E506");

      // Create pulsating effect
      const pulse = p5.sin(p5.frameCount * 0.05);
      const sizeMultiplier = p5.map(pulse, -1, 1, 1, 1.8);

      p5.push();

      // Apply scaling and centering transform
      p5.translate(transform.offsetX, transform.offsetY);
      p5.scale(transform.scale);

      // Draw each path with glow effect
      paths.forEach(({ path2d, bbox }) => {
        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;
        const maxRadius = Math.max(bbox.width, bbox.height);

        // Draw glow circles
        p5.push();
        p5.noStroke();
        for (let i = 10; i > 0; i--) {
          const alpha = p5.map(i, 10, 0, 10, 90);
          growLightColor.setAlpha(alpha);
          p5.fill(growLightColor);
          const radius = maxRadius * i * 0.15 * sizeMultiplier;
          p5.circle(centerX, centerY, radius);
        }
        p5.pop();

        // Draw original path
        p5.push();
        p5.noStroke();
        p5.fill(originalPathColor);
        p5.drawingContext.fill(path2d);
        p5.pop();
      });

      p5.pop();
    }
  };

  // Handle window resize
  const windowResized = (p5) => {
    const container = document.getElementById("svg-container");
    if (container) {
      const { width, height } = container.getBoundingClientRect();
      p5.resizeCanvas(width, height);

      // Recalculate transform on resize
      const svg = container.querySelector("svg");
      if (svg) {
        const containerRect = container.getBoundingClientRect();
        const scale = Math.min(
          containerRect.width / 683,
          containerRect.height / 930
        );

        const offsetX = (containerRect.width - 683 * scale) / 2 / scale;
        const offsetY = (containerRect.height - 930 * scale) / 2 / scale;

        setTransform({ scale, offsetX, offsetY });
      }
    }
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};
