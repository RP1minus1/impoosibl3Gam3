import "./style.css";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import * as dat from "lil-gui";
import { createWorld } from "./physics";
import { createLights, createCamera, createRenderer, createBox } from "./three";
import { createCourse } from "./three/game";

/**
 * Debug
 */
const gui = new dat.GUI();
const debugObject = {};

gui.add({ gravity: 1 }, "gravity", 0, 10).onChange(function (value) {
  world.gravity.set(0, value * -9.82, 0);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Physics
 */
// World
const world = createWorld();

/**
 * Lights
 */
const { ambientLight, directionalLight } = createLights();
scene.add(ambientLight, directionalLight);

/**
 * Camera
 */
const { camera, controls } = createCamera(sizes, canvas);

/**
 * Renderer
 */
const { renderer } = createRenderer(sizes, canvas);

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Player Box
 */

const { mesh, body } = createBox(new THREE.Vector3(0, 1, 0), 1, 0xff0000);
scene.add(mesh);
body.angularDamping = 1;
world.addBody(body);

window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "Space":
      body.applyImpulse(new CANNON.Vec3(0, 4, 0), body.position);
      break;
  }
});

/**
 * Course
 */
const { courseGroup, course } = createCourse();
scene.add(courseGroup);
course.forEach(({ body }) => {
  world.addBody(body);
});

const objectsToUpdate = [{ mesh, body }, ...course];

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
/**
/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  // Update Physics world
  world.step(1 / 60, deltaTime, 3);

  // Update objects
  objectsToUpdate.forEach(({ mesh, body }) => {
    mesh.position.copy(body.position);
    mesh.quaternion.copy(body.quaternion);
  });

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
