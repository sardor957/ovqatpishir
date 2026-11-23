import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Clock3, Heart, ArrowUpRight } from "lucide-react";
import { categoryLabel, difficultyLabel, timeLabel } from "../lib/labels";

export default function FoodCard({ food, onSelect }) {
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = (event) => {
    event.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(food)}
      className="group cursor-pointer overflow-hidden rounded-[14px] border border-[#eee3d6] bg-white shadow-sm transition-shadow hover:shadow-md hover:shadow-[#72543b]/10"
    >
      <div className="relative h-[140px] overflow-hidden bg-[#eadbc8]">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[8px] font-bold text-[#8d5639] backdrop-blur">
          {categoryLabel(t, food.category)}
        </span>
      </div>

      <div className="p-2.5">
        <div className="mb-1.5 flex items-center gap-1 text-[10px] text-[#a18b78]">
          <Clock3 size={11} />
          {timeLabel(t, food.time)}
          <span className="ml-auto">{difficultyLabel(t, food.difficulty)}</span>
        </div>

        <div className="flex items-center justify-between gap-1.5">
          <h3 className="font-display text-sm font-bold text-[#493326] line-clamp-1">
            {food.name}
          </h3>

          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f4ede3] text-[#8d5639] transition group-hover:bg-[#8d5639] group-hover:text-white">
            <ArrowUpRight size={13} />
          </span>
        </div>

        <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-[#978574]">
          {food.description}
        </p>

        <div className="mt-2.5 border-t border-[#f0e7dc] pt-2 text-[11px] font-bold text-[#a56843]">
          {t("food.viewRecipe")}
        </div>
      </div>
    </motion.article>
  );
}