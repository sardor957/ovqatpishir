import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { ArrowRight, Clock3, ChefHat, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#faf6ef] px-5 pb-20 pt-12 lg:px-12 lg:pb-28 lg:pt-20"
    >
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#e9d5bd]/40 blur-3xl" />

      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">

        <motion.div
          initial={{ opacity: 0, x: -45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#e6d4bf] bg-white/70 px-4 py-2">
            <Sparkles size={15} className="text-[#b5794e]" />
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-[#956849]">
              {t("hero.eyebrow")}
            </span>
          </div>

          <h1 className="font-display text-5xl font-bold leading-[1.12] tracking-tight text-[#493326] sm:text-6xl lg:text-[76px]">
            {t("hero.line1")}
            <span className="mt-2 block italic text-[#a56843]">
              {t("hero.line2")}
            </span>
            {t("hero.line3")}
            <span className="block">{t("hero.line4")}</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#897666]">
            {t("hero.description")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">

            <Link
              to="/catalog"
              className="group flex items-center gap-3 rounded-full bg-[#8d5639] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#8d5639]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#70432e]"
            >
              {t("footer.recipes")}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/foods"
              className="rounded-full border border-[#ddcbb8] px-7 py-4 text-sm font-bold text-[#684c3a] transition hover:bg-white"
            >
              {t("hero.browseFoods")}
            </Link>

          </div>

          <div className="mt-12 flex flex-wrap gap-8 border-t border-[#e8dccd] pt-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eee2d3] text-[#8d5639]">
                <ChefHat size={21} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#493326]">100+</p>
                <p className="text-xs text-[#9a8674]">{t("hero.statRecipes")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eee2d3] text-[#8d5639]">
                <Clock3 size={21} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#493326]">{t("hero.statEasy")}</p>
                <p className="text-xs text-[#9a8674]">{t("hero.statSteps")}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 35 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[650px]"
        >
          <div className="relative aspect-[4/4.2] overflow-hidden rounded-[48%_48%_28px_28px] bg-[#eadbc8] shadow-2xl shadow-[#72543b]/15">
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=90"
              alt={t("hero.imageAlt")}
              className="h-full w-full object-cover transition duration-1000 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#352719]/30 via-transparent to-transparent" />
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -left-5 top-16 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:-left-10"
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="text-xs font-bold text-[#493326]">{t("hero.floatTitle")}</p>
                <p className="text-[10px] text-[#9a8674]">{t("hero.floatSub")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-5 right-3 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:right-[-20px]"
          >
            <p className="text-xs text-[#9a8674]">{t("hero.mood")}</p>
            <p className="mt-1 text-sm font-bold text-[#8d5639]">
              {t("hero.slogan")}
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
