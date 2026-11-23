import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, Plus } from "lucide-react";

import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";
import Footer from "../components/Footer";

import { fetchFoods } from "../lib/foodsApi.js";
import { categoryLabel } from "../lib/labels";
import { getCommunityRecipes } from "../lib/communityStore";
import AddRecipeModal from "../components/AddRecipeModal";

const FOODS_PER_PAGE = 20;

export default function Foods() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [foods, setFoods] = useState([]);
  const [communityFoods, setCommunityFoods] = useState(() => getCommunityRecipes());
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const selectedCategory = searchParams.get("category") || "Barchasi";

  useEffect(() => {
    fetchFoods()
      .then(setFoods)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory]);

  const allFoods = [...communityFoods, ...foods];

  const filteredFoods = allFoods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "Barchasi" ||
      food.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredFoods.length / FOODS_PER_PAGE);
  const startIndex = (page - 1) * FOODS_PER_PAGE;

  const currentFoods = filteredFoods.slice(
    startIndex,
    startIndex + FOODS_PER_PAGE
  );

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    setPage(newPage);

    document.getElementById("food-grid")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const clearCategory = () => {
    setSearchParams({});
  };

  return (
    <>
      <Navbar />

      <main
        id="foods"
        className="min-h-screen bg-[#faf6ef] px-5 py-24 lg:px-12"
      >
        <div className="mx-auto max-w-[1440px]">

          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[4px] text-[#a16c4b]">
              {t("food.searchTitle")}
            </p>

            <h2 className="font-display text-4xl font-bold text-[#493326] sm:text-5xl">
              {selectedCategory === "Barchasi"
                ? t("common.allFoods")
                : categoryLabel(t, selectedCategory)}
            </h2>

            <p className="mt-3 text-sm text-[#978574]">
              {t("food.searchDesc")}
            </p>
          </div>

          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setShowAddRecipe(true)}
              className="flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#9b6242] to-[#78472f] px-6 py-4 text-sm font-bold text-white shadow-md shadow-[#8d5639]/15 transition hover:-translate-y-0.5"
            >
              <Plus size={18} />
              {t("food.addOwnRecipe")}
            </button>
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-[#e8dccd] bg-white px-5 py-4">
              <Search size={20} className="text-[#a56843}" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("food.searchPlaceholder")}
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#b6a493]"
              />

              {search && (
                <button onClick={() => setSearch("")}>
                  <X size={18} className="text-[#a56843]" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#e8dccd] px-6 py-4 text-sm font-semibold text-[#79583f]">
              <SlidersHorizontal size={18} />
              {t("food.countDishes", { count: filteredFoods.length })}
            </div>
          </div>

          {selectedCategory !== "Barchasi" && (
            <div className="mb-9">
              <button
                onClick={clearCategory}
                className="rounded-full border border-[#e8dccd] px-5 py-2.5 text-sm text-[#79583f] hover:bg-white"
              >
                <span className="flex items-center gap-2">
                  <X size={15} />
                  {t("food.clearFilter")}
                </span>
              </button>
            </div>
          )}

          {loading ? (
            <p className="py-20 text-center text-sm text-[#897666]">
              {t("common.loading")}
            </p>
          ) : error ? (
            <p className="py-20 text-center text-sm text-red-600">
              {t("common.error")}: {error}
            </p>
          ) : filteredFoods.length > 0 ? (
            <>
              <div
                id="food-grid"
                className="grid scroll-mt-24 grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
              >
                {currentFoods.map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onSelect={() => navigate(`/recipe/${food.id}`)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => changePage(page - 1)}
                    disabled={page === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8dccd] bg-white text-lg font-bold text-[#8d5639] transition hover:bg-[#8d5639] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#8d5639]"
                    aria-label={t("common.previous")}
                  >
                    ←
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((number) => (
                    <button
                      key={number}
                      onClick={() => changePage(number)}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold transition ${
                        page === number
                          ? "border-[#8d5639] bg-[#8d5639] text-white shadow-md"
                          : "border-[#e8dccd] bg-white text-[#8d5639] hover:border-[#8d5639] hover:bg-[#f4ede3]"
                      }`}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    onClick={() => changePage(page + 1)}
                    disabled={page === totalPages}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8dccd] bg-white text-lg font-bold text-[#8d5639] transition hover:bg-[#8d5639] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#8d5639]"
                    aria-label={t("common.next")}
                  >
                    →
                  </button>
                </div>
              )}

              <p className="mt-4 text-center text-xs text-[#a18b78]">
                {t("food.rangeSummary", {
                  from: startIndex + 1,
                  to: Math.min(startIndex + FOODS_PER_PAGE, filteredFoods.length),
                  total: filteredFoods.length,
                })}
              </p>
            </>
          ) : (
            <div className="py-20 text-center">
              <span className="text-5xl">🍽️</span>

              <h3 className="mt-5 font-display text-2xl font-bold text-[#493326]">
                {t("food.notFound")}
              </h3>

              <p className="mt-2 text-sm text-[#897666]">
                {t("food.emptyCategory")}
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  clearCategory();
                }}
                className="mt-6 rounded-full bg-[#8d5639] px-7 py-3 text-sm font-bold text-white hover:bg-[#70432e]"
              >
                {t("food.showAll")}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      {showAddRecipe && (
        <AddRecipeModal
          onClose={() => setShowAddRecipe(false)}
          onCreated={(recipe) => {
            setCommunityFoods((current) => [recipe, ...current]);
            setSearch("");
            setSearchParams({});
            navigate(`/recipe/${recipe.id}`);
          }}
        />
      )}
    </>
  );
}
