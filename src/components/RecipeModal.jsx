import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { getRecipeReviews, addRecipeReview } from "../lib/communityStore";
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from "framer-motion";
import { categoryLabel, difficultyLabel, timeLabel } from "../lib/labels";
import {
  Clock3, ChefHat, Users, CheckCircle2,
  Circle, CookingPot, ArrowLeft, Utensils,
  Info, Sparkles, Heart, Star, Leaf, MessageCircle, Send, UserRound
} from "lucide-react";

export default function RecipeModal({ food, onClose }) {
  const { t } = useTranslation();
  const [completed, setCompleted] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [resultImage, setResultImage] = useState("");
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    setCompleted([]);
    if (food?.id) setReviews(getRecipeReviews(food.id));
    setReviewText("");
    setResultImage("");
    setReviewError("");
  }, [food]);

  if (!food) return null;

  const ingredients = food.ingredients || [];
  const steps = food.steps || [];

  const toggleStep = (index) => {
    setCompleted((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  };

  const progress = steps.length
    ? (completed.length / steps.length) * 100
    : 0;

  const submitReview = (event) => {
    event.preventDefault();
    if (!user) return;
    if (reviewText.trim().length < 3) {
      setReviewError(t("recipe.reviewValidation"));
      return;
    }
    const next = addRecipeReview({
      id: crypto.randomUUID(), recipeId: food.id, userId: user.id,
      authorName: user.name, text: reviewText.trim(), resultImage: resultImage.trim(),
      createdAt: new Date().toISOString(),
    });
    setReviews(next);
    setReviewText("");
    setResultImage("");
    setReviewError("");
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#faf6ef] px-3 py-4 sm:px-5 sm:py-6"
    >
      <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[24px] bg-[#faf6ef] shadow-2xl">

        <div className="h-1.5 w-full bg-gradient-to-r from-[#d9b48f] via-[#8d5639] to-[#d9b48f]" />

        <div className="flex items-center justify-between px-5 pt-5 sm:px-7">
          <div className="flex items-center gap-2 text-[#a56843]">
            <Sparkles size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[3px]">
              {t("recipe.special")}
            </span>
          </div>

          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eee2d3] text-[#8d5639]"
          >
            <ChefHat size={19} />
          </motion.div>
        </div>

        <div className="grid gap-5 p-5 pb-2 sm:grid-cols-[230px_1fr] sm:gap-6 sm:p-7 sm:pb-3">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative h-[190px] overflow-hidden rounded-[20px] bg-[#eadbc8] sm:h-[225px]"
          >
            <img
              src={food.image}
              alt={food.name}
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
 
            <div className="absolute inset-0 bg-gradient-to-t from-[#24180f]/60 via-transparent to-transparent" />

            <span className="absolute bottom-4 left-4 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
              {categoryLabel(t, food.category)}
            </span>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute right-3 top-3 flex items-center gap-2 rounded-full border border-white/40 bg-white/85 px-3 py-2 shadow-lg backdrop-blur-md"
            >
              <Star size={13} className="fill-[#c18a54] text-[#c18a54]" />
              <span className="text-[10px] font-bold text-[#8d5639]">
                {t("recipe.choice")}
              </span>
            </motion.div>

          
          </motion.div>

          <motion.div
            variants={itemAnimation}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center py-2 sm:pr-8"
          >
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] text-[#a56843]">
              <Sparkles size={15} />
              {t("recipe.about")}
            </p>

            <h2 className="font-display text-3xl font-bold leading-tight text-[#493326] sm:text-4xl">
              {food.name}
            </h2>
            {food.isCommunity && (
              <p className="mt-2 text-xs font-semibold text-[#a56843]">{t("recipe.author", { name: food.authorName })}</p>
            )}

            <p className="mt-4 text-sm leading-7 text-[#786657]">
              {food.description}
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#a56843]">
              <Utensils size={17} />
              <span>{categoryLabel(t, food.category)}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="flex items-center gap-2 rounded-full bg-[#eee2d3] px-3 py-2 text-[11px] font-semibold text-[#8d5639]">
                <Leaf size={13} />
                {t("recipe.homemade")}
              </span>

              <span className="flex items-center gap-2 rounded-full bg-[#eee2d3] px-3 py-2 text-[11px] font-semibold text-[#8d5639]">
                <ChefHat size={13} />
                {t("recipe.easy")}
              </span>
            </div>

            <div className="mt-5 rounded-2xl bg-white p-4">
              <div className="flex items-center gap-2 text-[#a56843]">
                <Info size={18} />
                <span className="text-sm font-bold text-[#493326]">
                  {t("recipe.tip")}
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-[#786657]">
                {t("recipe.tipText")}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="p-5 sm:p-7">

          <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <Clock3 className="mb-3 text-[#a56843]" size={23} />
              <p className="text-xs text-[#9a8674]">{t("recipe.prepTime")}</p>
              <p className="mt-1 font-bold text-[#493326]">
                {timeLabel(t, food.time)}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <ChefHat className="mb-3 text-[#a56843]" size={23} />
              <p className="text-xs text-[#9a8674]">{t("recipe.difficulty")}</p>
              <p className="mt-1 font-bold text-[#493326]">
                {difficultyLabel(t, food.difficulty)}
              </p>
            </div>

            <div className="col-span-2 rounded-2xl bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:col-span-1">
              <Users className="mb-3 text-[#a56843]" size={23} />
              <p className="text-xs text-[#9a8674]">{t("recipe.portion")}</p>
              <p className="mt-1 font-bold text-[#493326]">
                {t("recipe.servings")}
              </p>
            </div>
          </div>

          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">

            <div>
              <div className="mb-6 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eee2d3] text-[#8d5639]">
                    <CookingPot size={22} />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#493326]">
                      {t("recipe.ingredients")}
                    </h3>
                    <p className="text-xs text-[#9a8674]">
                      {t("recipe.ingredientsDesc")}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-[#eee2d3] px-3 py-2 text-xs font-bold text-[#8d5639]">
                  {t("recipe.itemCount", { count: ingredients.length })}
                </span>
              </div>

              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="group flex items-center gap-3 rounded-xl bg-white px-4 py-4 transition duration-300 hover:translate-x-1 hover:shadow-md"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f4ede3] text-[#a56843]">
                      <span className="h-2 w-2 rounded-full bg-[#b5794e]" />
                    </span>

                    <span className="text-sm text-[#65564b]">
                      {ingredient}
                    </span>

                    <CheckCircle2
                      size={16}
                      className="ml-auto text-[#c8b29c] opacity-0 transition group-hover:opacity-100"
                    />
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl border border-dashed border-[#ddcbb8] p-4 text-xs text-[#9a8674]">
                <Sparkles size={15} className="shrink-0 text-[#b5794e]" />
                {t("recipe.prepareAll")}
              </div>
            </div>

            <div>
              <div className="mb-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-[3px] text-[#a56843]">
                  {t("recipe.together")}
                </p>

                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-2xl font-bold text-[#493326]">
                    {t("recipe.steps")}
                  </h3>

                  <CookingPot size={23} className="text-[#b5794e]" />
                </div>

                <p className="mt-2 text-sm text-[#9a8674]">
                  {t("recipe.stepsDesc")}
                </p>
              </div>

              <div className="mb-6 rounded-2xl bg-white p-5">
                <div className="mb-3 flex justify-between text-sm">
                  <span className="font-semibold text-[#493326]">
                    {t("recipe.completed")}
                  </span>

                  <span className="font-bold text-[#a56843]">
                    {completed.length}/{steps.length}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#eee2d3]">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#c99b72] to-[#8d5639]"
                  />
                </div>

                <p className="mt-2 text-right text-[10px] font-semibold text-[#a56843]">
                  {t("recipe.percentDone", { percent: Math.round(progress) })}
                </p>
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => {
                  const isDone = completed.includes(index);

                  return (
                    <motion.button
                      key={index}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleStep(index)}
                      className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition duration-300 ${
                        isDone
                          ? "border-[#b9c9ae] bg-[#edf2e9]"
                          : "border-[#eee3d6] bg-white hover:border-[#c49a76] hover:shadow-md"
                      }`}
                    >
                      <span
                        className={`mt-0.5 shrink-0 ${
                          isDone ? "text-[#62845c]" : "text-[#b5794e]"
                        }`}
                      >
                        {isDone
                          ? <CheckCircle2 size={23} />
                          : <Circle size={23} />
                        }
                      </span>

                      <div className="flex-1">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a56843]">
                            {t("recipe.stepNumber", { number: index + 1 })}
                          </p>

                          <span className={`rounded-full px-2 py-1 text-[9px] font-bold ${
                            isDone
                              ? "bg-[#d9e7d2] text-[#62845c]"
                              : "bg-[#f4ede3] text-[#a56843]"
                          }`}>
                            {isDone ? t("recipe.stepDone") : t("recipe.stepPending")}
                          </span>
                        </div>

                        <p
                          className={`text-sm leading-7 ${
                            isDone
                              ? "text-[#81907a] line-through"
                              : "text-[#65564b]"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {steps.length > 0 &&
                  completed.length === steps.length && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="mt-6 rounded-2xl border border-[#c9d7be] bg-[#e8eee2] p-6 text-center"
                    >
                      <motion.div
                        animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#62845c]"
                      >
                        <ChefHat size={30} />
                      </motion.div>

                      <p className="text-lg font-bold text-[#54724c]">
                        {t("recipe.done")}
                      </p>

                      <p className="mt-1 text-sm text-[#71846a]">
                        {t("recipe.enjoy")}
                      </p>

                      <div className="mt-3 flex justify-center gap-2 text-[#8a9d7b]">
                        <Sparkles size={16} />
                        <Heart size={16} />
                        <Sparkles size={16} />
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          </div>

          <section className="mt-9 border-t border-[#eadfce] pt-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[3px] text-[#a56843]">{t("recipe.communityReviews")}</p>
                <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-[#493326]"><MessageCircle size={21} className="text-[#a56843]" /> {t("recipe.reviewResults")}</h3>
              </div>
              <span className="rounded-full bg-[#eee2d3] px-3 py-1.5 text-xs font-bold text-[#8d5639]">{t("recipe.reviewCount", { count: reviews.length })}</span>
            </div>

            {user ? (
              <form onSubmit={submitReview} className="rounded-2xl border border-[#eadfce] bg-white p-4 sm:p-5">
                <p className="mb-3 text-sm font-bold text-[#493326]">{t("recipe.howWasIt")}</p>
                <textarea value={reviewText} onChange={(event) => setReviewText(event.target.value)} rows={3} placeholder={t("recipe.reviewPlaceholder")} className="w-full resize-y rounded-xl border border-[#e8dccd] bg-[#fffdfa] px-4 py-3 text-sm text-[#493326] outline-none focus:border-[#a56843]" />
                <input value={resultImage} onChange={(event) => setResultImage(event.target.value)} type="url" placeholder={t("recipe.resultImagePlaceholder")} className="mt-3 w-full rounded-xl border border-[#e8dccd] bg-[#fffdfa] px-4 py-3 text-xs text-[#493326] outline-none focus:border-[#a56843]" />
                {reviewError && <p className="mt-2 text-xs text-red-600">{reviewError}</p>}
                <button type="submit" className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#8d5639] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#70432e]"><Send size={14}/> {t("recipe.sendReview")}</button>
              </form>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#ddcbb8] bg-white/70 p-5 text-center">
                <p className="text-sm text-[#786657]">{t("recipe.loginToReview")}</p>
                <button type="button" onClick={() => navigate("/signin")} className="mt-3 rounded-full bg-[#8d5639] px-6 py-2.5 text-xs font-bold text-white">{t("recipe.signIn")}</button>
              </div>
            )}

            <div className="mt-4 space-y-3">
              {reviews.length ? reviews.map((review) => (
                <article key={review.id} className="rounded-2xl border border-[#eee3d6] bg-white p-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eee2d3] text-[#8d5639]"><UserRound size={15}/></span>
                    <div><p className="text-xs font-bold text-[#493326]">{review.authorName}</p><p className="text-[10px] text-[#a18b78]">{new Date(review.createdAt).toLocaleDateString()}</p></div>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#65564b]">{review.text}</p>
                  {review.resultImage && <img src={review.resultImage} alt={t("recipe.userDishAlt")} loading="lazy" className="mt-3 max-h-56 rounded-xl object-cover" />}
                </article>
              )) : <p className="py-4 text-center text-xs text-[#a18b78]">{t("recipe.noReviews")}</p>}
            </div>
          </section>

          <button
            onClick={onClose}
            className="mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-[#8d5639] py-4 font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#70432e] hover:shadow-lg hover:shadow-[#8d5639]/20"
          >
            <ArrowLeft size={18} />
            {t("recipe.back")}
          </button>

          <div className="mt-7 flex items-center justify-center gap-2 text-[#b39a81]">
            <span className="h-px w-10 bg-[#e4d6c5]" />
            <Sparkles size={13} />
            <span className="text-[9px] font-bold uppercase tracking-[3px]">
              {t("recipe.made")}
            </span>
            <Sparkles size={13} />
            <span className="h-px w-10 bg-[#e4d6c5]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}



