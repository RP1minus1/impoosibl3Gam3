import { World, SAPBroadphase, Material, ContactMaterial } from "cannon-es";

// Materials
const defaultMaterial = new Material("default");

const defaultContactMaterial = new ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1,
    restitution: 0,
  }
);

export const createWorld = () => {
  const world = new World();
  world.broadphase = new SAPBroadphase(world);
  world.allowSleep = true;
  world.gravity.set(0, -9.82, 0);

  world.addContactMaterial(defaultContactMaterial);
  world.defaultContactMaterial = defaultContactMaterial;
  world.defaultMaterial = defaultMaterial;

  return world;
};
