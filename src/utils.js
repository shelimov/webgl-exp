export function createShader(context, type, source) {
    const shader = context.createShader(type);
    
    context.shaderSource(shader, source);
    context.compileShader(shader);

    const error = context.getShaderInfoLog(shader);
    console.assert(!error.length, error);
    return shader;
}

export function createProgram(context, vertex, fragment) {
    const program = context.createProgram();
    
    context.attachShader(program, vertex);
    context.attachShader(program, fragment);
    context.linkProgram(program);
    context.useProgram(program);
    
    const error = context.getProgramInfoLog(program);
    console.assert(!error.length, error);
    return program;
}

export function createBuffer(context, data) {
    const buffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, buffer);
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(data), context.STATIC_DRAW);

    return buffer;
}