varying vec2 vUv;
varying float vWave;
uniform sampler2D uTexture;

void main(){
  vec3 texture = vec3(texture2D(uTexture, vUv));
  gl_FragColor = vec4(texture, 1.);
}