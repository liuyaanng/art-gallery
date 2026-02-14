import { Scroll, ScrollControls, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Suspense, useCallback, useMemo, useState } from "react";
import { ENGLISH_FONT } from "../constants/fonts";
import { ART_PIECES } from "../data/artPieces";
import useGalleryPages from "../hooks/useGalleryPages.ts";
import LoadingProgress from "./LoadingProgress";
import SecretDoor from "./SecretDoor";
import WallArt from "./WallArt";

const Scene = ({ onDoorClick }) => {
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
  const getPreviousWidths = useCallback(
    (index) => {
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
    },
    [imageWidths],
  );

  // const { width: vw } = useThree((s) => s.viewport);

  // 计算总宽度用于页面计算
  const totalWidth = Object.values(imageWidths).reduce(
    (sum, width) => sum + width + gap,
    0,
  );
  const estimatedWidth = totalWidth > 0 ? totalWidth / ART_PIECES.length : 3;
  // 隐藏消息的额外滚动空间
  const hiddenSectionWidth = screenWidth * 1.5;
  const pages = useGalleryPages({
    count: ART_PIECES.length,
    imageWidth: estimatedWidth,
    gap: 4,
    extra: 1.5 + hiddenSectionWidth / screenWidth,
    margin: 0.5,
  });

  // 隐藏消息的 x 位置：最后一幅画之后再留一段距离
  const hiddenMessageX = useMemo(() => {
    const startOffset = screenWidth * 0.1;
    const allWidths = Object.values(imageWidths);
    if (allWidths.length === 0)
      return startOffset + ART_PIECES.length * (3 + gap) + screenWidth;
    const totalPrev = allWidths.reduce((sum, width) => sum + width + gap, 0);
    return startOffset + totalPrev + screenWidth * 0.8;
  }, [imageWidths, gap, screenWidth]);

  return (
    <Suspense fallback={<LoadingProgress />}>
      <ScrollControls horizontal damping={4} pages={pages} distance={1}>
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
            Creativity is allowing yourself to make mistakes.
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
            Art is knowing which ones to keep.
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

          {/* 隐藏入口 —— 滚动到画廊最末尾才能看到的门 */}
          <SecretDoor
            position={[hiddenMessageX, 0, 0]}
            onDoorClick={onDoorClick}
          />
        </Scroll>
      </ScrollControls>
    </Suspense>
  );
};

export default Scene;
