import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import gsap from "gsap";

// Get canvas element
const canvasElement = document.getElementById("canvas");

// Define Scene and Camera
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
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

const cursor = {
  x: 0,
  y: 0
};

window.addEventListener("mousemove", (event) => {
  // console.log(event.clientX, event.clientY);
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

scene.add(camera);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: "purple" });

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const light = new THREE.AmbientLight(0x404040);
const directionalLight = new THREE.DirectionalLight();
directionalLight.position.z = 4;
directionalLight.position.y = 2;
scene.add(light);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({
  canvas: canvasElement
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// let time = Date.now();
// const clock = new THREE.Clock();
// gsap.to(mesh.position, { duration: 1, x: 2 }).repeat();

// Animations
function tick() {
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;
  // const elapsedTime = clock.getElapsedTime();

  // // Update camera with event mousemove
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) + 3;
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) + 3;
  // camera.position.y = -cursor.y * 3;
  camera.lookAt(mesh.position);

  // Update controls
  controls.update();

  // Render in each frame
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();
