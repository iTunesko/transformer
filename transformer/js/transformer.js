import * as THREE from "three";

let camera, scene, renderer;
let activeCamera, frontalCamera, lateralCamera, topDownCamera, perspectiveCamera;
let waist,body,abs,chest;
let head, face, rightEye, leftEye, rightAntenna,leftAntenna;



/* Body Group Functions */
function createWaist() {
  const waistGeo = new THREE.BoxGeometry(12,6,4);
  const material = new THREE.MeshBasicMaterial({ color: 0xAA336A, wireframe: false });
  waist = new THREE.Mesh(waistGeo, material);
  waist.position.set(0, 0 , 0);
  body.add(waist);
}

function createAbs() {
  const absGeo = new THREE.BoxGeometry(6,8,1)
  const material = new THREE.MeshBasicMaterial({ color:0x64173b, wireframe: false });
  abs = new THREE.Mesh(absGeo, material);
  abs.position.set(0, 1 , 2);
  body.add(abs);
}

function createChest() {
  const chestGeo = new THREE.BoxGeometry(16,8,4);
  const material = new THREE.MeshBasicMaterial({ color: 0xAA336A, wireframe: false });
  chest = new THREE.Mesh(chestGeo, material);
  chest.position.set(0, 7 , 0);
  body.add(chest);
}

// Group all body parts
function createBody(x, y, z) {

  body = new THREE.Group();
  body.position.set(x, y, z);

  createWaist();
  createAbs();
  createChest();

  scene.add(body);
}
/***** End of Body functions *******/


/***** Head Group Functions *****/
function createFace() {

  const faceGeometry = new THREE.BoxGeometry(4, 4, 4);
  const material = new THREE.MeshBasicMaterial({ color: 0xAA336A, });
  
  face = new THREE.Mesh(faceGeometry, material);
  face.position.set(0, 2, 0);
  head.add(face);

}

function createEyes() {
  const eyeGeometry = new THREE.ConeGeometry(0.5, 2, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0x64173b , wireframe: false });
  
  const baseEye = new THREE.Mesh(eyeGeometry, material);
  baseEye.rotation.x = Math.PI / 2;
  baseEye.position.z = 2;  
  baseEye.position.y = 2.5;

  leftEye = baseEye.clone();
  leftEye.position.x = -1;

  rightEye = baseEye.clone();
  rightEye.position.x = 1;

  head.add(leftEye);
  head.add(rightEye);

}

function createAntennas() {

  const antennaG = new THREE.BoxGeometry(1,6,4);
  const material = new THREE.MeshBasicMaterial({ color: 0x64173b , wireframe: false });

  const baseAntenna = new THREE.Mesh(antennaG, material);
  baseAntenna.position.z =0;
  baseAntenna.position.y =3;

  rightAntenna = baseAntenna.clone();
  rightAntenna.position.x = 2.5;

  leftAntenna =baseAntenna.clone();
  leftAntenna.position.x=-2.5;

  head.add(rightAntenna);
  head.add(leftAntenna);
}

// Group all head parts
function createHead(x, y, z) {
  head = new THREE.Group();
  head.position.set(x, y, z);

  createFace();
  createEyes();
  createAntennas();

  scene.add(head);

}

/***** End of Head functions *******/


function createScene() {
  scene = new THREE.Scene();

  scene.add(new THREE.AxesHelper(10));
  scene.background = new THREE.Color(0xffccff); 

  createBody(0, 0, 0);
  createHead(0, 11, 0);

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

