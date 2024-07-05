import { Billboard, OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useRef, useState } from "react";
import WoodenFish from "./components/WoodenFish";

function App() {
  const [count, setCount] = useState(0);
  const [texts, setTexts] = useState<number[]>([]);
  const textId = useRef(0);

  return (
    <main className="w-full h-full bg-black">
      <div className="select-none font-bold text-2xl text-white p-4">
        功德数： {count}
      </div>

      <Canvas camera={{ position: [10, 15, 20] }}>
        <ambientLight intensity={Math.PI} />
        <pointLight position={[0, 30, 20]} decay={0} />
        <spotLight position={[0, 100, 0]} decay={0} />
        <spotLight position={[0, 0, 200]} angle={-180} decay={0} />
        <spotLight position={[0, -100, 0]} angle={90} decay={0} />
        <spotLight position={[0, 100, 200]} angle={270} decay={0} />

        <WoodenFish
          onClick={() => {
            setCount(count + 1);
            setTexts((prev) => [...prev, textId.current++]);
          }}
        />

        <Billboard>
          {texts.map((id) => (
            <motion.group
              position={[0, 70, 20]}
              key={id}
              animate={{
                y: 100,
              }}
              onAnimationComplete={() => {
                setTexts((prev) => prev.filter((v) => v !== id));
              }}
            >
              <Text
                color="white"
                fontSize={20}
                anchorX="center"
                anchorY="middle"
              >
                功德+1
              </Text>

              <meshBasicMaterial color="red" />
            </motion.group>
          ))}
        </Billboard>

        <OrbitControls minDistance={200} maxDistance={400} />
      </Canvas>
    </main>
  );
}

export default App;
