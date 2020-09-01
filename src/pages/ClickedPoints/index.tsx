import React, { useEffect, useRef, useState } from "react";
import vertexShaderSource from "./shaders/vshader.glsl";
import fragShaderSource from "./shaders/fragment.glsl";
import RenderContext from "../../lib/RenderContext";
import useEventListener from "../../hooks/useEventListener/index";

const ClickedPoints: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gPoints, setGPoints] = useState<Array<number>>([]);
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
      if (gPoints.length > 0) {
        if (gl) {
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
        var len = gPoints.length;
        for(var i = 0; i < len; i += 2) {
          // Pass the position of a point to a_Position variable
          gl.vertexAttrib3f(a_Position, gPoints[i], gPoints[i+1], 0.0);
          // Draw
          gl.drawArrays(gl.POINTS, 0, 1);
        }
      } else {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
    }
  }, [gPoints]);
  const clickHandler = (ev: MouseEvent) => {
    let x = ev.clientX; // x coordinate of a mouse pointer
    let y = ev.clientY; // y coordinate of a mouse pointer
    if (ev.target) {
      const target = ev.target as HTMLCanvasElement;
      let rect = target.getBoundingClientRect();
      x = (x - rect.left - target.width / 2) / (target.width / 2);
      y = (target.height / 2 - (y - rect.top)) / (target.height / 2);
      // Store the coordinates to g_points array
      const arr:Array<number> = JSON.parse(JSON.stringify(gPoints))
      arr.push(x);
      arr.push(y);
      setGPoints(arr);
    }
  };
 
  useEventListener("click", clickHandler, { target: canvasRef });

  return (
    <div>
      <canvas width="400" height="400" ref={canvasRef} id="canvas"></canvas>
    </div>
  );
};

export default ClickedPoints;
