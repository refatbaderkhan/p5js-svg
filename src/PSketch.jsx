import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

export default (props) => {
  const [paths, setPaths] = useState([]);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => {
      const pathElements = document.querySelectorAll(".glow-path");
      const pathData = Array.from(pathElements).map((el) => {
        const d = el.getAttribute("d");
        const path2d = new Path2D(d);
        const bbox = el.getBBox();
        return { path2d, bbox, element: el };
      });
      setPaths(pathData);

      // Calculate scaling and offset for mobile
      if (window.innerWidth <= 768) {
        const svgWrapper = document.getElementById("svg-wrapper");
        const svgContainer = document.getElementById("svg-container");
        if (svgWrapper && svgContainer) {
          const scale = svgWrapper.offsetWidth / 683;
          setScaleFactor(scale);

          // Calculate centering offset
          const containerHeight = svgContainer.offsetHeight;
          const scaledHeight = 930 * scale;
          const yOffset = (containerHeight - scaledHeight) / 2;
          setOffset({ x: 0, y: yOffset });
        }
      }
    }, 100);
  }, []);

  const setup = (p5, canvasParentRef) => {
    const container = document.getElementById("svg-container");
    if (container) {
      const { width, height } = container.getBoundingClientRect();
      p5.createCanvas(width, height).parent(canvasParentRef);
    }
  };

  const draw = (p5) => {
    p5.clear();

    if (paths.length > 0) {
      const originalPathColor = p5.color("#F0436A");
      const growLightColor = p5.color("#F6E506");
      const pulse = p5.sin(p5.frameCount * 0.05);
      const sizeMultiplier = p5.map(pulse, -1, 1, 1, 1.8);

      p5.push();
      if (window.innerWidth <= 768) {
        p5.translate(offset.x, offset.y);
        p5.scale(scaleFactor);
      }

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

  const windowResized = (p5) => {
    const container = document.getElementById("svg-container");
    if (container) {
      const { width, height } = container.getBoundingClientRect();
      p5.resizeCanvas(width, height);

      // Recalculate scaling on resize
      if (window.innerWidth <= 768) {
        const svgWrapper = document.getElementById("svg-wrapper");
        const svgContainer = document.getElementById("svg-container");
        if (svgWrapper && svgContainer) {
          const scale = svgWrapper.offsetWidth / 683;
          setScaleFactor(scale);

          const containerHeight = svgContainer.offsetHeight;
          const scaledHeight = 930 * scale;
          const yOffset = (containerHeight - scaledHeight) / 2;
          setOffset({ x: 0, y: yOffset });
        }
      }
    }
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};
