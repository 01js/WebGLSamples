import React, { useEffect, useRef } from 'react';
import RenderContext from '../../lib/RenderContext'
const Dashboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const gl = RenderContext.getGL()
    }
  })
  return (
    <div>
      <canvas width="400" height="300" ref={ canvasRef } id="canvas"></canvas>
    </div>
  );
};

export default Dashboard;