import React, { useRef, useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
const ThreeScene = () => {
  const canvasRef = useRef(null);
  // 创建场景
  const scene = createScene();
  // 创建相机
  const camera = createCamera();
  useEffect(() => {
    // 创建渲染器
    const renderer = render();
    // 添加草坪
    const grass = createGrass();
    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(1000);
    //添加点光源
    const spotLight = createLight();
    //添加正方体
    const cube = createCubeGeometry();

    scene.add(grass);
    scene.add(axesHelper);
    scene.add(cube);
    scene.add(spotLight);
    renderer.render(scene, camera);
    new OrbitControls(camera, renderer.domElement); // 创建 FirstPersonControls 控制器
    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      renderer.dispose();
    };
  }, []);

  //创建场景
  function createScene() {
    const scene = new THREE.Scene();
    scene.fog = scene.fog = new THREE.Fog(0xaaaaaa, 0.01, 200);
    new THREE.Fog(0xaaaaaa, 0.01, 200);
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
    camera.position.set(-20, 15, 45);
    camera.lookAt(new THREE.Vector3(10, 0, 0));
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
  //创建正方体
  function createCubeGeometry() {
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff3333 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.set(-4, 3, 0);
    return cube;
  }

  return <canvas ref={canvasRef} />;
};

export default ThreeScene;
