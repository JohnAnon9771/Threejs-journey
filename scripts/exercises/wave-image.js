import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import img from "./assets/joker.jpg";

import vertexShader from "./glsl/vertex.glsl";
import fragmentShader from "./glsl/fragment.glsl";

const canvasElement = document.getElementById("canvas");

const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

const fov = 75;
const aspectRatio = sizes.width / sizes.height;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
camera.position.z = 1;

scene.add(camera);

const controls = new OrbitControls(camera, canvasElement);
controls.enableDamping = true;

const geometry = new THREE.PlaneGeometry(0.4, 0.6, 64, 64);
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0.0 },
    uTexture: { value: new THREE.TextureLoader().load(img) }
  },
  vertexShader,
  fragmentShader
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const renderer = new THREE.WebGLRenderer({
  canvas: canvasElement,
  antialias: true
});

renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0xffffff, 1);

const clock = new THREE.Clock();

function tick() {
  material.uniforms.uTime.value = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render in each frame
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();
