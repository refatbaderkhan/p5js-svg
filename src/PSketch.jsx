import React from "react";
import Sketch from "react-p5";

export default (props) => {
  const { SVG } = props;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  const draw = (p5) => {
    // p5.background(0);
    // p5.ellipse(x, y, 70, 70);
    // x++;
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <>
      <SVG />
      <Sketch setup={setup} draw={draw} windowResized={windowResized} />
    </>
  );
};
