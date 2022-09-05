import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";

export const createLights = () => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
  directionalLight.position.set(5, 5, 5);

  return { ambientLight, directionalLight };
};

export const createCamera = (sizes, canvas) => {
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.set(-3, 3, 3);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  return { camera, controls };
};

export const createRenderer = (sizes, canvas) => {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  return { renderer };
};

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

export const createBox = (position, size, color) => {
  // Three.js Mesh
  const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
  mesh.scale.set(size, size, size);
  mesh.position.copy(position);
  mesh.material.color.setHex(color);

  // Cannon.js body
  const shape = new CANNON.Box(new CANNON.Vec3(size / 2, size / 2, size / 2));
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(position.x, position.y, position.z),
    shape,
    // material: defaultMaterial,
  });

  return { mesh, body };
};

const wireframeGeometry = new THREE.BoxGeometry(1, 1, 1);
const wireframeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

export const createWireframeBox = (position, size, color = 0xffffff) => {
  // Three.js Mesh
  const mesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
  mesh.scale.set(size, size, size);
  mesh.position.copy(position);
  mesh.material.color.setHex(color);
  mesh.material.wireframe = true;

  // Cannon.js body
  const shape = new CANNON.Box(new CANNON.Vec3(size / 2, size / 2, size / 2));
  const body = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(position.x, position.y, position.z),
    shape,
    // material: defaultMaterial,
  });

  return { mesh, body };
};
