import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from "framer-motion";
import { ChefHat, Sparkles } from "lucide-react";

export default function Intro({ onComplete }) {
  const { t } = useTranslation();
  const letters = t("intro.welcome").split("");
  const [showText, setShowText] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 900);
    const leaveTimer = setTimeout(() => setLeaving(true), 4800);
    const doneTimer = setTimeout(() => onComplete?.(), 5700);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#faf6ef]"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#e9d5bd]/50 blur-3xl"
          />

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8 }}
            className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#c99b72]/20 blur-3xl"
          />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[440px] w-[440px] rounded-full border border-dashed border-[#c49b78]/40 sm:h-[580px] sm:w-[580px]"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[360px] w-[360px] rounded-full border border-[#e4cbb0] sm:h-[470px] sm:w-[470px]"
          />

          <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-5 text-center">

            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, type: "spring" }}
              className="mb-7 flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8d5639] text-white shadow-xl shadow-[#8d5639]/25"
              >
                <ChefHat size={31} />
              </motion.div>

              <div className="text-left">
                <h2 className="font-display text-3xl font-bold text-[#593a29]">
                  {t("intro.kitchen")}
                </h2>
                <p className="text-[9px] font-bold uppercase tracking-[3px] text-[#a27a5e]">
                  {t("intro.tagline")}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.65, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.35,
                type: "spring",
              }}
              className="relative mb-8 h-48 w-48 sm:h-60 sm:w-60"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-3 rounded-full border-2 border-dashed border-[#bd936e]/50"
              />

              <div className="h-full w-full overflow-hidden rounded-full border-[7px] border-white shadow-2xl shadow-[#8d5639]/20">
                <img
                  src="https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=90"
                  alt={t("intro.imageAlt")}
                  className="h-full w-full object-cover"
                />
              </div>

              <motion.div
                animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-4 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#b5794e] shadow-lg"
              >
                <Sparkles size={24} />
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mb-3 text-xs font-bold uppercase tracking-[4px] text-[#a27a5e]"
            >
              {t("intro.toWorld")}
            </motion.p>

            <div className="flex flex-wrap justify-center gap-x-2">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 45, rotateX: -90 }}
                  animate={
                    showText
                      ? { opacity: 1, y: 0, rotateX: 0 }
                      : {}
                  }
                  transition={{
                    duration: 0.55,
                    delay: index * 0.055,
                    type: "spring",
                  }}
                  className="font-display text-4xl font-bold text-[#8d5639] sm:text-6xl"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1 }}
              className="mt-5 text-sm text-[#897666]"
            >
              {t("intro.line")}
            </motion.p>

            <div className="mt-9 h-1.5 w-44 overflow-hidden rounded-full bg-[#e8dccd]">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.7, ease: "easeInOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#c99b72] via-[#a56843] to-[#70432e]"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-3 text-[9px] font-bold uppercase tracking-[3px] text-[#ad9279]"
            >
              {t("intro.loading")}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
