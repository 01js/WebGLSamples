import { initProgram } from './boot/initProgram';

export default class RenderContext {
  gl: WebGLRenderingContext | any;
  program: WebGLProgram | any;
  constructor(gl: WebGLRenderingContext | any, vertexShaderSource: string, fragShaderSource: string) {
    this.gl = gl;
    this.program = initProgram(gl, vertexShaderSource, fragShaderSource)
    this.gl.useProgram(this.program)
  }
  getGL(): WebGLRenderingContext {
    return this.gl;
  }
  getProgram(): WebGLProgram {
    return this.program
  }
}
