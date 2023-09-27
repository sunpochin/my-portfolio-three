import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000);
const renderer = new THREE.WebGL1Renderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
console.log('devicePixelRatio: ', devicePixelRatio)
document.body.appendChild(renderer.domElement);

// const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const boxMesh = new THREE.Mesh(boxGeometry, material);
// scene.add(boxMesh);


const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);


camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    planeMesh.rotation.x += 0.03;
    // boxMesh.rotation.x += 0.02;
    // boxMesh.rotation.y += 0.02;
}
animate();




