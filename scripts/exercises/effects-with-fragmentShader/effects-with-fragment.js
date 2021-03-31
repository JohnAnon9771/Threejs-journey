import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

import spaceImg from "./assets/space.jpg";
import image from "./assets/image.png";

import fragmentShader from "./glsl/fragment.glsl";
import vertexShader from "./glsl/vertex.glsl";

const canvasElement = document.getElementById("canvas");

const gui = new dat.GUI();

const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const fov = 75;
const aspectRatio = sizes.width / sizes.height;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
camera.position.z = 1;
const controls = new OrbitControls(camera, canvasElement);
controls.enableDamping = true;

scene.add(camera);

// Raycasting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener(
  "mousemove",
  (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  },
  false
);

const geometry = new THREE.PlaneGeometry(1.92, 1.08, 64, 64);
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0.0 },
    uTexture: { value: new THREE.TextureLoader().load(spaceImg) },
    uTextureImage: { type: "t", value: new THREE.TextureLoader().load(image) },
    progress: { type: "f", value: 0.0 },
    mouse: { type: "v3", value: new THREE.Vector3() },
  },
  fragmentShader,
  vertexShader,
});
const mesh = new THREE.Mesh(geometry, material);

gui
  .add(material.uniforms.progress, "value")
  .name("progress")
  .min(-3)
  .max(3)
  .step(0.1);

scene.add(mesh);

const renderer = new THREE.WebGLRenderer({
  canvas: canvasElement,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0xffffff, 1);

const clock = new THREE.Clock();

function render() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length) {
    material.uniforms.progress.value += 0.00015;
    material.uniforms.mouse.value = intersects[0].point;
  } else {
    material.uniforms.progress.value = 0;
  }
}

function tick() {
  material.uniforms.uTime.value = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render in each frame
  render();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();
