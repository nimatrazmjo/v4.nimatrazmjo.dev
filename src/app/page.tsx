import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Projects />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}

