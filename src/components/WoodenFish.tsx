import { PositionalAudio, useGLTF } from "@react-three/drei";
import { type GroupProps } from "@react-three/fiber";
import { useAnimationControls } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useRef } from "react";
import { PositionalAudio as PositionalAudioImpl, type Mesh } from "three";

interface WoodenFishProps {
  onClick: VoidFunction;
}

const WoodenFish: React.FC<WoodenFishProps> = ({ onClick }) => {
  const { nodes, materials } = useGLTF("scene.glb");
  const {
    木鱼: woodenFish,
    功德锤: pillars,
    球体: sphere,
  } = nodes as Record<"木鱼" | "球体" | "功德锤", Mesh>;

  const animation = useAnimationControls();
  const meritHammerRef = useRef<GroupProps>(null!);
  const audio = useRef<PositionalAudioImpl>(null!);

  return (
    <motion.group>
      <motion.mesh
        geometry={woodenFish.geometry}
        material={materials["木鱼"]}
        onClick={async () => {
          onClick();

          animation.stop();
          audio.current.stop();
          audio.current.play();

          animation.start("click").then(() => animation.start("unClick"));
        }}
      />

      <motion.group
        ref={meritHammerRef}
        animate={animation}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        initial="unClick"
        position={[0, 0, -50]}
        variants={{
          click: {
            rotateX: 1.16,
          },
          unClick: {
            rotateX: 1,
          },
        }}
      >
        <motion.mesh
          position={[0, 80, -20]}
          geometry={sphere.geometry}
          material={materials["锤头"]}
        />
        <motion.mesh
          position={[0, 10, -20]}
          geometry={pillars.geometry}
          material={materials["木头柄zi"]}
        />
      </motion.group>

      <PositionalAudio
        ref={audio}
        url="/木鱼音效.mp3"
        distance={100}
        loop={false}
      />
    </motion.group>
  );
};

export default WoodenFish;
