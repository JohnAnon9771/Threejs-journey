import * as THREE from "three";

const scene = new THREE.Scene();

const sizes = {
  width: 1920,
  height: 945,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
