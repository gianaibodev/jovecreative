import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Team } from "@/components/Team";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-gold-base/30 selection:text-gold-light">
      <Nav />
      <Hero />
      <Features />
      <Pricing />
      <Team />
      <Footer />
    </main>
  );
}
