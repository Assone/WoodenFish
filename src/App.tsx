import { Billboard, OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useCallback, useEffect, useRef, useState } from "react";
import WoodenFish, {
  type WoodenFishImperativeHandle,
} from "./components/WoodenFish";
import { Button } from "./components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";

function App() {
  const [count, setCount] = useState(0);
  const [texts, setTexts] = useState<number[]>([]);
  const textId = useRef(0);
  const [auto, setAuto] = useState(false);
  const woodenFishImperativeHandle = useRef<WoodenFishImperativeHandle>(null!);

  const onClick = useCallback(() => {
    setCount(count + 1);
    setTexts((prev) => [...prev, textId.current++]);
    woodenFishImperativeHandle.current.sequence();
  }, [count]);

  useEffect(() => {
    if (!auto) return;

    const timeId = setInterval(onClick, 1000);

    return () => {
      clearInterval(timeId);
    };
  }, [auto, onClick]);

  return (
    <main className="w-full h-full bg-black">
      <div className="select-none font-bold text-2xl text-white p-4 flex gap-4 items-center">
        <span>功德数： {count}</span>
        {count < 500 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipContent>累积功德500方可解锁</TooltipContent>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-green-500 hover:bg-green-500/90 !pointer-events-auto"
                  disabled
                >
                  自动点击
                </Button>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            className={
              auto
                ? "bg-red-500 hover:bg-red-500/90"
                : "bg-green-500 hover:bg-green-500/90"
            }
            onClick={() => setAuto(!auto)}
          >
            {auto ? "停止点击" : "自动点击"}
          </Button>
        )}
      </div>

      <Canvas camera={{ position: [10, 15, 20] }}>
        <ambientLight intensity={Math.PI} />
        <pointLight position={[0, 30, 20]} decay={0} />
        <spotLight position={[0, 100, 0]} decay={0} />
        <spotLight position={[0, 0, 200]} angle={-180} decay={0} />
        <spotLight position={[0, -100, 0]} angle={90} decay={0} />
        <spotLight position={[0, 100, 200]} angle={270} decay={0} />

        <WoodenFish ref={woodenFishImperativeHandle} onClick={onClick} />

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
