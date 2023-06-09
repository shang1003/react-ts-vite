import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

//测试 blender 软件绘制的3D图形
const blenderMesh = new THREE.Object3D();
blenderMesh.name = "blenderMesh";
let loader = new GLTFLoader();
loader.load("/untitled1.gltf", function (gltf) {
  const test = gltf.scene;
  test.scale.set(2, 2, 2);
  blenderMesh.add(test);
});
blenderMesh.position.set(-4, 22, -2);
export { blenderMesh };
