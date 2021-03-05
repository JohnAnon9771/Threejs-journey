import * as THREE from "three";

// Scene and Camera
const scene = new THREE.Scene();

const sizes = {
  width: 930,
  height: 600
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.set(1, 1, 3)
camera.position.z = 3;

scene.add(camera);

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "lightblue" });
const mesh = new THREE.Mesh(geometry, material);

// Positions
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 3;
mesh.position.set(0.7, -0.6, 1);
// mesh.position.normalize()

// Scale
// mesh.scale.x = 0.7;
// mesh.scale.y = -0.6;
// mesh.scale.z = 3;
mesh.scale.set(1, 1, 1);

// Rotations
// mesh.rotation.x = 0.7;
// mesh.rotation.y = -0.6;
// mesh.rotation.z = 3;
mesh.rotation.reorder("YXZ");
mesh.rotation.set(1, 1, 1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "purple" })
);
cube2.position.set(0.8, 0.55, 0);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "lightgreen" })
);

// Group
const group = new THREE.Group();
group.add(mesh, cube2, cube3);
// group.rotation.y = 2
// group.scale.y = 2
scene.add(group);

// Metodo para focar em alguma posição ou objeto
camera.lookAt(mesh.position);

// Vector3 -> Class para posicionamento no axis

// Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Lights
const light = new THREE.AmbientLight(0x404040);
scene.add(light);

// Render
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas")
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
