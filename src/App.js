import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import Scene from "./components/Scene";
import Rig from "./components/Rig";
import VerifyModal from "./components/VerifyModal";

function App() {
  const [showVerify, setShowVerify] = useState(false);

  return (
    <>
      <Canvas shadows camera>
        <ambientLight intensity={0.6} color={0xffffff} />

        {/* This is the wall that supports shadows */}
        <mesh position={[0, 0, -0.1]} receiveShadow>
          <planeGeometry args={[20, 15]} />
          <meshStandardMaterial color={0x000000} />
        </mesh>
        <Scene onDoorClick={() => setShowVerify(true)} />

        <EffectComposer>
          {/* <Noise opacity={0.01} /> */}
          <Vignette eskil={false} offset={0.1} darkness={0.5} />
        </EffectComposer>

        <Rig />
      </Canvas>

      {showVerify && <VerifyModal onClose={() => setShowVerify(false)} />}
    </>
  );
}

export default App;
