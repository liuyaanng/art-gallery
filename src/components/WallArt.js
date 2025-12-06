import { useLoader, useThree } from "@react-three/fiber";
import { SpotLight, Text } from "@react-three/drei";
import { TextureLoader } from "three";
import { useMemo, useEffect } from "react";

const WallArt = (props) => {
  const { art, i, previousWidths = [], onWidthChange } = props;
  const { width: w, height: h } = useThree((state) => state.viewport);
  const gap = 4;
  const imageHeight = h / 2; // 固定高度
  const texture = useLoader(TextureLoader, art.imgPath);

  // 根据图像的实际宽高比计算画框宽度
  const imageWidth = useMemo(() => {
    if (texture && texture.image) {
      const imageAspectRatio = texture.image.width / texture.image.height;
      // 根据固定高度和图像宽高比计算宽度
      return imageHeight * imageAspectRatio;
    }
    // 如果纹理还未加载，使用默认宽度
    return 3;
  }, [texture, imageHeight]);

  // 通知父组件宽度变化
  useEffect(() => {
    if (onWidthChange && texture && texture.image) {
      onWidthChange(i, imageWidth);
    }
  }, [imageWidth, i, onWidthChange, texture]);

  // 计算当前位置：前面所有画框的累计宽度 + gap
  const xPosition = useMemo(() => {
    // 起始偏移量，用于与文本保持距离
    const startOffset = w * 0.5; // 使用视口宽度的1.2倍作为起始偏移
    
    if (previousWidths.length === 0) {
      // 第一个画框：起始偏移 + 画框宽度的一半
      return startOffset + imageWidth / 2;
    }
    // 累计前面所有画框的宽度和 gap（每个宽度后面加一个 gap，除了最后一个）
    const totalPreviousWidth = previousWidths.reduce((sum, width, idx) => {
      return sum + width + (idx < previousWidths.length - 1 ? gap : 0);
    }, 0);
    // 起始偏移 + 前面所有画框的宽度 + gap + 当前画框宽度的一半
    return startOffset + totalPreviousWidth + gap + imageWidth / 2;
  }, [previousWidths, imageWidth, gap, w]);

  return (
    <>
      <group>
        <SpotLight
          position={[xPosition - w / 4, 2.5, 1]}
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
          position={[xPosition, 0, 0]}
        >
          <boxBufferGeometry
            attach="geometry"
            args={[imageWidth, imageHeight, 0.07]}
          />
          <meshStandardMaterial
            attach="material"
            map={texture}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        <mesh position={[xPosition, -(imageHeight / 2 + 0.75), 0]}>
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

