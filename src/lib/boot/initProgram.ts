export const loadShader = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader => {
  const shader: WebGLShader | any = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const err = 'An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(err);
  }

  return shader;
}


export const initProgram = (gl: WebGLRenderingContext, vertexShaderSource: string, fragShaderSource: string): WebGLProgram | null => {
  
  const vertexShader: WebGLShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragShader: WebGLShader = loadShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);

  const program: WebGLProgram | any = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log('Failed to link program: ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program; 
}