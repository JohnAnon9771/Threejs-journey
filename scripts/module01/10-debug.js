import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import gsap from "gsap";
import * as dat from "dat.gui";

// Initialize debug
const gui = new dat.GUI();

// Get canvas element
const canvasElement = document.getElementById("canvas");

// Define Scene and Camera
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const fov = 75;
const aspectRatio = sizes.width / sizes.height;
const near = 1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
// const camera = new THREE.OrthographicCamera(
//   -2 * aspectRatio,
//   2 * aspectRatio,
//   2,
//   -2,
//   near,
//   far
// );
camera.position.y = 1;
camera.position.z = 3;

// Controls
const controls = new OrbitControls(camera, canvasElement);
controls.enableDamping = true;
// controls.target.y = 2
// controls.update()

scene.add(camera);

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshPhongMaterial({ color: "purple" });

const mesh = new THREE.Mesh(geometry, material);

gui.add(mesh.position, "y").min(-3).max(3).step(0.01);
gui.add(mesh.position, "x").min(-3).max(3).step(0.01);
gui.add(mesh.position, "z").min(-3).max(3).step(0.01);
gui.add(mesh, "visible");

scene.add(mesh);

const light = new THREE.AmbientLight(0x404040);
const directionalLight = new THREE.DirectionalLight();
directionalLight.position.z = 4;
directionalLight.position.y = 2;
scene.add(light);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({
  canvas: canvasElement,
  antialias: true,
});

window.addEventListener("resize", (event) => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Animations
function tick() {
  camera.lookAt(mesh.position);

  // Update controls
  controls.update();

  // Render in each frame
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();
