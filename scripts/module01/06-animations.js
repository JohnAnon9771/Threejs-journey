import * as THREE from "three";
import gsap from "gsap";

// Scene and Camera
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
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
  canvas: document.getElementById("canvas")
});

renderer.setSize(sizes.width, sizes.height);
// renderer.render(scene, camera);

// let time = Date.now();
// const clock = new THREE.Clock();
// gsap.to(mesh.position, { duration: 1, x: 2 }).repeat();

// Animations
function tick() {
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;
  // const elapsedTime = clock.getElapsedTime();
  // camera.position.y = Math.sin(elapsedTime);
  // camera.position.x = Math.cos(elapsedTime);
  // camera.lookAt(mesh.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();
