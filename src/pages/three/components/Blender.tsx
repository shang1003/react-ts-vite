import React, { useRef, useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { blenderMesh } from "./Mesh/blenderMesh";
import * as THREE from "three";
const ThreeScene = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    // 创建场景
    const scene = createScene();
    // 创建相机
    const camera = createCamera();
    // 创建渲染器
    const renderer = render();
    // 添加草坪
    const grass = createGrass();

    //添加点光源
    const spotLight = createLight();
    scene.add(grass);
    scene.add(spotLight);
    scene.add(blenderMesh);
    renderer.render(scene, camera);

    //是一种在场景中均匀分布的光源，它不产生阴影，并使整个场景都得到均匀的照明。与SpotLight（聚光灯）不同，AmbientLight没有特定的方向或聚焦点，它只提供一个整体的光照效果。
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
    new OrbitControls(camera, renderer.domElement); // 创建 FirstPersonControls 控制器
    return () => {
      renderer.dispose();
    };
  }, []);

  //创建场景
  function createScene() {
    const scene = new THREE.Scene();
    return scene;
  }

  //加载草坪
  function createGrass() {
    //图片加载
    var textureLoader = new THREE.TextureLoader();
    // 加载纹理
    const texture = textureLoader.load("/grasslight-big.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    //创建平面
    const plane = new THREE.PlaneGeometry(1000, 200, 20, 20);
    plane.rotateX((-1 / 2) * Math.PI);
    // 创建材质
    var material = new THREE.MeshLambertMaterial({ map: texture });
    var grass = new THREE.Mesh(plane, material);
    grass.receiveShadow = true;
    grass.position.set(15, 0, 0);
    return grass;
  }
  //创建相机
  function createCamera() {
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(-7, 122, 162);
    camera.lookAt(blenderMesh.position);
    return camera;
  }

  //创建渲染器
  function render() {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef?.current || undefined,
    });
    //画布的大小，背景色，开启阴影
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xaaaaff), 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    return renderer;
  }

  //创建光源
  function createLight() {
    //添加点光源
    const spotLight = new THREE.DirectionalLight("#ffffff");
    spotLight.position.set(-40, 60, -10);
    spotLight.lookAt(new THREE.Vector3(15, 0, 0));
    spotLight.castShadow = true;
    return spotLight;
  }

  return <canvas ref={canvasRef} />;
};

export default ThreeScene;
