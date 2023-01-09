export function createShader(context: WebGL2RenderingContext, type: GLenum, source: string) {
  const shader = context.createShader(type)!;

  context.shaderSource(shader, source);
  context.compileShader(shader);

  const error = context.getShaderInfoLog(shader);
  console.assert(!error?.length, error!);
  return shader;
}

export function createProgram(context: WebGL2RenderingContext, vertex: WebGLShader, fragment: WebGLShader) {
  const program = context.createProgram()!;

  context.attachShader(program, vertex);
  context.attachShader(program, fragment);
  context.linkProgram(program);
  context.useProgram(program);

  const error = context.getProgramInfoLog(program);
  console.assert(!error?.length, error!);
  return program;
}

export function createIndiciesBuffer(context: WebGL2RenderingContext, data: number[]) {
  const buffer = context.createBuffer();
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, buffer);
  context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), context.STATIC_DRAW);
}

export function createArrayBuffer(context: WebGL2RenderingContext, data: number[]) {
  const buffer = context.createBuffer();
  context.bindBuffer(context.ARRAY_BUFFER, buffer);
  context.bufferData(context.ARRAY_BUFFER, new Float32Array(data), context.STATIC_DRAW);
}

export function createVertexArrayBuffer(context: WebGL2RenderingContext, data: number[]) {
  const buffer = context.createVertexArray();
  context.bindBuffer(context.ARRAY_BUFFER, buffer);
  context.bufferData(context.ARRAY_BUFFER, new Float32Array(data), context.STATIC_DRAW);

  return buffer;
}
