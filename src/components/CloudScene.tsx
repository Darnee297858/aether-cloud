"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Ring } from "@react-three/drei";
import * as THREE from "three";

function CloudCoreNode() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2}>
        <MeshDistortMaterial
          color="#00FF66"
          attach="material"
          distort={0.45}
          speed={2.5}
          roughness={0.1}
          wireframe={true}
        />
      </Sphere>
      <Ring args={[2.8, 2.85, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#00FF66" wireframe />
      </Ring>
      <Ring args={[3.4, 3.43, 64]} rotation={[0, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#0088FF" wireframe />
      </Ring>
    </Float>
  );
}

export default function CloudScene() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 3, 3]} intensity={1.5} />
        <CloudCoreNode />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.0} />
      </Canvas>
    </div>
  );
}