import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StylizedSneakerMesh() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={[1.2, 1.2, 1.2]} rotation={[0.2, 0.4, 0]}>
      {/* Carbon Fiber Outsole */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[3.2, 0.35, 1.3]} />
        <meshStandardMaterial color="#E60023" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Midsole Cushion - Classic Chicago White */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[3.0, 0.4, 1.25]} />
        <MeshWobbleMaterial color="#FFFFFF" speed={1.5} factor={0.05} roughness={0.2} />
      </mesh>

      {/* Main Upper Body - Chicago Varsity Red */}
      <mesh position={[-0.2, 0.3, 0]}>
        <boxGeometry args={[2.2, 0.9, 1.15]} />
        <meshStandardMaterial color="#E60023" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Collar & Heel Counter - Chicago Black */}
      <mesh position={[-0.8, 0.7, 0]}>
        <cylinderGeometry args={[0.55, 0.6, 0.9, 32]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Chicago Swoosh Accent */}
      <mesh position={[0.1, 0.35, 0.6]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[1.4, 0.15, 0.05]} />
        <meshStandardMaterial color="#000000" roughness={0.1} />
      </mesh>

      {/* Translucent Toe Cap - Sail/White */}
      <mesh position={[0.9, 0.15, 0]}>
        <sphereGeometry args={[0.65, 32, 16]} />
        <meshPhysicalMaterial 
          color="#FFFFFF" 
          transmission={0.85} 
          opacity={1} 
          transparent 
          roughness={0.1}
          ior={1.5}
        />
      </mesh>
    </group>
  );
}

export const ThreeCanvas: React.FC<{ interactive?: boolean; className?: string }> = ({ 
  interactive = true, 
  className = "w-full h-[500px]" 
}) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={3.0} color="#FFFFFF" />
        <pointLight position={[-10, -5, -5]} intensity={2.5} color="#0A0A0A" />
        <pointLight position={[0, 5, 0]} intensity={2.5} color="#E60023" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
          <StylizedSneakerMesh />
        </Float>

        {interactive && (
          <OrbitControls 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={Math.PI / 4}
            autoRotate={false}
          />
        )}
      </Canvas>
    </div>
  );
};
