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

// Fullscreen with double click
window.addEventListener("dblclick", () => {
  // For work with safari
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    if (canvasElement.requestFullscreen) {
      canvasElement.requestFullscreen();
    } else if (canvasElement.webkitRequestFullscreen) {
      canvasElement.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});
// Controls
const controls = new OrbitControls(camera, canvasElement);
controls.enableDamping = true;
// controls.target.y = 2
// controls.update()

// const cursor = {
//   x: 0,
//   y: 0
// };

// window.addEventListener("mousemove", (event) => {
//   // console.log(event.clientX, event.clientY);
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = event.clientY / sizes.height - 0.5;
// });

scene.add(camera);

// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const geometry = new THREE.BufferGeometry();

// const vertice1 = new THREE.Vector3(0, 0, 0);
// const vertice2 = new THREE.Vector3(0, 1, 0);
// const vertice3 = new THREE.Vector3(1, 0, 0);

const vertices = [
  // front of cube
  // triangle 1
  { pos: [-1, -1, 1], norm: [0, 0, 1], uv: [0, 0] },
  { pos: [1, -1, 1], norm: [0, 0, 1], uv: [1, 0] },
  { pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 1] },
  // triangle 2
  { pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 1] },
  { pos: [1, -1, 1], norm: [0, 0, 1], uv: [1, 0] },
  { pos: [1, 1, 1], norm: [0, 0, 1], uv: [1, 1] },

  // right
  // triangle 1
  { pos: [1, -1, 1], norm: [1, 0, 0], uv: [0, 0] },
  { pos: [1, -1, -1], norm: [1, 0, 0], uv: [1, 0] },
  { pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 1] },
  // triangle 2
  { pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 1] },
  { pos: [1, -1, -1], norm: [1, 0, 0], uv: [1, 0] },
  { pos: [1, 1, -1], norm: [1, 0, 0], uv: [1, 1] },

  // back
  // triangle 1
  { pos: [1, -1, -1], norm: [0, 0, -1], uv: [0, 0] },
  { pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 0] },
  { pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 1] },
  // triangle 2
  { pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 1] },
  { pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 0] },
  { pos: [-1, 1, -1], norm: [0, 0, -1], uv: [1, 1] },

  // left
  // triangle 1
  { pos: [-1, -1, -1], norm: [-1, 0, 0], uv: [0, 0] },
  { pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [1, 0] },
  { pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 1] },
  // triangle 2
  { pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 1] },
  { pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [1, 0] },
  { pos: [-1, 1, 1], norm: [-1, 0, 0], uv: [1, 1] },

  // top
  // triangle 1
  { pos: [1, 1, -1], norm: [0, 1, 0], uv: [0, 0] },
  { pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 0] },
  { pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 1] },
  // triangle 2
  { pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 1] },
  { pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 0] },
  { pos: [-1, 1, 1], norm: [0, 1, 0], uv: [1, 1] },

  // bottom
  // triangle 1
  { pos: [1, -1, 1], norm: [0, -1, 0], uv: [0, 0] },
  { pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 0] },
  { pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 1] },
  // triangle 2
  { pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 1] },
  { pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 0] },
  { pos: [-1, -1, -1], norm: [0, -1, 0], uv: [1, 1] }
];

const positions = [];
const normals = [];
const uvs = [];

for (const vertex of vertices) {
  positions.push(...vertex.pos);
  normals.push(...vertex.norm);
  uvs.push(...vertex.uv);
}

const positionNumComponents = 3;
const normalNumComponents = 3;
const uvNumComponents = 2;

geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents)
);
geometry.setAttribute(
  "normal",
  new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents)
);
geometry.setAttribute(
  "uv",
  new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents)
);

const material = new THREE.MeshPhongMaterial({
  color: "purple"
});

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
