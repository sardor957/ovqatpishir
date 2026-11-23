import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import RecipeModal from "../components/RecipeModal";
import Footer from "../components/Footer";

import { fetchFood } from "../lib/foodsApi";
import { getCommunityRecipes } from "../lib/communityStore";

export default function Recipe() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const communityRecipe = getCommunityRecipes().find((item) => String(item.id) === String(id));
    if (communityRecipe) {
      setFood(communityRecipe);
      setLoading(false);
      return;
    }
    fetchFood(id)
      .then(setFood)
      .catch(() => setFood(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[60vh] items-center justify-center bg-[#faf6ef]">
          <p className="text-sm text-[#897666]">{t("common.loading")}</p>
        </main>

        <Footer />
      </>
    );
  }

  if (!food) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#faf6ef]">
          <h2 className="font-display text-3xl font-bold text-[#493326]">
            {t("food.notFoundRecipe")}
          </h2>

          <button
            onClick={() => navigate("/foods")}
            className="mt-6 rounded-full bg-[#8d5639] px-7 py-3 font-bold text-white"
          >
            {t("food.backFoods")}
          </button>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#faf6ef] py-10">
        <RecipeModal
          food={food}
          onClose={() => navigate("/foods")}
        />
      </main>

      <Footer />
    </>
  );
}