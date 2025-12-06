import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const Rig = () => {
  const { camera, mouse } = useThree();
  const vec = new Vector3();
  return useFrame(() =>
    camera.position.lerp(
      vec.set(mouse.x * 0.5, mouse.y * 0.5, camera.position.z),
      0.2,
    ),
  );
};

export default Rig;

