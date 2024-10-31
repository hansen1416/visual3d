import * as THREE from 'three';
/** @ts-ignore */
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// When using the Tauri API npm package:
import { invoke } from '@tauri-apps/api/core';
import { vertices_loader, faces_loader } from './components/mesh_loader';


// Invoke the command
invoke('start_command');

// invoke('greet', { filename: 'wham_output.pkl' }).then((response) => {
//   console.log(response);
// });

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const canvas: HTMLCanvasElement = document.getElementById('three_scene') as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });

renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const vertices = await vertices_loader('all_vertices.bin');
const faces = await faces_loader('faces.bin');

console.log(vertices);
console.log(faces);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);

  controls.update();
}

animate();