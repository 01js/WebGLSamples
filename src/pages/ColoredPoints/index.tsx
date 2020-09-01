import React, { useEffect, useRef, useState } from "react";
import vertexShaderSource from "./shaders/vshader.glsl";
import fragShaderSource from "./shaders/fragment.glsl";
import RenderContext from "../../lib/RenderContext";
import useEventListener from "../../hooks/useEventListener/index";

const ColoredPoints: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gPoints, setGPoints] = useState<Array<Array<number>>>([]);
  const [gColors, setGColors] = useState<Array<Array<number>>>([]);
  const savedRenderContext = useRef<RenderContext>();

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      savedRenderContext.current = new RenderContext(
        canvasRef.current.getContext("webgl"),
        vertexShaderSource,
        fragShaderSource
      );
    }
  }, [canvasRef]);

  useEffect(() => {
    if (savedRenderContext.current) {
      let gl = savedRenderContext.current.getGL();
      let program = savedRenderContext.current.getProgram();
      let a_Position = gl.getAttribLocation(program, "a_Position");
      let u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
      if (gPoints.length > 0 && gColors.length > 0 && gPoints.length === gColors.length) {
        if (gl) {
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
        var len = gPoints.length;
        for(var i = 0; i < len; i += 1) {
          var xy = gPoints[i];
          var rgba = gColors[i];
          // Pass the position of a point to a_Position variable
          gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
          // Pass the color of a point to u_FragColor variable
          gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
          // Draw
          gl.drawArrays(gl.POINTS, 0, 1);
        }
      } else {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
    }
  }, [gPoints, gColors]);
  const clickHandler = (ev: MouseEvent) => {
    let x = ev.clientX; // x coordinate of a mouse pointer
    let y = ev.clientY; // y coordinate of a mouse pointer
    if (ev.target) {
      const target = ev.target as HTMLCanvasElement;
      let rect = target.getBoundingClientRect();
      x = (x - rect.left - target.width / 2) / (target.width / 2);
      y = (target.height / 2 - (y - rect.top)) / (target.height / 2);
      // Store the coordinates to g_points array
      const gPointsArr:Array<Array<number>> = JSON.parse(JSON.stringify(gPoints))
      const gColorsArr:Array<Array<number>> = JSON.parse(JSON.stringify(gColors))
      gPointsArr.push([x, y]);

      if (x >= 0.0 && y >= 0.0) {      // First quadrant
        gColorsArr.push([1.0, 0.0, 0.0, 1.0]);  // Red
      } else if (x < 0.0 && y < 0.0) { // Third quadrant
        gColorsArr.push([0.0, 1.0, 0.0, 1.0]);  // Green
      } else {                         // Others
        gColorsArr.push([1.0, 1.0, 1.0, 1.0]);  // White
      }
      setGPoints(gPointsArr);
      setGColors(gColorsArr);
    }
  };
 
  useEventListener("click", clickHandler, { target: canvasRef });

  return (
    <div>
      <canvas width="400" height="400" ref={canvasRef} id="canvas"></canvas>
    </div>
  );
};

export default ColoredPoints;
