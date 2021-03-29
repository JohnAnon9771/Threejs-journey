precision mediump float;

varying vec2 vUv;
uniform float uTime;
varying float vWave;

void main() {
  vUv = uv;

  gl_Position = vec4(position, 1.);
}