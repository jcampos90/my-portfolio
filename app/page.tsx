import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Contact, Footer } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
