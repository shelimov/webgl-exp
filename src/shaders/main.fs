precision mediump float;
varying vec2 vColor;

void main() {
  gl_FragColor = vec4(vec3(vColor, 0) * 0.5 + 0.5, 1);
}
