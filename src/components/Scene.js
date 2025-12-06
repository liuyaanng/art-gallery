import { Suspense } from "react";
import { useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, Html, Text } from "@react-three/drei";
import WallArt from "./WallArt";
import { ART_PIECES } from "../data/artPieces";
import useGalleryPages from "../hooks/useGalleryPages.ts";

const Scene = () => {
  const { width: screenWidth } = useThree((state) => state.viewport);
  console.log("screenWidth", screenWidth);
  const textScale = screenWidth < 5.5 ? 2 : 4;

  const imageWidth = 3
const gap = 4
const step = imageWidth + gap + 1

const { width: vw } = useThree((s) => s.viewport)

const introPadding = vw * 1.2        // 给开头 Text 留一屏左右
const tailPadding = vw * 1.0         // 给最后留一屏左右
const contentWidth = introPadding + ART_PIECES.length * step + tailPadding

const pages = useGalleryPages({ count: ART_PIECES.length, imageWidth: 3, gap: 4, extra: 1.5, margin: 0.5 })

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
            font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
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
            font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
            castShadow
          >
            Art is knowing which ones to keep.
          </Text>
          <Text
            position={[0, -0.5, 1.5]}
            anchorX="center"
            anchorY="top"
            font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
          >
            ~ Scott Adams
          </Text>

          {ART_PIECES.map((art, i) => {
            return <WallArt key={i} i={i} art={art} />;
          })}
        </Scroll>
      </ScrollControls>
    </Suspense>
  );
};

export default Scene;

