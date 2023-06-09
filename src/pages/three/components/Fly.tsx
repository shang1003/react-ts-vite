import React, { useRef, useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DroneMesh } from "./Mesh/DroneMesh";
import { debounce } from "@/utils";
import * as THREE from "three";
const ThreeScene = () => {
  const canvasRef = useRef(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;

  // 处理浏览器窗口变化
  const handleWindowResize = () => {
    if (canvasRef.current) {
      camera.aspect = window.innerWidth / window.innerHeight; //相机的视口宽高比
      camera.updateProjectionMatrix(); //更新相机投影矩阵;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    }
  };

  //防抖
  const resize = debounce(handleWindowResize, 300);
  useEffect(() => {
    initScene();
    // 注册监听器
    window.addEventListener("resize", resize);
    return () => {
      renderer.dispose();
      window.removeEventListener("resize", resize);
    };
  }, []);

  const initScene = () => {
    // 创建场景
    scene = createScene();
    // 创建相机
    camera = createCamera();
    // 创建渲染器
    renderer = render();
    // 添加草坪
    const grass = createGrass();

    //添加点光源
    const spotLight = createLight();
    scene.add(grass);
    scene.add(spotLight);
    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(1000);
    scene.add(axesHelper);
    scene.add(DroneMesh);
    renderer.render(scene, camera);
    new OrbitControls(camera, renderer.domElement); // 创建 FirstPersonControls 控制器
    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  };

  //打印相机位置
  // function handle() {
  //   console.log(cameraRef.current?.position);
  // }

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
    camera.lookAt(DroneMesh.position);
    cameraRef.current = camera;

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

  return (
    <div>
      {/* <button onClick={() => handle()}>打印相机位置信息</button> */}
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ThreeScene;
