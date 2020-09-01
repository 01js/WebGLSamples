import React, { useEffect, useRef } from "react";
import vertexShaderSource from "./shaders/vshader.glsl";
import fragShaderSource from "./shaders/fragment.glsl";
import RenderContext from "../../lib/RenderContext";

const HelloPoint1: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const renderContext = new RenderContext(
        canvasRef.current.getContext("webgl"),
        vertexShaderSource,
        fragShaderSource
      );
      let gl = renderContext.getGL();
      // Specify the color for clearing <canvas>
      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      // Clear <canvas>
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Draw a point
      gl.drawArrays(gl.POINTS, 0, 1);
    }
  });
  return (
    <div>
      <canvas width="400" height="400" ref={canvasRef} id="canvas"></canvas>
    </div>
  );
};

export default HelloPoint1;
