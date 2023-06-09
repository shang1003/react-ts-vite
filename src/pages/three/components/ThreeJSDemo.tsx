import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const ThreeScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 创建场景
    const scene = new THREE.Scene();

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.x = -20;
    camera.position.y = 30;
    camera.position.z = 20;
    camera.lookAt(scene.position);
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef?.current || undefined,
    });
    //画布的大小，背景色，开启阴影
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000000), 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(1000);
    scene.add(axesHelper);
    // 创建平面
    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    //正方体
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial();
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.set(-4, 3, 0);
    //球体
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0x7777ff,
      wireframe: true,
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(20, 4, 2);
    sphere.castShadow = true;
    //添加点光源
    var spotLight = new THREE.SpotLight(0xcecece);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;

    //环境光
    //是一种在场景中均匀分布的光源，它不产生阴影，并使整个场景都得到均匀的照明。与SpotLight（聚光灯）不同，AmbientLight没有特定的方向或聚焦点，它只提供一个整体的光照效果。
    // const light = new THREE.AmbientLight(0x00000);
    // scene.add(light);
    //添加到场景中
    scene.add(cube);
    scene.add(sphere);
    scene.add(plane);
    scene.add(spotLight);
    renderer.render(scene, camera);

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    let controls = new OrbitControls(camera, renderer.domElement); // 创建 FirstPersonControls 控制器
    // controls.enabled = true;
    animate();
    return () => {
      // 在组件卸载时清理渲染器和其他资源
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default ThreeScene;
