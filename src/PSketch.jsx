import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

/*
// --- 🧪 EXPERIMENT: PARTICLE EMITTER ---
// Description: A class to manage individual particles for a particle system.
// To use this, uncomment this class and the corresponding code in the draw() function.
class Particle {
  constructor(p5, position) {
    this.p5 = p5;
    this.position = position.copy();
    this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-2, 0));
    this.lifespan = 255;
    this.color = p5.color("#ffdd55");
  }
  update() { this.position.add(this.velocity); this.lifespan -= 4; }
  draw() {
    this.p5.push();
    this.p5.noStroke();
    this.color.setAlpha(this.lifespan);
    this.p5.fill(this.color);
    this.p5.ellipse(this.position.x, this.position.y, 4);
    this.p5.pop();
  }
  isDead() { return this.lifespan < 0; }
}
*/

export default (props) => {
  const [paths, setPaths] = useState([]);
  // const [particles, setParticles] = useState([]); // For particle experiment

  useEffect(() => {
    setTimeout(() => {
      const pathElements = document.querySelectorAll(".glow-path");
      const pathData = Array.from(pathElements).map((el) => {
        const d = el.getAttribute("d");
        const path2d = new Path2D(d);
        const bbox = el.getBBox();
        return { path2d, bbox, element: el }; // Storing element for other experiments
      });
      setPaths(pathData);
    }, 100);
  }, []);

  const setup = (p5, canvasParentRef) => {
    const container = document.getElementById("svg-container");

    const resizeCanvasToContainer = () => {
      if (container) {
        const { width, height } = container.getBoundingClientRect();
        const canvas = p5.createCanvas(width, height).parent(canvasParentRef);

        // For mobile devices, we need to scale the canvas to match SVG scaling
        if (window.innerWidth <= 768) {
          const svgWrapper = document.getElementById("svg-wrapper");
          const scale = svgWrapper.offsetWidth / 683; // 683 is SVG viewBox width
          p5.drawingContext.scale(scale, scale);
        }
      }
    };

    resizeCanvasToContainer();
  };

  const draw = (p5) => {
    p5.clear();

    // --- ✨ ACTIVE EFFECT: Radiating Grow Light Circles ---
    // Description: Draws concentric circles that pulse in size, creating a radiating aura.
    if (paths.length > 0) {
      const originalPathColor = p5.color("#F0436A");
      const growLightColor = p5.color("#F6E506"); // A yellow color

      // Create a pulsating value using a sine wave that changes over time.
      const pulse = p5.sin(p5.frameCount * 0.05);
      // Map the pulse (-1 to 1) to a size multiplier (e.g., 0.9 to 1.1) to make the glow swell and shrink.
      const sizeMultiplier = p5.map(pulse, -1, 1, 0.9, 1.5);

      paths.forEach(({ path2d, bbox }) => {
        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;
        const maxRadius = Math.max(bbox.width, bbox.height);

        p5.push();
        p5.noStroke();
        // Draw concentric circles to create the glow.
        for (let i = 10; i > 0; i--) {
          const alpha = p5.map(i, 10, 0, 10, 80);
          growLightColor.setAlpha(alpha);
          p5.fill(growLightColor);
          // Apply the sizeMultiplier to the radius to make it pulse.
          const radius = maxRadius * i * 0.15 * sizeMultiplier;
          p5.circle(centerX, centerY, radius);
        }
        p5.pop();

        // Draw the original SVG path on top of its glow.
        p5.push();
        p5.noStroke();
        p5.fill(originalPathColor);
        p5.drawingContext.fill(path2d); // ✅ Correct spelling
        p5.pop();
      });
    }

    /*
    // --- 🧪 EXPERIMENT 1: PULSATING PATH GLOW ---
    // Description: Makes the SVG paths themselves glow with a smooth, pulsating rhythm.
    // To use this, comment out the "ACTIVE EFFECT" block above and uncomment this one.
    if (paths.length > 0) {
      const glowColor = p5.color("#ffdd55");
      const pulse = p5.sin(p5.frameCount * 0.03);
      const baseGlow = p5.map(pulse, -1, 1, 20, 70);

      p5.push();
      p5.drawingContext.shadowColor = glowColor;
      p5.fill(glowColor);
      p5.noStroke();
      p5.drawingContext.shadowBlur = baseGlow;
      paths.forEach((p) => p5.drawingContext.fill(p.path2d));
      p5.drawingContext.shadowBlur = baseGlow * 0.4;
      paths.forEach((p) => p5.drawingContext.fill(p.path2d));
      p5.drawingContext.shadowBlur = baseGlow * 0.1;
      paths.forEach((p) => p5.drawingContext.fill(p.path2d));
      p5.pop();
    }
    */

    /*
    // --- 🧪 EXPERIMENT 2: PARTICLE EMITTER ---
    // Description: Emits glowing particles from the outlines of the SVG paths.
    // To use this, you must also uncomment the Particle class at the top of the file
    // and the `particles` state variable.
    if (paths.length > 0) {
      // Pick a random path to emit from this frame.
      const randomPathData = p5.random(paths);
      if (randomPathData && randomPathData.element) {
        const pathLength = randomPathData.element.getTotalLength();
        // Pick a random point along that path.
        const pointOnPath = randomPathData.element.getPointAtLength(p5.random(pathLength));
        // Create a new particle at that point.
        const newParticle = new Particle(p5, p5.createVector(pointOnPath.x, pointOnPath.y));
        // Add it to our array (requires uncommenting the 'particles' state).
        // setParticles(prev => [...prev, newParticle]);
      }
    }
    // Update and draw particles (requires uncommenting the 'particles' state).
    // for (let i = particles.length - 1; i >= 0; i--) {
    //     const p = particles[i];
    //     p.update();
    //     p.draw();
    //     if (p.isDead()) {
    //         setParticles(prev => prev.filter((_, index) => index !== i));
    //     }
    // }
    */
  };

  const windowResized = (p5) => {
    const container = document.getElementById("svg-container");
    if (container) {
      const { width, height } = container.getBoundingClientRect();
      p5.resizeCanvas(width, height);

      // Reset scaling and reapply if needed
      p5.drawingContext.resetTransform();
      if (window.innerWidth <= 768) {
        const svgWrapper = document.getElementById("svg-wrapper");
        const scale = svgWrapper.offsetWidth / 683;
        p5.drawingContext.scale(scale, scale);
      }
    }
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};
