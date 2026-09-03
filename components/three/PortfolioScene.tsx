"use client";

import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

type PointerState = { x: number; y: number };

type PortfolioSceneProps = {
  progressRef: MutableRefObject<number>;
  pointerRef: MutableRefObject<PointerState>;
  theme: "dark" | "light";
  reducedMotion: boolean;
  compact: boolean;
  onReady?: () => void;
};

function DigitalCore({ progressRef, pointerRef, theme, reducedMotion, compact, onReady }: PortfolioSceneProps) {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const announcedReady = useRef(false);

  const dark = theme === "dark";
  const coreColor = dark ? "#9b87ff" : "#6758d9";
  const accentColor = dark ? "#63d6ff" : "#2a8fb8";
  const nodeColor = dark ? "#e9e7ff" : "#2b3150";

  const nodePositions = useMemo(
    () => [
      [-1.45, 0.85, 0.1],
      [1.5, 0.7, -0.2],
      [-1.15, -1.0, 0.45],
      [1.2, -0.95, 0.2],
      [0.1, 1.55, -0.55],
      [0.15, -1.55, -0.35],
    ] as [number, number, number][],
    [],
  );

  const lineGeometry = useMemo(() => {
    const points: number[] = [];
    nodePositions.forEach((position) => {
      points.push(0, 0, 0, ...position);
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, [nodePositions]);

  useFrame((state, delta) => {
    const progress = compact ? 0 : progressRef.current;
    const pointer = compact ? { x: 0, y: 0 } : pointerRef.current;
    const smooth = 1 - Math.exp(-delta * 4.5);

    if (group.current) {
      const idleRate = compact ? 0.035 : 0.08;
      const idle = reducedMotion ? 0 : state.clock.elapsedTime * idleRate;
      const targetX = progress * 0.28 + pointer.y * 0.08;
      const targetY = progress * 1.25 + idle + pointer.x * 0.13;
      const targetZ = progress * -0.08;

      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, smooth);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, smooth);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetZ, smooth);
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, progress * 0.9, smooth);
      group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, progress * 0.5, smooth);
      const scale = (compact ? 0.88 : 1) + progress * 0.13;
      group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), smooth);
    }

    if (ringA.current) ringA.current.rotation.z += delta * (reducedMotion ? 0 : compact ? 0.06 : 0.16);
    if (ringB.current) ringB.current.rotation.x -= delta * (reducedMotion ? 0 : compact ? 0.045 : 0.12);

    const targetCameraX = progress * 0.55 + pointer.x * 0.12;
    const targetCameraY = 0.05 + pointer.y * 0.08;
    const targetCameraZ = compact ? 6.8 : 6.3 - progress * 1.25;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCameraX, smooth);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCameraY, smooth);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCameraZ, smooth);
    camera.lookAt(progress * 0.25, 0, 0);

    if (!announcedReady.current) {
      announcedReady.current = true;
      onReady?.();
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.05, compact ? 1 : 2]} />
        <meshStandardMaterial
          color={coreColor}
          metalness={0.72}
          roughness={0.24}
          emissive={coreColor}
          emissiveIntensity={dark ? 0.12 : 0.04}
        />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.5, 0.25, 0]}>
        <torusGeometry args={[1.65, 0.035, 12, compact ? 72 : 120]} />
        <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh ref={ringB} rotation={[0.4, Math.PI / 2.8, 0.6]}>
        <torusGeometry args={[1.92, 0.025, 12, compact ? 72 : 120]} />
        <meshStandardMaterial color={coreColor} metalness={0.75} roughness={0.28} transparent opacity={0.72} />
      </mesh>

      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={accentColor} transparent opacity={dark ? 0.42 : 0.25} />
      </lineSegments>

      {nodePositions.map((position, index) => (
        <mesh key={index} position={position}>
          <octahedronGeometry args={[index % 2 ? 0.12 : 0.15, 0]} />
          <meshStandardMaterial
            color={index % 2 ? accentColor : nodeColor}
            metalness={0.55}
            roughness={0.28}
            emissive={index % 2 ? accentColor : coreColor}
            emissiveIntensity={dark ? 0.08 : 0.02}
          />
        </mesh>
      ))}

      <Sparkles
        count={reducedMotion ? 6 : compact ? 12 : 28}
        scale={compact ? [4.6, 3.6, 2.8] : [5.2, 4.2, 3.2]}
        size={reducedMotion ? 0.7 : compact ? 0.85 : 1.15}
        speed={reducedMotion ? 0 : compact ? 0.04 : 0.12}
        opacity={dark ? (compact ? 0.22 : 0.32) : compact ? 0.12 : 0.17}
        color={accentColor}
        noise={0.45}
      />

      <pointLight position={[2.8, 2.4, 3.5]} intensity={dark ? (compact ? 12 : 18) : compact ? 7 : 10} color={accentColor} distance={9} />
      <pointLight position={[-3, -1.4, 2]} intensity={dark ? (compact ? 7 : 11) : compact ? 4 : 6} color={coreColor} distance={8} />
    </group>
  );
}

export default function PortfolioScene(props: PortfolioSceneProps) {
  const background = props.theme === "dark" ? "#090b12" : "#f3f2ee";

  return (
    <Canvas
      className="portfolio-webgl-canvas"
      camera={{ position: [0, 0.05, props.compact ? 6.8 : 6.3], fov: 42 }}
      dpr={props.compact ? [1, 1.25] : [1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(background, 0);
      }}
    >
      <ambientLight intensity={props.theme === "dark" ? 0.68 : 1.45} />
      <directionalLight position={[3, 4, 5]} intensity={props.theme === "dark" ? 2.2 : 2.8} color="#ffffff" />
      <DigitalCore {...props} />
    </Canvas>
  );
}
