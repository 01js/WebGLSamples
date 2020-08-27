import { initGL } from './boot/initGL';
export default class RenderContext {
  static gl: WebGLRenderingContext;

  static init() {
    if (RenderContext.gl) return;
    const gl = initGL();
  }
  static getGL(): WebGLRenderingContext {
    RenderContext.init();
    return RenderContext.gl;
  }
}
