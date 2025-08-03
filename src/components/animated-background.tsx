"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { LeafIcon } from "@/components/icons";
import { useState, useEffect } from "react";

type LeafStyle = {
  left: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
  transform: string;
};

const FallingLeaves = () => {
  const [leaves, setLeaves] = useState<LeafStyle[]>([]);

  useEffect(() => {
    const generatedLeaves = Array.from({ length: 15 }).map(() => ({
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 5 + 10}s`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.7 + 0.3,
      transform: `scale(${Math.random() * 0.5 + 0.5})`,
    }));
    setLeaves(generatedLeaves);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {leaves.map((style, i) => (
        <div
          key={i}
          className="absolute -top-10 animate-fall"
          style={style}
        >
          <LeafIcon className="h-6 w-6 text-primary/70" />
        </div>
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
          }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};


export function AnimatedBackground() {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <div className="fixed inset-0 z-[-1] h-screen w-full">
        {resolvedTheme === 'light' && (
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Sunny farm landscape"
            data-ai-hint="sunny farm"
            fill
            className="object-cover transition-opacity duration-1000 opacity-100"
            sizes="100vw"
            priority
          />
        )}
        {resolvedTheme === 'dark' && (
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Moonlit forest"
            data-ai-hint="moonlit forest"
            fill
            className="object-cover transition-opacity duration-1000 opacity-100"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
      </div>
      <FallingLeaves />
    </>
  );
}
