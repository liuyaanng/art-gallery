import { useLoader, useThree } from "@react-three/fiber";
import { SpotLight, Text } from "@react-three/drei";
import { TextureLoader } from "three";

const WallArt = (props) => {
  const { art, i } = props;
  const { width: w, height: h } = useThree((state) => state.viewport);
  const gap = 4;
  const imageWidth = 3;
  const texture = useLoader(TextureLoader, art.imgPath);

  return (
    <>
      <group>
        <SpotLight
          position={[(i + 1) * (imageWidth + gap) + (i + 1) - w / 4, 2.5, 1]}
          penumbra={1}
          angle={0.6}
          attenuation={1}
          anglePower={5}
          intensity={10}
          distance={10}
          castShadow
          color={0xffffff}
        />
        <mesh
          castShadow
          position={[(i + 1) * (imageWidth + gap) + (i + 1), 0, 0]}
        >
          <boxBufferGeometry
            attach="geometry"
            args={[imageWidth, h / 2, 0.07]}
          />
          <meshStandardMaterial
            attach="material"
            map={texture}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        <mesh position={[(i + 1) * (imageWidth + gap) + (i + 1), -2.5, 0]}>
          <planeGeometry args={[1.25, 0.5]} />
          <meshStandardMaterial color={0xfaebd7} />
          <Text
            position-z={0}
            scale={[2, 2, 2]}
            color="black"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
          >
            {art.title}
          </Text>
        </mesh>
      </group>
    </>
  );
};

export default WallArt;

