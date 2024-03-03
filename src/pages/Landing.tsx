import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { Hero } from "../components/Hero";
import { Insights } from "../components/Insights";

export function Landing() {
  return (
    <div className="mx-auto">
      <NavBar />

      <Hero />

      <Insights />

      <Footer />
    </div>
  );
}
