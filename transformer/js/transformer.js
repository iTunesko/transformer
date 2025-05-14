import * as THREE from "three";

let camera, scene, renderer;
let activeCamera, frontalCamera, lateralCamera, topDownCamera, perspectiveCamera;
let head,waist,body,abs,chest;




function createWaist() {
  const waistGeo = new THREE.BoxGeometry(12,6,4);
  const material = new THREE.MeshBasicMaterial({ color: 0xAA336A, wireframe: false });
  waist = new THREE.Mesh(waistGeo, material);
  waist.position.set(0, 0 , 0);
  return waist;
}

function createAbs() {
  const absGeo = new THREE.BoxGeometry(6,8,1)
  const material = new THREE.MeshBasicMaterial({ color:0x64173b, wireframe: false });
  abs = new THREE.Mesh(absGeo, material);
  abs.position.set(0, 1 , 2);
  return abs;
}

function createChest() {
  const chestGeo = new THREE.BoxGeometry(16,8,4);
  const material = new THREE.MeshBasicMaterial({ color: 0xAA336A, wireframe: false });
  chest = new THREE.Mesh(chestGeo, material);
  chest.position.set(0, 4 , 0);
  return chest;
}


function createBody(x, y, z) {

  body = new THREE.Group();

  body.add(createWaist());
  body.add(createAbs());
  body.add(createChest());

  scene.add(body);
}

// function addHead(obj, x, y, z, material) {

//   const headGeometry = new THREE.BoxGeometry(4, 4, 4);
//   const mesh = new THREE.Mesh(headGeometry, material);
//   mesh.position.set(x, y - 3, z);
//   obj.add(mesh);

// }

// function createHead(x, y, z) {
//   head = new THREE.Object3D();

//   const material = new THREE.MeshBasicMaterial({ color: 0xAA336A, wireframe: true });

//   addHead(head, x, y, z, material);

//   scene.add(head);

//   head.position.set(x, y, z);
// }

function createScene() {
  scene = new THREE.Scene();

  scene.add(new THREE.AxesHelper(10));
  scene.background = new THREE.Color(0xffccff); 

  createBody(0, 0, 0);

}

function createCamera(position) {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(position.x, position.y, position.z);
  camera.lookAt(scene.position);
  return camera;
}

function onKeyDown(e) {
    switch (e.key) {
      case '1':
        activeCamera = frontalCamera;
        break;
      case '2':
        activeCamera = lateralCamera;
        break
      case '3':
        activeCamera = topDownCamera;
        break;
      case '4':
        activeCamera = perspectiveCamera;
        break;
    }
  }

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (window.innerHeight > 0 && window.innerWidth > 0) {
    activeCamera.aspect = window.innerWidth / window.innerHeight;
    activeCamera.updateProjectionMatrix();
  }
}

function render() {
  renderer.render(scene, activeCamera);
}

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  createScene();
  frontalCamera = createCamera(new THREE.Vector3(0, 0, 50));
  lateralCamera = createCamera(new THREE.Vector3(50, 0, 0));
  topDownCamera = createCamera(new THREE.Vector3(0, 50, 0));
  perspectiveCamera = createCamera(new THREE.Vector3(50, 50, 50));

  activeCamera = frontalCamera;

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("resize", onResize);
}

function animate() {

  render();

  requestAnimationFrame(animate);
}

init();

animate();

