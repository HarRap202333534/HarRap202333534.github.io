import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
const light = new THREE.AmbientLight(0xffffff)
const gridHelper = new THREE.GridHelper(200, 50)
const gltfLoader = new GLTFLoader();

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial({ color: 0xff6347 })
const torus = new THREE.Mesh(geometry, material)


gltfLoader.load('../models/minecraft_-_steve.glb', (gltf) => {
  const model = gltf.scene;
  model.traverse((child) => {
    if (child.isMesh) {
      
    }
  });
  scene.add(model);
});

scene.add(torus, light, gridHelper)

function animate() {
  requestAnimationFrame(animate)
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  controls.update()

  renderer.render(scene, camera)
}
animate()
