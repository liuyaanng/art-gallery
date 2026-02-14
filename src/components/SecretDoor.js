import { useRef, useState } from "react";
import { SpotLight, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CHINESE_FONT } from "../constants/fonts";

const SecretDoor = ({ position, onDoorClick }) => {
  const doorRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (glowRef.current) {
      const t = state.clock.getElapsedTime();
      glowRef.current.material.opacity = 0.06 + Math.sin(t * 1.5) * 0.04;
    }
    if (doorRef.current) {
      const scale = hovered ? 1.05 : 1;
      doorRef.current.scale.lerp({ x: scale, y: scale, z: scale }, 0.1);
    }
  });

  return (
    <group position={position}>
      <SpotLight
        position={[0, 3, 1.5]}
        penumbra={1}
        angle={0.5}
        attenuation={1}
        anglePower={5}
        intensity={hovered ? 12 : 6}
        distance={12}
        castShadow
        color={0xffffff}
      />

      <group
        ref={doorRef}
        onClick={(e) => {
          e.stopPropagation();
          onDoorClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        {/* 门的主体 */}
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[1.8, 2.8, 0.08]} />
          <meshStandardMaterial
            color={hovered ? "#0a0a0a" : "#050505"}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* 门框 — 与画框同材质 */}
        {/* 左 */}
        <mesh position={[-0.95, -0.3, 0.01]} castShadow>
          <boxGeometry args={[0.08, 2.9, 0.1]} />
          <meshStandardMaterial
            color="#c0c0c0"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* 右 */}
        <mesh position={[0.95, -0.3, 0.01]} castShadow>
          <boxGeometry args={[0.08, 2.9, 0.1]} />
          <meshStandardMaterial
            color="#c0c0c0"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* 上 */}
        <mesh position={[0, 1.15, 0.01]} castShadow>
          <boxGeometry args={[1.96, 0.08, 0.1]} />
          <meshStandardMaterial
            color="#c0c0c0"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* 下 */}
        <mesh position={[0, -1.75, 0.01]} castShadow>
          <boxGeometry args={[1.96, 0.08, 0.1]} />
          <meshStandardMaterial
            color="#c0c0c0"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* 门面微光 */}
        <mesh ref={glowRef} position={[0, -0.3, 0.05]}>
          <planeGeometry args={[1.6, 2.6]} />
          <meshBasicMaterial color="#faebd7" transparent opacity={0.06} />
        </mesh>

        {/* 门把手 */}
        <mesh position={[0.55, -0.4, 0.1]} castShadow>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* 提示文字 — 与标题牌同色 */}
      <Text
        position={[0, -2.3, 0.05]}
        anchorX="center"
        anchorY="middle"
        scale={[1.2, 1.2, 1.2]}
        color={hovered ? "#FBA90A" : "#666666"}
        font={CHINESE_FONT}
      >
        {hovered ? "点击开启" : "· · ·"}
      </Text>
    </group>
  );
};

export default SecretDoor;
