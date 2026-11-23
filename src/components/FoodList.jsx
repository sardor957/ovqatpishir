import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { supabase } from "./supabase";
import FoodCard from "./FoodCard";

const PAGE_SIZE = 20;

export default function FoodList({ onSelect }) {
  const { t } = useTranslation();
  const [foods, setFoods] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [totalFoods, setTotalFoods] = useState(0);

  const totalPages = Math.ceil(totalFoods / PAGE_SIZE);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      setError("");

      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, count, error } = await supabase
        .from("foods")
        .select("*", { count: "exact" })
        .order("id", { ascending: true })
        .range(from, to);

      if (error) {
        setError(error.message);
        setFoods([]);
      } else {
        setFoods(data || []);
        setTotalFoods(count || 0);
      }

      setLoading(false);
    };

    fetchFoods();
  }, [page]);

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {loading ? (
        <p className="py-10 text-center text-[#8d5639]">
          {t("food.loading")}
        </p>
      ) : error ? (
        <p className="py-10 text-center text-red-500">
          {t("common.error")}: {error}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {foods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onSelect={onSelect}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => changePage(page - 1)}
                disabled={page === 1}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#eee3d6] bg-white text-[#8d5639] transition hover:bg-[#f4ede3] disabled:cursor-not-allowed disabled:opacity-40"
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
                  className={`h-9 w-9 rounded-lg border text-sm font-bold transition ${
                    page === number
                      ? "border-[#8d5639] bg-[#8d5639] text-white"
                      : "border-[#eee3d6] bg-white text-[#8d5639] hover:bg-[#f4ede3]"
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={() => changePage(page + 1)}
                disabled={page === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#eee3d6] bg-white text-[#8d5639] transition hover:bg-[#f4ede3] disabled:cursor-not-allowed disabled:opacity-40"
              >
                →
              </button>
            </div>
          )}

          <p className="mt-3 text-center text-xs text-[#a18b78]">
            {t("food.pageSummary", { count: totalFoods, page, pages: totalPages })}
          </p>
        </>
      )}
    </div>
  );
}
