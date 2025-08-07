"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const choices = [
  "🎁 ₹10 OFF",
  "😂 A joke!",
  "🎉 Free delivery",
  "🍬 Candy",
  "😅 Better luck next time!",
  "🧃 Free juice",
];

const WheelGame = () => {
  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const anglePerSegment = 360 / choices.length;

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    const spins = 8;
    const randomIndex = Math.floor(Math.random() * choices.length);
    const segmentOffset = anglePerSegment / 2;
    const finalAngle =
      360 * spins + (360 - randomIndex * anglePerSegment - segmentOffset);

    if (wheelRef.current) {
      wheelRef.current.style.transition =
        "transform 5s cubic-bezier(0.1, 0.9, 0.2, 1)";
      wheelRef.current.style.transform = `rotate(${finalAngle}deg)`;
    }

    setTimeout(() => {
      setPrize(choices[randomIndex]);
      setSpinning(false);
    }, 5500);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-[300px] h-[300px]">
        <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-l-transparent border-r-transparent border-b-red-600"></div>
        </div>

        <div
          ref={wheelRef}
          className="w-full h-full rounded-full border-[10px] border-white shadow-xl overflow-hidden"
        >
          {choices.map((choice, i) => {
            const angle = i * anglePerSegment;
            const skewAngle = 90 - anglePerSegment;
            const color = i % 2 === 0 ? "#fde68a" : "#facc15";

            return (
              <div
                key={i}
                className="absolute w-1/2 h-1/2 top-1/2 left-1/2 origin-top-left"
                style={{
                  transform: `rotate(${angle}deg) skewY(-${skewAngle}deg)`,
                  backgroundColor: color,
                }}
              >
                <div
                  className="absolute text-center font-bold text-sm text-black"
                  style={{
                    transform: "translate(-65%, -65%) rotate(0deg)",
                    top: "50%",
                    left: "50%",
                    width: "100px",
                  }}
                >
                  {choice}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        onClick={spinWheel}
        disabled={spinning}
        className="px-8 py-4 text-xl rounded-full"
      >
        {spinning ? "Spinning..." : "Spin Now!"}
      </Button>

      {prize && (
        <div className="text-center mt-4 p-4 bg-white rounded-xl shadow-lg">
          <p className="text-lg font-semibold">🎉 You won: {prize}</p>
        </div>
      )}
    </div>
  );
};

export default WheelGame;
