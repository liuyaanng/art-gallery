import { Suspense, useState, useCallback } from "react";
import { useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, Html, Text } from "@react-three/drei";
import WallArt from "./WallArt";
import { ART_PIECES } from "../data/artPieces";
import useGalleryPages from "../hooks/useGalleryPages.ts";
import { ENGLISH_FONT } from "../constants/fonts";

const Scene = () => {
  const { width: screenWidth } = useThree((state) => state.viewport);
  console.log("screenWidth", screenWidth);
  const textScale = screenWidth < 5.5 ? 2 : 6;

  const gap = 4;
  const [imageWidths, setImageWidths] = useState({});

  // 处理画框宽度变化的回调
  const handleWidthChange = useCallback((index, width) => {
    setImageWidths((prev) => {
      if (prev[index] !== width) {
        return { ...prev, [index]: width };
      }
      return prev;
    });
  }, []);

  // 计算每个画框前面所有画框的宽度数组
  const getPreviousWidths = useCallback((index) => {
    const widths = [];
    for (let i = 0; i < index; i++) {
      if (imageWidths[i] !== undefined) {
        widths.push(imageWidths[i]);
      } else {
        // 如果宽度还未加载，使用估算值
        widths.push(3);
      }
    }
    return widths;
  }, [imageWidths]);

  const { width: vw } = useThree((s) => s.viewport);

  // 计算总宽度用于页面计算
  const totalWidth = Object.values(imageWidths).reduce((sum, width) => sum + width + gap, 0);
  const estimatedWidth = totalWidth > 0 ? totalWidth / ART_PIECES.length : 3;
  const pages = useGalleryPages({ count: ART_PIECES.length, imageWidth: estimatedWidth, gap: 4, extra: 1.5, margin: 0.5 });

  return (
    <Suspense
      fallback={
        <Html
          style={{ fontSize: "6vw", whiteSpace: "nowrap", color: "white" }}
          center
        >
          Loading...
        </Html>
      }
    >
      <ScrollControls
        horizontal
        damping={4}
        pages={pages}
        distance={1}
      >
        <Scroll>
          <Text
            position-z={0}
            anchorX="center"
            anchorY="bottom"
            scale={[textScale, textScale, textScale]}
            color="#94A6FF"
            font={ENGLISH_FONT}
            castShadow
          >
            A quiet gallery for little painter.
          </Text>
          <Text
            position-z={1}
            anchorX="center"
            anchorY="top"
            scale={[textScale, textScale, textScale]}
            color="#FBA90A"
            font={ENGLISH_FONT}
            castShadow
          >
            Where her light can linger.
          </Text>


          {ART_PIECES.map((art, i) => {
            return (
              <WallArt
                key={i}
                i={i}
                art={art}
                previousWidths={getPreviousWidths(i)}
                onWidthChange={handleWidthChange}
              />
            );
          })}
        </Scroll>
      </ScrollControls>
    </Suspense>
  );
};

export default Scene;

