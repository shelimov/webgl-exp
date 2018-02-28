/// <reference path="webgl.d.ts" />
import fragmentShaderSource from './shaders/main.fs';
import vertexShaderSource from './shaders/main.vs';
import { createProgram, createShader, createBuffer } from './utils';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const vertexArray = [
    150, 150,
    300, 300,
    300, 150,
    150, 150,
    150, 300,
    300, 300,
];
const componentsNum = 2;
const vertexCount = vertexArray.length / componentsNum;

const gl = canvas.getContext('webgl');
const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertex, fragment);

const aPositionLocation = gl.getAttribLocation(program, 'aPosition');
const uTranslation = gl.getUniformLocation(program, 'uTranslation');
const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');

appLoop((t, dt) => {
    const buffer = createBuffer(gl, vertexArray);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1);
    
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.enableVertexAttribArray(aPositionLocation);
    gl.vertexAttribPointer(aPositionLocation, componentsNum, gl.FLOAT, false, 0, 0);
    gl.uniform2fv(uResolutionLocation, [canvas.width, canvas.height]);
    gl.uniform1i(uTranslation, t);
    
    gl.drawArrays(gl.TRIANGLES, 0, vertexCount);

});

function appLoop(fn) {
    const initTime = Date.now();
    let time = Date.now();
    let animationFrameId = null;

    const callFn = () => {
        const now = Date.now();
        const diff = now - time;
        time = now;
        fn(time - initTime, diff / 100);
        animationFrameId = window.requestAnimationFrame(callFn);
    }

    callFn();
    return () => {
        window.cancelAnimationFrame(animationFrameId);
    };
}