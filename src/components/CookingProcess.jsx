import { useState } from "react";
import { useTranslation } from 'react-i18next';

import { motion, AnimatePresence } from "framer-motion";
import {
  ChefHat,
  ShoppingBasket,
  CookingPot,
  Utensils,
  ArrowRight,
  Leaf,
  Clock3,
  Flame,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

import { categoryLabel } from "../lib/labels";

const steps = [
  {
    number: "01",
    titleKey: "process.choose",
    descKey: "process.chooseDesc",
    icon: ShoppingBasket,
  },
  {
    number: "02",
    titleKey: "process.prepare",
    descKey: "process.prepareDesc",
    icon: ChefHat,
  },
  {
    number: "03",
    titleKey: "process.cook",
    descKey: "process.cookDesc",
    icon: CookingPot,
  },
  {
    number: "04",
    titleKey: "process.enjoy",
    descKey: "process.enjoyDesc",
    icon: Utensils,
  },
];

const tips = [
  {
    icon: Leaf,
    titleKey: "process.tip1Title",
    descKey: "process.tip1Desc",
  },
  {
    icon: Clock3,
    titleKey: "process.tip2Title",
    descKey: "process.tip2Desc",
  },
  {
    icon: Flame,
    titleKey: "process.tip3Title",
    descKey: "process.tip3Desc",
  },
  {
    icon: Sparkles,
    titleKey: "process.tip4Title",
    descKey: "process.tip4Desc",
  },
];

const categoryValues = [
  "Suyuq ovqatlar",
  "Quyuq ovqatlar",
  "Pishiriqlar",
  "Shirinliklar",
  "Xamirli ovqatlar",
  "Salatlar",
  "Milliy taomlar",
  "Nonushtalar",
];

const faqs = [
  { qKey: "process.faq1Q", aKey: "process.faq1A" },
  { qKey: "process.faq2Q", aKey: "process.faq2A" },
  { qKey: "process.faq3Q", aKey: "process.faq3A" },
];

export default function CookingProcess() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section
      id="cooking"
      className="relative overflow-hidden bg-[#493326] px-5 py-24 lg:px-12 lg:py-32"
    >
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#a56843]/20 blur-[100px]" />
      <div className="pointer-events-none absolute -left-40 bottom-40 h-96 w-96 rounded-full bg-[#a56843]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-[1440px]">

        <div className="mx-auto mb-20 max-w-2xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[4px] text-[#d3a47e]">
            {t("process.eyebrow")}
          </p>

          <h2 className="font-display text-4xl font-bold leading-tight text-[#faf6ef] sm:text-5xl lg:text-6xl">
            {t("process.headingTop")}
            <span className="block italic text-[#d3a47e]">
              {t("process.headingAccent")}
            </span>
          </h2>

          <p className="mt-6 text-sm leading-7 text-[#d5c3b2]">
            {t("process.description")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="group relative rounded-[24px] border border-white/10 bg-white/[0.05] p-7 transition duration-500 hover:-translate-y-2 hover:bg-white/[0.1]"
              >
                <div className="mb-9 flex items-center justify-between">
                  <span className="font-display text-5xl font-bold text-[#d3a47e]/30">
                    {step.number}
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a56843]/20 text-[#d3a47e] transition duration-500 group-hover:rotate-12 group-hover:bg-[#a56843] group-hover:text-white">
                    <Icon size={27} />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#faf6ef]">
                  {t(step.titleKey)}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#c5b2a0]">
                  {t(step.descKey)}
                </p>

                <div className="mt-8 h-px w-full bg-white/10" />

                <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d3a47e]">
                  {t("process.result")}
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-2"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[4px] text-[#d3a47e]">
              {t("process.tipsEyebrow")}
            </p>

            <h2 className="font-display text-3xl font-bold leading-tight text-[#faf6ef] sm:text-4xl lg:text-5xl">
              {t("process.tipsTop")}
              <span className="block italic text-[#d3a47e]">
                {t("process.tipsAccent")}
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map((tip, index) => {
              const Icon = tip.icon;

              return (
                <motion.div
                  key={tip.titleKey}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className="group rounded-[24px] border border-white/10 bg-white/[0.05] p-6 transition duration-500 hover:-translate-y-2 hover:bg-white/[0.1]"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a56843]/20 text-[#d3a47e] transition duration-500 group-hover:bg-[#a56843] group-hover:text-white">
                    <Icon size={23} />
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#faf6ef]">
                    {t(tip.titleKey)}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#c5b2a0]">
                    {t(tip.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <p className="mb-7 font-display text-2xl font-bold text-[#faf6ef] sm:text-3xl">
            {t("process.catsTitle")}
          </p>

          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
            {categoryValues.map((value) => (
              <Link
                key={value}
                to={`/foods?category=${encodeURIComponent(value)}`}
                className="rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-[#e8d8c6] transition duration-300 hover:-translate-y-1 hover:border-[#a56843] hover:bg-[#a56843] hover:text-white"
              >
                {categoryLabel(t, value)}
              </Link>
            ))}
          </div>
        </motion.div>

        <div className="mx-auto mt-28 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[4px] text-[#d3a47e]">
              {t("process.faqEyebrow")}
            </p>

            <h2 className="font-display text-3xl font-bold leading-tight text-[#faf6ef] sm:text-4xl">
              {t("process.faqTop")}
              <span className="block italic text-[#d3a47e]">
                {t("process.faqAccent")}
              </span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.qKey}
                  className={`overflow-hidden rounded-2xl border transition duration-300 ${
                    isOpen
                      ? "border-[#a56843]/60 bg-white/[0.1]"
                      : "border-white/10 bg-white/[0.05]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-lg font-bold text-[#faf6ef]">
                      {t(faq.qKey)}
                    </span>

                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-[#d3a47e] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-7 text-[#c5b2a0]">
                          {t(faq.aKey)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-28 flex flex-col items-center justify-between gap-6 rounded-[25px] border border-white/10 bg-[#faf6ef] p-8 sm:flex-row sm:p-10"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#a56843]">
              {t("process.cta")}
            </p>

            <h3 className="mt-3 font-display text-2xl font-bold text-[#493326] sm:text-3xl">
              {t("process.ctaDesc")}
            </h3>
          </div>

          <Link
            to="/catalog"
            className="flex shrink-0 items-center gap-3 rounded-full bg-[#8d5639] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#70432e]"
          >
            {t("process.chooseRecipe")}
            <ArrowRight size={18} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}