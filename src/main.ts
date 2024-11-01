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

camera.position.z = 8;

const canvas: HTMLCanvasElement = document.getElementById('three_scene') as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });

renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// add light to the scene
const light = new THREE.AmbientLight(0xffffff); // soft white light
light.position.set(0, 1, 1).normalize();

const vertices = await vertices_loader('all_vertices.bin');
const faces = await faces_loader('faces.bin');

const geometry = new THREE.BufferGeometry();

const vertices0 = new Float32Array(vertices[0]);
const indices = faces;

// console.log(vertices0);
// console.log(indices);

geometry.setIndex(indices);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices0, 3));

const material = new THREE.MeshBasicMaterial({ color: 0xcccccc });
const smpl_mesh = new THREE.Mesh(geometry, material);

scene.add(smpl_mesh);

let frame = 0;

function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render(scene, camera);

  const positions = new Float32Array(vertices[frame]);

  smpl_mesh.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  smpl_mesh.geometry.getAttribute('position').needsUpdate = true;// required after the first render

  if (frame < vertices.length - 1) {
    frame++;
  } else {
    frame = 0;
  }

  controls.update();
}

animate();