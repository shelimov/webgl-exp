import './global.css';

import fragmentShaderSource from './shaders/main.fs';
import vertexShaderSource from './shaders/main.vs';

import {
  createProgram,
  createShader,
  createIndiciesBuffer,
  createArrayBuffer,
  // createVertexArrayBuffer,
} from './utils';

import { createCanvas } from './createCanvas';
import { appLoop } from './appLoop';

const vertexArray = [
  150, 150,
  150, 300,
  300, 150,
  300, 300,
];

const indicesArray = [
  2, 1, 0, 3, 2, 1
];

function main() {
  const canvas = createCanvas();
  document.body.appendChild(canvas);

  const gl = canvas.getContext('webgl2')!;

  const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createProgram(gl, vertex, fragment);

  const aVertexPosition = gl.getAttribLocation(program, 'aPosition');
  const uTranslation = gl.getUniformLocation(program, 'uTranslation');
  const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');

  appLoop((timePassed) => {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    createArrayBuffer(gl, vertexArray);
    createIndiciesBuffer(gl, indicesArray);

    gl.vertexAttribPointer(aVertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexPosition);
    gl.uniform2fv(uResolutionLocation, [canvas.width, canvas.height]);
    gl.uniform1i(uTranslation, timePassed);

    gl.drawElements(gl.TRIANGLES, indicesArray.length, gl.UNSIGNED_SHORT, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  });
}

main();
