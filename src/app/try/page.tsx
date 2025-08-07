// src/app/try/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WheelGame from "./WheelGame";

export default function TryYourLuckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl rounded-2xl shadow-2xl backdrop-blur-lg bg-card/60">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            🎡 Try Your Luck!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <WheelGame />
        </CardContent>
      </Card>
    </div>
  );
}
