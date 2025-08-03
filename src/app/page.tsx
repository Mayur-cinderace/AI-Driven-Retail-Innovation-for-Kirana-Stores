import { AnimatedBackground } from "@/components/animated-background";
import { Header } from "@/components/layout/header";
import { LoginCard } from "@/components/login-card";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-background">
      <Header />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        <LoginCard />
      </main>
      <AnimatedBackground />
    </div>
  );
}
