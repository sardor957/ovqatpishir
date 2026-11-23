import Navbar from "../components/Navbar";
import CookingProcess from "../components/CookingProcess";
import Footer from "../components/Footer";
export default function Cooking() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <CookingProcess />
      </main>

      <Footer />
    </>
  );
}
