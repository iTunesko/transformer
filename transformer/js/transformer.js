import * as THREE from "three";

let camera, scene, renderer;
let activeCamera, frontalCamera, lateralCamera, topDownCamera, perspectiveCamera;

function createScene() {
  scene = new THREE.Scene();

  scene.add(new THREE.AxesHelper(10));
  scene.background = new THREE.Color(0xffccff); 
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

