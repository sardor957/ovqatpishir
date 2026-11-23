import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
export default function Catalog() {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    navigate(`/foods?category=${encodeURIComponent(category)}`);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Categories onCategorySelect={handleCategorySelect} />
      </main>

      <Footer />
    </>
  );
}
