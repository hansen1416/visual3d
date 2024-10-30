import * as THREE from 'three';
/** @ts-ignore */
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// When using the Tauri API npm package:
import { invoke } from '@tauri-apps/api/core';

import { BaseDirectory, exists, create } from '@tauri-apps/plugin-fs';


const is_file_exists = await exists('wham_output.pkl', {
  baseDir: BaseDirectory.Document,
});

console.log(is_file_exists);

// Invoke the command
invoke('start_command');

invoke('greet', { name: 'Hansen' }).then((response) => {
  console.log(response);
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });



renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);

  controls.update();
}

animate();