precision mediump float;

attribute vec2 aPosition;
varying vec2 vColor;
uniform vec2 uResolution;
uniform int uTranslation;

void main() {
  float offset = sin(float(uTranslation) / 500.0) * 100.0;
  vec2 translatedPosition = vec2(aPosition.x, aPosition.y + offset);
  vec2 zeroToOne = translatedPosition / uResolution;
  vec2 clipspace = zeroToOne * 2.0 - 1.0;
  vColor = clipspace;
  gl_Position = vec4(clipspace, 0.0, 1.0);
}
