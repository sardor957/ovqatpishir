import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    id: 1,
    value: "Suyuq ovqatlar",
    labelKey: "categories.liquid",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=85",
    number: "01",
  },
  {
    id: 2,
    value: "Quyuq ovqatlar",
    labelKey: "categories.main",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=700&q=85",
    number: "02",
  },
  {
    id: 3,
    value: "Pishiriqlar",
    labelKey: "categories.bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&q=85",
    number: "03",
  },
  {
    id: 4,
    value: "Shirinliklar",
    labelKey: "categories.desserts",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700&q=85",
    number: "04",
  },
  {
    id: 5,
    value: "Xamirli ovqatlar",
    labelKey: "categories.dough",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=700&q=85",
    number: "05",
  },
  {
    id: 6,
    value: "Salatlar",
    labelKey: "categories.salads",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=85",
    number: "06",
  },
  {
    id: 7,
    value: "Milliy taomlar",
    labelKey: "categories.national",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=700&q=85",
    number: "07",
  },
  {
    id: 8,
    value: "Nonushtalar",
    labelKey: "categories.breakfast",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=700&q=85",
    number: "08",
  },
];

export default function Categories({ onCategorySelect }) {
  const { t } = useTranslation();

  return (
    <section
      id="categories"
      className="bg-[#f4ede3] px-5 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">

        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[4px] text-[#a16c4b]">
              {t("categories.title")}
            </p>

            <h2 className="font-display text-4xl font-bold text-[#493326] sm:text-5xl lg:text-6xl">
              {t("categories.headingTop")}
              <span className="block italic text-[#a56843]">
                {t("categories.headingAccent")}
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#897666]">
            {t("categories.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.button
              type="button"
              key={category.id}
              onClick={() => onCategorySelect?.(category.value)}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group relative h-[350px] overflow-hidden rounded-[24px] bg-[#dfcbb5] text-left shadow-sm"
            >
              <img
                src={category.image}
                alt={t(category.labelKey)}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#24180f]/85 via-[#24180f]/10 to-transparent" />

              <span className="absolute left-5 top-5 rounded-full border border-white/40 bg-white/20 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                {category.number}
              </span>

              <div className="absolute bottom-0 left-0 w-full p-6">
                <p className="mb-2 text-xs font-medium text-white/75">
                  {t("categories.count")}
                </p>

                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {t(category.labelKey)}
                  </h3>

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#75452f] transition duration-300 group-hover:rotate-45 group-hover:bg-[#a56843] group-hover:text-white">
                    <ArrowUpRight size={21} />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

      </div>
    </section>
  );
}
