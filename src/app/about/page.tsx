import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Skills } from "@/components/skills";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
            {/* Left: Bio */}
            <div>
              <Badge variant="outline" className="mb-6 rounded-full py-1 px-4 border-primary/20 bg-primary/5 text-primary">
                About Me
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                I'm Nimat Razmjo, a <span className="text-vibrant">Senior Software Engineer</span> based in Pittsburgh.
              </h1>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  With over 12 years of experience in the software industry, I have dedicated my career
                  to designing and implementing scalable backend systems, optimizing high-traffic APIs,
                  and building intuitive user interfaces.
                </p>
                <p>
                  My journey started with a passion for problem-solving and has evolved into leading
                  engineering teams for impactful platforms like Jobs.af and Draft Nation. I thrive in
                  environments that challenge me to think architecturally while maintaining a high
                  bar for code quality and performance.
                </p>
                <p>
                  When I'm not coding, I'm usually exploring new cloud technologies, contributing
                  to open-source, or sharing technical insights through my articles.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 mb-10">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Pittsburgh, PA</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>nimatullah.razmjo@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Available for work</span>
                </div>
              </div>

              <Button className="rounded-full h-12 px-8 gap-2">
                <Download className="w-4 h-4" /> Download Resume
              </Button>
            </div>

            {/* Right: Featured Meta/Image Placeholder */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <div className="relative aspect-square rounded-2xl overflow-hidden glass-card border-white/5 flex items-center justify-center bg-zinc-900">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl font-bold text-primary">NR</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Nimatullah Razmjo</h3>
                  <p className="text-sm text-muted-foreground mb-4">Lead Full Stack Engineer</p>
                  <div className="flex justify-center gap-2">
                    <Badge variant="secondary" className="bg-white/5">AWS AI Practitioner</Badge>
                    <Badge variant="secondary" className="bg-white/5">CKAD</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Skills />
      </main>
      <Footer />
    </div>
  );
}
