"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/hooks/use-theme";

function Wireform({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x += delta * 0.04;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh scale={0.62}>
        <icosahedronGeometry args={[2.1, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function Dust({ color }: { color: string }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 420;
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (Math.random() - 0.5) * 12;
      array[i * 3 + 1] = (Math.random() - 0.5) * 7;
      array[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return array;
  }, []);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.03;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.028} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

export default function HeroScene({ active }: { active: boolean }) {
  const { theme } = useTheme();
  // Theme-aware accent: brighter gold on dark, deeper bronze on light.
  const color = theme === "dark" ? "#e8bf74" : "#8a6420";

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <Wireform color={color} />
      <Dust color={color} />
    </Canvas>
  );
}
