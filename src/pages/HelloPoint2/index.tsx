import React, { useEffect, useRef } from 'react';
import vertexShaderSource from './shaders/vshader.glsl'
import fragShaderSource from './shaders/fragment.glsl'
import RenderContext from '../../lib/RenderContext'

const HelloPoint2: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const renderContext = new RenderContext(canvasRef.current.getContext('webgl'), vertexShaderSource, fragShaderSource)
      let gl = renderContext.getGL()
      let program = renderContext.getProgram()
      let a_Position = gl.getAttribLocation(program, 'a_Position');
      gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, 1);
    }
  })
  return (
    <div>
      <canvas width="400" height="400" ref={ canvasRef } id="canvas"></canvas>
    </div>
  );
};

export default HelloPoint2;