import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'

import * as dat from 'dat.gui';
const gui = new dat.GUI();
// console.log(gui);
const world = {
  plane: {
    width: 10,
    height: 10,
    widthSegments: 10,
    heightSegments: 10
  }
}

const adjustPlane = () => {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width, 
    world.plane.height, 
    world.plane.widthSegments,
    world.plane.heightSegments);
  const {array} = planeMesh.geometry.attributes.position;
  // console.log('array: ', array);
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];
    array[i + 2] = z + Math.random();
  }
}

gui.add(world.plane, 'width', 1, 20).onChange(() => {
  adjustPlane();
});
gui.add(world.plane, 'height', 1, 20).onChange(() => {
  adjustPlane();
});
gui.add(world.plane, 'widthSegments', 1, 50).onChange(() => {
  adjustPlane();
});
gui.add(world.plane, 'heightSegments', 1, 50).onChange(() => {
  adjustPlane();
});

const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000);
const renderer = new THREE.WebGL1Renderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// console.log('devicePixelRatio: ', devicePixelRatio)
document.body.appendChild(renderer.domElement);


const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({   
  color: 0xff0000, 
  side: THREE.DoubleSide, 
  flatShading: THREE.FlatShading
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

const {array} = planeMesh.geometry.attributes.position;
// console.log('array: ', array);
for (let i = 0; i < array.length; i += 3) {
  // console.log('i: ', i);
  const x = array[i];
  const y = array[i + 1];
  const z = array[i + 2];
  array[i + 2] = z + Math.random();
}

console.log(planeMesh.geometry.attributes);
planeMesh.geometry.setAttribute('color');

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);
const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(backLight);

const mouse = {
  x: undefined,
  y: undefined
};

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(planeMesh);
    if (intersects.length > 0) {
      console.log('intersecting');
    }
}
animate();

addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // console.log(mouse);
  // const x = event.clientX;
  // const y = event.clientY;
  // const centerX = window.innerWidth / 2;
  // const centerY = window.innerHeight / 2;
  // const moveX = x - centerX;
  // const moveY = y - centerY;
  // planeMesh.rotation.x = moveY * 0.001;
  // planeMesh.rotation.y = moveX * 0.001;
});


