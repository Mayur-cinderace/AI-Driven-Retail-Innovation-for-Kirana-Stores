import { AnimatedBackground } from "@/components/animated-background";
import { Header } from "@/components/layout/header";
import { SignupCard } from "@/components/signup-card";

export default function SignupPage() {
  return (
    <div className="relative min-h-screen w-full bg-background">
      <Header />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        <SignupCard />
      </main>
      <AnimatedBackground />
    </div>
  );
}
