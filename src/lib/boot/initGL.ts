export function initGL(): WebGLRenderingContext {
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

  const gl: WebGLRenderingContext | null = canvas ? canvas.getContext('webgl') : null;

  if (!gl) {
    throw Error('gl init fail');
  }
  return gl;
}