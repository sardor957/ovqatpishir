import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  X,
  Plus,
  ChefHat,
  ImagePlus,
  Clock3,
  ListChecks,
  CookingPot,
  Sparkles,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { addCommunityRecipe } from "../lib/communityStore";

const categories = [
  "Suyuq ovqatlar",
  "Quyuq ovqatlar",
  "Pishiriqlar",
  "Shirinliklar",
  "Xamirli ovqatlar",
  "Salatlar",
  "Milliy taomlar",
  "Nonushtalar",
];

const fieldClass =
  "w-full rounded-xl border border-[#e8dccd] bg-white px-4 py-3 text-sm text-[#493326] outline-none transition-all duration-200 placeholder:text-[#b6a493] hover:border-[#c9a68b] focus:border-[#a56843] focus:ring-4 focus:ring-[#a56843]/10";

const labelClass =
  "mb-2 block text-xs font-bold tracking-wide text-[#79583f]";

const selectClass =
  "w-full appearance-none cursor-pointer rounded-xl border border-[#e8dccd] bg-white px-4 py-3 pr-10 text-sm font-semibold text-[#493326] outline-none transition-all duration-200 hover:border-[#c9a68b] focus:border-[#a56843] focus:ring-4 focus:ring-[#a56843]/10";

export default function AddRecipeModal({ onClose, onCreated }) {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    category: "Milliy taomlar",
    time: "45",
    difficulty: "O‘rtacha",
    ingredients: "",
    steps: "",
  });

  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (error) setError("");
  };

  const submit = (event) => {
    event.preventDefault();

    if (!user) return;

    const ingredients = form.ingredients
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const steps = form.steps
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.image.trim() ||
      !ingredients.length ||
      !steps.length
    ) {
      setError(
        t("addRecipe.validation")
      );
      return;
    }

    const recipe = {
      id: `community-${crypto.randomUUID()}`,
      name: form.name.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      category: form.category,
      time: `${form.time} daqiqa`,
      difficulty: form.difficulty,
      ingredients,
      steps,
      authorId: user.id,
      authorName: user.name,
      createdAt: new Date().toISOString(),
      isCommunity: true,
    };

    addCommunityRecipe(recipe);
    onCreated?.(recipe);
    onClose();
  };

  if (!user) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#24180f]/60 p-4 backdrop-blur-sm"
        onMouseDown={onClose}
      >
        <div
          className="w-full max-w-sm rounded-[28px] border border-[#eadfce] bg-[#faf6ef] p-8 text-center shadow-2xl"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eee2d3] text-[#a56843]">
            <ChefHat size={34} />
          </div>

          <h2 className="font-display text-2xl font-bold text-[#493326]">
            {t("addRecipe.title")}
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#897666]">
            {t("addRecipe.loginDescription")}
          </p>

          <button
            onClick={() => navigate("/signin")}
            className="mt-6 w-full rounded-full bg-gradient-to-r from-[#9b6242] to-[#78472f] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#8d5639]/20 transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
          >
            {t("addRecipe.signIn")}
          </button>

          <button
            onClick={onClose}
            className="mt-3 w-full rounded-full border border-[#ddcbb8] bg-white/60 px-6 py-3 text-sm font-bold text-[#805037] transition hover:bg-white"
          >
            {t("addRecipe.close")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#24180f]/60 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={onClose}
    >
      <div
        className="flex max-h-[88vh] w-full max-w-xl flex-col overflow-hidden rounded-[26px] border border-[#eadfce] bg-[#faf6ef] shadow-[0_25px_80px_rgba(50,30,15,0.25)] sm:rounded-[30px]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="relative shrink-0 overflow-hidden border-b border-[#eadfce] bg-gradient-to-br from-[#f8efe3] to-[#f3e7d7] px-5 py-5 sm:px-7">
          <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-[#c99c78]/10" />
          <div className="absolute -bottom-12 right-24 h-28 w-28 rounded-full bg-[#c99c78]/10" />

          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a66b49] to-[#70432e] text-white shadow-lg shadow-[#805037]/20">
                <ChefHat size={25} />
              </div>

              <div>
                <div className="mb-1 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-[#a56843]" />
                  <p className="text-[9px] font-extrabold uppercase tracking-[2.5px] text-[#a56843]">
                    {t("addRecipe.community")}
                  </p>
                </div>

                <h2 className="font-display text-xl font-bold text-[#493326] sm:text-2xl">
                  {t("addRecipe.title")}
                </h2>

                <p className="mt-1 text-[11px] text-[#9b806a]">
                  {t("addRecipe.subtitle")}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ddcbb8] bg-white/70 text-[#805037] transition hover:rotate-90 hover:bg-white"
              aria-label={t("addRecipe.close")}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6"
        >
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eee2d3] text-[#a56843]">
                <ChefHat size={15} />
              </div>
              <h3 className="text-sm font-extrabold text-[#593a29]">
                {t("addRecipe.mainInfo")}
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>{t("addRecipe.foodName")}</label>
                <input
                  className={fieldClass}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder={t("addRecipe.foodNamePlaceholder")}
                  maxLength={80}
                />
              </div>

              <div>
                <label className={labelClass}>{t("addRecipe.description")}</label>
                <textarea
                  className={`${fieldClass} resize-none`}
                  rows="2"
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder={t("addRecipe.descriptionPlaceholder")}
                  maxLength={300}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <ImagePlus size={15} />
                    {t("addRecipe.imageUrl")}
                  </span>
                </label>

                <input
                  className={fieldClass}
                  type="url"
                  value={form.image}
                  onChange={(e) => update("image", e.target.value)}
                  placeholder={t("addRecipe.imagePlaceholder")}
                />

                {form.image.trim() && (
                  <div className="mt-3 overflow-hidden rounded-2xl border border-[#e8dccd] bg-white p-2">
                    <img
                      src={form.image}
                      alt="Ovqat rasmi"
                      className="h-36 w-full rounded-xl object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      onLoad={(e) => {
                        e.currentTarget.style.display = "block";
                      }}
                    />
                    <p className="px-1 pt-2 text-[10px] font-semibold text-[#a18b78]">
                      {t("addRecipe.imagePreview")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#eadfce] bg-white/55 p-4">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eee2d3] text-[#a56843]">
                <CookingPot size={15} />
              </div>
              <h3 className="text-sm font-extrabold text-[#593a29]">
                {t("addRecipe.features")}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="relative">
                <label className={labelClass}>{t("addRecipe.category")}</label>
                <select
                  className={selectClass}
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                >
                  {categories.map((category, index) => (
                    <option key={category} value={category}>{t(`addRecipe.categoryLabels.${index}`)}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute bottom-[13px] right-4 text-[#a56843]">
                  <ChevronDown size={17} />
                </span>
              </div>

              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-1">
                    <Clock3 size={13} />
                    {t("addRecipe.time")}
                  </span>
                </label>
                <input
                  className={fieldClass}
                  type="number"
                  min="1"
                  max="1440"
                  value={form.time}
                  onChange={(e) => update("time", e.target.value)}
                />
              </div>

              <div className="relative">
                <label className={labelClass}>{t("addRecipe.difficulty")}</label>
                <select
                  className={selectClass}
                  value={form.difficulty}
                  onChange={(e) => update("difficulty", e.target.value)}
                >
                  <option value="Oson">{t("addRecipe.easy")}</option>
                  <option value="O‘rtacha">{t("addRecipe.medium")}</option>
                  <option value="Qiyin">{t("addRecipe.hard")}</option>
                </select>
                <span className="pointer-events-none absolute bottom-[13px] right-4 text-[#a56843]">
                  <ChevronDown size={17} />
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eee2d3] text-[#a56843]">
                <ListChecks size={15} />
              </div>
              <h3 className="text-sm font-extrabold text-[#593a29]">
                {t("addRecipe.ingredients")}
              </h3>
            </div>

            <label className={labelClass}>
              {t("addRecipe.ingredientHint")}
            </label>

            <textarea
              className={`${fieldClass} resize-none`}
              rows="4"
              value={form.ingredients}
              onChange={(e) => update("ingredients", e.target.value)}
              placeholder={
                t("addRecipe.ingredientPlaceholder")
              }
            />
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eee2d3] text-[#a56843]">
                <ChefHat size={15} />
              </div>
              <h3 className="text-sm font-extrabold text-[#593a29]">
                {t("addRecipe.steps")}
              </h3>
            </div>

            <label className={labelClass}>
              {t("addRecipe.stepHint")}
            </label>

            <textarea
              className={`${fieldClass} resize-none`}
              rows="5"
              value={form.steps}
              onChange={(e) => update("steps", e.target.value)}
              placeholder={
                t("addRecipe.stepPlaceholder")
              }
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-700">
              <X size={16} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <div className="flex items-center gap-3 rounded-2xl border border-[#eadfce] bg-[#f3e9dc]/70 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#a66b49] to-[#70432e] text-sm font-extrabold uppercase text-white">
              {user.name?.charAt(0) || "U"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#a56843]">
                {t("addRecipe.author")}
              </p>
              <p className="truncate text-sm font-extrabold text-[#593a29]">
                {user.name}
              </p>
            </div>

            <CheckCircle2 size={19} className="shrink-0 text-[#a56843]" />
          </div>

          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9b6242] to-[#78472f] py-4 text-sm font-extrabold text-white shadow-lg shadow-[#8d5639]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
          >
            <Plus
              size={19}
              className="transition-transform group-hover:rotate-90"
            />
            {t("addRecipe.save")}
          </button>

          <p className="pb-1 text-center text-[10px] text-[#a18b78]">
            <Sparkles size={11} className="mr-1 inline" />
            {t("addRecipe.communityNote")}
          </p>
        </form>
      </div>
    </div>
  );
}