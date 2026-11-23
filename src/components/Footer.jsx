
import { useTranslation } from "react-i18next";

import { ArrowUpRight, ChefHat, Heart } from "lucide-react";
import { Link } from "react-router-dom";

function InstagramLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FacebookLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.6v8h3.4Z" />
    </svg>
  );
}

function TelegramLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M21.9 4.2 18.7 20c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.2L6.1 13.6l-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.5 3.1c.9-.3 1.7.2 1.4 1.1Z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();
  const brandName = t("brand.name");

  return (
    <footer className="bg-[#24180f] px-5 pt-20 text-[#faf6ef] lg:px-12">
      <div className="mx-auto max-w-[1440px]">

        <div className="grid gap-14 border-b border-white/10 pb-16 md:grid-cols-2 lg:grid-cols-4">

          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a56843]">
                <ChefHat size={27} />
              </div>

              <span className="font-display text-3xl font-bold">
                {brandName}
                <span className="text-[#d3a47e]">.</span>
              </span>
            </Link>

            <p className="mt-7 max-w-md text-sm leading-8 text-[#bca995]">
              {t("footer.description")}
            </p>

            <div className="mt-8 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#E1306C] hover:bg-[#E1306C]"
              >
                <InstagramLogo />
              </a>

              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#229ED9] hover:bg-[#229ED9]"
              >
                <TelegramLogo />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#1877F2] hover:bg-[#1877F2]"
              >
                <FacebookLogo />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-7 font-display text-xl font-bold">
              {t("footer.pages")}
            </h3>

            <ul className="space-y-4 text-sm text-[#bca995]">
              <li>
                <Link to="/" className="transition hover:text-[#d3a47e]">
                  {t("nav.home")}
                </Link>
              </li>

              <li>
                <Link to="/catalog" className="transition hover:text-[#d3a47e]">
                  {t("footer.categories")}
                </Link>
              </li>

              <li>
                <Link to="/foods" className="transition hover:text-[#d3a47e]">
                  {t("nav.foods")}
                </Link>
              </li>

              <li>
                <Link to="/cooking" className="transition hover:text-[#d3a47e]">
                  {t("nav.cooking")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-7 font-display text-xl font-bold">
              {t("footer.about")}
            </h3>

            <p className="text-sm leading-7 text-[#bca995]">
              {t("footer.newsletter")}
            </p>

            <Link
              to="/foods"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#d3a47e] transition hover:gap-4"
            >
              {t("footer.recipes")}
              <ArrowUpRight size={17} />
            </Link>
          </div>

        </div>

        <div className="flex flex-col items-center justify-between gap-5 py-7 text-center sm:flex-row">
          <p className="text-xs text-[#9d8976]">
            {t("footer.rights", {
              year: currentYear,
              brand: brandName,
            })}
          </p>

          <p className="flex items-center gap-2 text-xs text-[#9d8976]">
            {t("footer.made")}
            <Heart
              size={14}
              className="fill-[#a56843] text-[#a56843]"
            />
          </p>
        </div>

      </div>
    </footer>
  );
}
