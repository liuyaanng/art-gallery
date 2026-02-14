import { Canvas } from "@react-three/fiber";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { ScrollControls, Scroll, SpotLight, Text } from "@react-three/drei";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { ENGLISH_FONT, CHINESE_FONT } from "../constants/fonts";
import LoadingProgress from "../components/LoadingProgress";
import Rig from "../components/Rig";

const LETTER_CONTENT = `对你产生了久违的心动。
那种感觉来得很快，也很真切。
或许是太久没有遇到这样的人，我因此格外认真，也比自己想象中更在意。
后知后觉才明白，我没有把握好节奏。
把“认真”表达得太急，却忽略了相处本身应该是轻松的。
回头看，我意识到，喜欢一个人，不只是表达心意，更是理解对方的方式。
也许我还没真正走进你的世界，就已经开始期待结果。
那段时间让你感到压力，我想说一句抱歉。
那不是我想要给你的感觉。
我依然珍惜那段相遇。
不是因为执着，而是因为它让我看见自己仍然愿意认真对待一个人。
我不否认自己的心意。
只是现在，我更明白，关系不该靠推进，而是靠两个人自然靠近。
如果有一天，我们都在更舒服的状态下，
我依然愿意从更轻松的方式重新认识你。
不是为了证明什么，只是单纯想看看，我们是否真的可以走得更远。
如果没有，也没关系。
我依然感谢你曾让我心动。
`;

const LetterScene = () => {
  return (
    <ScrollControls horizontal damping={4} pages={1} distance={1}>
      <Scroll>
        <SpotLight
          position={[3, 3, 1.5]}
          // position={[0, 3, 1.5]}
          penumbra={1}
          angle={0.8}
          attenuation={1.5}
          anglePower={10}
          intensity={15}
          distance={10}
          castShadow
          color={0xffffff}
        />
        <Text
          position={[0, 0, 0.05]}
          anchorX="center"
          anchorY="middle"
          scale={[2, 2, 2]}
          color="#FBA90A"
          font={CHINESE_FONT}
          castShadow
          maxWidth={5}
          textAlign="left"
          overflowWrap="break-word"
          lineHeight={1.8}
        >
          {LETTER_CONTENT}
        </Text>
        <Text
          position={[1.5, -3, 0.05]}
          anchorX="top"
          anchorY="bottom"
          scale={[1.3, 1.3, 1.3]}
          color="#FBA90A"
          font={ENGLISH_FONT}
          castShadow
        >
          2026 . 02 . 14
        </Text>
      </Scroll>
    </ScrollControls>
  );
};

const LetterPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate("/")}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 100,
          background: "none",
          border: "1px solid #94A6FF44",
          borderRadius: 8,
          color: "#94A6FF",
          padding: "8px 16px",
          cursor: "pointer",
          fontSize: 14,
          backdropFilter: "blur(4px)",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.opacity = 0.7)}
        onMouseLeave={(e) => (e.target.style.opacity = 1)}
      >
        Back
      </button>
      <Canvas shadows camera>
        <ambientLight intensity={0.3} color={0xffffff} />
        <mesh position={[0, 0, -0.1]} receiveShadow>
          <planeGeometry args={[60, 15]} />
          <meshStandardMaterial color={0x000000} />
        </mesh>
        <Suspense fallback={<LoadingProgress />}>
          <LetterScene />
        </Suspense>
        <EffectComposer>
          <Vignette eskil={false} offset={0.1} darkness={0.7} />
        </EffectComposer>
        <Rig />
      </Canvas>
    </>
  );
};

export default LetterPage;
