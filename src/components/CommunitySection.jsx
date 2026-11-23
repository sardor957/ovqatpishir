import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import {
  Users,
  MessageCircle,
  Heart,
  Star,
  Send,
  ChefHat,
  Sparkles,
} from "lucide-react";

export default function CommunitySection() {
  const { t } = useTranslation();
  const [comments, setComments] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("oshxona-comments")) || [];
    } catch {
      return [];
    }
  });

  const [hasCommented, setHasCommented] = useState(
    () => localStorage.getItem("oshxona-user-commented") === "true"
  );

  const [liked, setLiked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("oshxona-liked")) || [];
    } catch {
      return [];
    }
  });

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const saveComments = (data) => {
    setComments(data);
    localStorage.setItem("oshxona-comments", JSON.stringify(data));
  };

  const addComment = (e) => {
    e.preventDefault();

    if (hasCommented || !name.trim() || !message.trim()) return;

    const newComment = {
      id: Date.now(),
      name: name.trim(),
      text: message.trim(),
      rating,
      likes: 0,
    };

    saveComments([newComment, ...comments]);

    localStorage.setItem("oshxona-user-commented", "true");
    setHasCommented(true);

    setName("");
    setMessage("");
    setRating(5);
  };

  const toggleLike = (id) => {
    if (liked.includes(id)) return;

    const updated = comments.map((comment) =>
      comment.id === id
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    );

    const newLiked = [...liked, id];

    setLiked(newLiked);
    localStorage.setItem("oshxona-liked", JSON.stringify(newLiked));

    saveComments(updated);
  };

  const stats = [
    {
      icon: Users,
      value: 0,
      label: t("community.visitors"),
    },
    {
      icon: MessageCircle,
      value: comments.length,
      label: t("community.comments"),
    },
    {
      icon: Heart,
      value: comments.reduce((sum, c) => sum + c.likes, 0),
      label: t("community.likes"),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#faf6ef] px-4 py-14 sm:px-6 sm:py-20 lg:px-12 lg:py-28">

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#e9d5bd]/30 blur-3xl sm:h-80 sm:w-80" />

      <div className="relative mx-auto max-w-[1440px]">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e6d4bf] bg-white/70 px-4 py-2">
            <Sparkles size={15} className="text-[#b5794e]" />
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#956849] sm:text-[11px]">
              {t("community.title")}
            </span>
          </div>

          <h2 className="font-display text-3xl font-bold leading-tight text-[#493326] sm:text-5xl">
            {t("community.headingTop")}
            <span className="mt-1 block italic text-[#a56843]">
              {t("community.headingAccent")}
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#897666] sm:mt-5 sm:text-base">
            {t("community.description")}
          </p>
        </motion.div>

        <div className="mb-10 grid grid-cols-2 gap-3 sm:mb-14 sm:grid-cols-3 sm:gap-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className={`rounded-2xl border border-[#eadfce] bg-white/70 p-4 text-center shadow-sm sm:rounded-3xl sm:p-7 ${
                index === 2 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#eee2d3] text-[#8d5639] sm:h-12 sm:w-12 sm:rounded-2xl">
                <item.icon size={21} />
              </div>

              <p className="break-words text-lg font-bold text-[#493326] sm:text-2xl">
                {item.value}
              </p>

              <p className="mt-1 text-[10px] text-[#9a8674] sm:text-xs">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 items-start gap-7 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr]">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="min-w-0 rounded-[28px] border border-[#eadfce] bg-white/75 p-5 shadow-xl shadow-[#72543b]/5 sm:rounded-[32px] sm:p-9"
          >
            <div className="mb-6 flex items-center gap-3 sm:mb-7">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#8d5639] text-white sm:h-12 sm:w-12">
                <ChefHat size={23} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#493326] sm:text-xl">
                  {t("community.leave")}
                </h3>
                <p className="text-xs text-[#9a8674]">
                  {t("community.placeholderTitle")}
                </p>
              </div>
            </div>

            {hasCommented ? (
              <div className="rounded-2xl border border-[#eadfce] bg-[#faf6ef] p-6 text-center">
                <Heart className="mx-auto mb-3 text-[#a56843]" size={30} />
                <h4 className="font-bold text-[#493326]">
                  {t("community.thanks")}
                </h4>
                <p className="mt-2 text-sm leading-6 text-[#897666]">
                  {t("community.already")} {t("community.once")}
                </p>
              </div>
            ) : (
              <form onSubmit={addComment} className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-bold text-[#684c3a]">
                    {t("community.name")}
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("community.namePlaceholder")}
                    maxLength={40}
                    required
                    className="w-full min-w-0 rounded-2xl border border-[#eadfce] bg-[#faf6ef] px-4 py-4 text-sm text-[#493326] outline-none transition focus:border-[#a56843] sm:px-5"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-[#684c3a]">
                    {t("community.message")}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("community.messagePlaceholder")}
                    rows={4}
                    maxLength={500}
                    required
                    className="w-full min-w-0 resize-none rounded-2xl border border-[#eadfce] bg-[#faf6ef] px-4 py-4 text-sm text-[#493326] outline-none transition focus:border-[#a56843] sm:px-5"
                  />
                  <p className="mt-1 text-right text-[10px] text-[#a28d7a]">
                    {message.length}/500
                  </p>
                </div>

                <div>
                  <label className="mb-3 block text-xs font-bold text-[#684c3a]">
                    {t("community.rating")}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        aria-label={t("community.starLabel", { count: star })}
                        className="transition hover:scale-110"
                      >
                        <Star
                          size={25}
                          fill={star <= rating ? "#d99a43" : "transparent"}
                          className={
                            star <= rating
                              ? "text-[#d99a43]"
                              : "text-[#d9cabb]"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#8d5639] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#8d5639]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#70432e]"
                >
                  {t("community.send")}
                  <Send
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </form>
            )}
          </motion.div>

          <div className="min-w-0">
            <div className="mb-6 flex items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-[#493326] sm:text-xl">
                  {t("community.reviews")}
                </h3>
                <p className="mt-1 text-[11px] text-[#9a8674] sm:text-xs">
                  {t("community.reviewsSubtitle")}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-[#eee2d3] px-3 py-2 text-xs font-bold text-[#8d5639] sm:px-4">
                {t("community.reviewCount", { count: comments.length })}
              </span>
            </div>

            <div className="space-y-4">
              {comments.length === 0 ? (
                <div className="rounded-3xl border border-[#eadfce] bg-white/70 px-5 py-10 text-center sm:px-10">
                  <MessageCircle
                    size={35}
                    className="mx-auto mb-4 text-[#b99a7c]"
                  />
                  <h4 className="font-bold text-[#493326]">
                    {t("community.empty")}
                  </h4>
                  <p className="mt-2 text-sm leading-7 text-[#9a8674]">
                    {t("community.first")} {t("community.important")}
                  </p>
                </div>
              ) : (
                comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="min-w-0 overflow-hidden rounded-3xl border border-[#eadfce] bg-white/75 p-5 shadow-sm sm:p-7"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eee2d3] font-display text-lg font-bold text-[#8d5639] sm:h-12 sm:w-12">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <h4 className="break-words text-sm font-bold text-[#493326]">
                          {comment.name}
                        </h4>
                        <div className="mt-1 flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={12}
                              fill={star <= comment.rating ? "#d99a43" : "transparent"}
                              className="text-[#d99a43]"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="mt-5 break-words text-sm leading-7 text-[#897666]">
                      {comment.text}
                    </p>

                    <div className="mt-5 flex justify-end border-t border-[#eee4d8] pt-4">
                      <button
                        onClick={() => toggleLike(comment.id)}
                        disabled={liked.includes(comment.id)}
                        className={`flex min-h-9 items-center gap-2 text-xs font-bold transition ${
                          liked.includes(comment.id)
                            ? "cursor-default text-[#c65c52]"
                            : "text-[#9a8674] hover:text-[#c65c52]"
                        }`}
                      >
                        <Heart
                          size={17}
                          fill={liked.includes(comment.id) ? "currentColor" : "none"}
                        />
                        {comment.likes}
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-[28px] bg-[#8d5639] px-5 py-8 text-center text-white sm:mt-14 sm:rounded-[32px] sm:px-12 sm:py-10"
        >
          <Sparkles className="mx-auto mb-4 text-[#f0c99e]" size={27} />
          <h3 className="font-display text-xl font-bold leading-snug sm:text-3xl">
            {t("community.slogan")}
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-7 text-white/75 sm:text-sm">
            {t("community.closing")}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
