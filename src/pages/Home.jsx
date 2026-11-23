import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CommunitySection from "../components/CommunitySection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <CommunitySection />
      </main>

      <Footer />
    </>
  );
}
