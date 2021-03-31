varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform float progress;
uniform vec3 mouse;

uniform sampler2D uTexture;
uniform sampler2D uTextureImage;

float map(float value, float min1, float max1, float min2, float max2){
  return min2 + (value-min1) * (max2 - min2) / (max1 - min1);
}

void main(){
  vec4 displacement = texture2D(uTextureImage, vUv.yx);

  vec2 direction = normalize(vPosition.xy - mouse.xy);
  float dist = length(vPosition - mouse);
  float prox = 1. - map(dist, 0., 0.4, 0., 1.);

  prox = clamp(prox, 0., 1.);

  vec2 zoomedUV = mix(vUv, mouse.xy + vec2(0.5), prox*progress);

  vec2 displacementUV = zoomedUV;
  displacementUV.y = mix(vUv.y, displacement.r - 0.2,progress);

  vec4 color = texture2D(uTexture, displacementUV);

  color.r = texture2D(uTexture, displacementUV + vec2(0.,10.*0.005)*progress).r;
  color.g = texture2D(uTexture, displacementUV + vec2(0.,10.*0.01)*progress).g;
  color.b = texture2D(uTexture, displacementUV + vec2(0.,10.*0.02)*progress).b;

  gl_FragColor = color;
}
