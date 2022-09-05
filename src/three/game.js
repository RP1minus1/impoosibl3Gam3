import * as THREE from "three";
import { createWireframeBox } from ".";

const courseMap = [
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 2, y: 0, z: 0 },
  { x: 3, y: 0, z: 0 },
  { x: 4, y: 0, z: 0 },
  { x: 5, y: 0, z: 0 },
  { x: 6, y: 0, z: 0 },
  { x: 7, y: 0, z: 0 },
  { x: 8, y: 0, z: 0 },
  { x: 9, y: 0, z: 0 },
  { x: 10, y: 0, z: 0 },
];

export const createCourse = () => {
  const courseGroup = new THREE.Group();

  const course = courseMap.map((point) => {
    const { mesh, body } = createWireframeBox(point, 1);
    courseGroup.add(mesh);
    return { mesh, body };
  });

  return { courseGroup, course };
};
