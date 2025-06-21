import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styles from './MediaPreview.module.css';

interface MediaPreviewProps {
  url: string;
  type: 'photo' | 'model';
}

export const MediaPreview = ({ url, type }: MediaPreviewProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (type !== 'model' || !mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = 300;

    // Three.js 基本構成
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ライト追加
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(3, 5, 2);
    scene.add(dirLight);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.2));

    // カメラ制御
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;

    // モデル読み込みと配置
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        // 前のモデルを削除・破棄
        if (modelRef.current) {
          scene.remove(modelRef.current);
          modelRef.current.traverse((child) => {
            if ((child as THREE.Mesh).geometry) {
              (child as THREE.Mesh).geometry.dispose();
            }
            if ((child as THREE.Mesh).material) {
              const mat = (child as THREE.Mesh).material;
              if (Array.isArray(mat)) {
                mat.forEach((m) => m.dispose());
              } else {
                mat.dispose();
              }
            }
          });
        }

        const model = gltf.scene;
        modelRef.current = model;
        scene.add(model);

        // モデルの中心化とカメラ設定
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const cameraZ = maxDim * 2.5;
        camera.position.set(0, maxDim / 2, cameraZ);
        camera.lookAt(0, 0, 0);

        controls.target.set(0, 0, 0);
        controls.update();
      },
      undefined,
      (err) => {
        console.error('GLTF 読み込みエラー:', err);
      }
    );

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    // クリーンアップ
    return () => {
      cancelAnimationFrame(requestRef.current!);
      controls.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }

      // モデルの破棄
      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if ((child as THREE.Mesh).geometry) {
            (child as THREE.Mesh).geometry.dispose();
          }
          if ((child as THREE.Mesh).material) {
            const mat = (child as THREE.Mesh).material;
            if (Array.isArray(mat)) {
              mat.forEach((m) => m.dispose());
            } else {
              mat.dispose();
            }
          }
        });
        scene.remove(modelRef.current);
        modelRef.current = null;
      }
    };
  }, [url, type]);

  if (type === 'photo') {
    return <img src={url} alt="media preview" className={styles.mediaPreview} />;
  } else if (type === 'model') {
    return <div ref={mountRef} className={styles.modelPreview} style={{ width: '100%', height: '300px' }} />;
  }

  return null;
};
