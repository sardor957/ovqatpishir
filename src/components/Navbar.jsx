
import { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChefHat, ArrowRight, Globe, ChevronDown, Check } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.catalog", href: "/catalog" },
  { key: "nav.foods", href: "/foods" },
  { key: "nav.cooking", href: "/cooking" },
];

const languages = [
  { code: "uz", short: "UZ", label: "O'zbekcha" },
  { code: "ru", short: "RU", label: "Русский" },
  { code: "en", short: "EN", label: "English" },
];

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const currentCode = i18n.resolvedLanguage || i18n.language;
  const current =
    languages.find((lang) => lang.code === currentCode) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selectLanguage = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={t("nav.language")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 items-center gap-1.5 rounded-full border border-[#eadfce] bg-white/70 px-3 text-xs font-bold text-[#684c3a] transition duration-300 hover:border-[#a15f3d] hover:bg-white"
      >
        <Globe size={16} className="text-[#a15f3d]" />
        {current.short}
        <ChevronDown
          size={14}
          className={`text-[#a27a5e] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full z-50 mt-3 w-44 overflow-hidden rounded-2xl border border-[#eadfce] bg-[#faf6ef] p-1.5 shadow-xl shadow-[#72543b]/10"
          >
            {languages.map((lang) => {
              const isActive = lang.code === current.code;

              return (
                <li key={lang.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => selectLanguage(lang.code)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition duration-200 ${
                      isActive
                        ? "bg-[#8d5639] text-white"
                        : "text-[#65564b] hover:bg-[#f4ede3] hover:text-[#a15f3d]"
                    }`}
                  >
                    <span
                      className={`w-6 text-xs font-bold ${
                        isActive ? "text-white/80" : "text-[#a27a5e]"
                      }`}
                    >
                      {lang.short}
                    </span>

                    <span className="flex-1">{lang.label}</span>

                    {isActive && <Check size={15} />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const authLabels = {
    uz: { signIn: "Kirish", signUp: "Ro‘yxatdan o‘tish", logout: "Chiqish" },
    ru: { signIn: "Войти", signUp: "Регистрация", logout: "Выйти" },
    en: { signIn: "Sign in", signUp: "Sign up", logout: "Sign out" },
  };

  const authText =
    authLabels[(i18n.resolvedLanguage || i18n.language || "uz").slice(0, 2)] ||
    authLabels.uz;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-[#eadfce] bg-[#faf6ef]/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-4 sm:px-5 lg:px-8 xl:px-12">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8d5639] text-white shadow-lg shadow-[#8d5639]/20">
            <ChefHat size={25} strokeWidth={1.8} />
          </div>

          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-[#593a29]">
              {t("intro.kitchen")}
            </h1>
            <p className="hidden text-[9px] font-semibold uppercase tracking-[3px] text-[#a27a5e] lg:block">
              {t("intro.tagline")}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 sm:flex md:gap-5 lg:gap-7 xl:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`relative whitespace-nowrap py-2 text-[12px] font-semibold transition-colors duration-300 hover:text-[#a15f3d] md:text-[13px] ${
                location.pathname === link.href
                  ? "text-[#a15f3d]"
                  : "text-[#65564b]"
              }`}
            >
              {t(link.key)}
              {location.pathname === link.href && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#a15f3d]" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <LanguageSwitcher />

          <div className="hidden items-center gap-2 sm:flex md:hidden">
            {user ? (
              <>
                <Link to="/profile" title="Profil sozlamalari" className="flex items-center gap-2 rounded-full border border-[#eadfce] bg-white/80 py-1 pl-1 pr-3 shadow-sm hover:border-[#c69a78]">
                  {user.avatar ? <img src={user.avatar} alt="" className="h-8 w-8 rounded-full object-cover" /> : <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#a66b49] to-[#70432e] text-xs font-extrabold uppercase text-white">{user.name?.charAt(0) || "U"}</span>}
                  <span className="max-w-20 truncate text-xs font-bold text-[#593a29]">{user.name}</span>
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="whitespace-nowrap rounded-full border border-[#d9c4ae] bg-white/70 px-3 py-2 text-xs font-bold text-[#805037] shadow-sm transition duration-300 hover:border-[#a15f3d] hover:bg-[#f4ede3]"
                >
                  {authText.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="whitespace-nowrap rounded-full border border-[#d9c4ae] bg-white/70 px-3 py-2 text-xs font-bold text-[#805037] shadow-sm transition duration-300 hover:border-[#a15f3d] hover:bg-white"
                >
                  {authText.signIn}
                </Link>
                <Link
                  to="/signup"
                  className="whitespace-nowrap rounded-full bg-gradient-to-r from-[#9b6242] to-[#78472f] px-3 py-2 text-xs font-bold text-white shadow-sm shadow-[#8d5639]/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {authText.signUp}
                </Link>
              </>
            )}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <Link
                  to="/profile"
                  title="Profil sozlamalari"
                  className="flex min-w-0 items-center gap-2 rounded-full border border-[#eadfce] bg-white/80 py-1.5 pl-1.5 pr-3 shadow-sm transition-all duration-300 hover:border-[#c69a78] hover:shadow-md"
                >
                  {user.avatar ? <img src={user.avatar} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" /> : <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#a66b49] to-[#70432e] text-sm font-extrabold uppercase text-white shadow-sm">{user.name?.charAt(0) || "U"}</div>}
                  <div className="flex min-w-0 flex-col">
                    <span className="max-w-24 truncate text-xs font-extrabold tracking-wide text-[#593a29] lg:max-w-32">
                      {user.name}
                    </span>
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-[#a27a5e]">
                      {t("nav.userRole")}
                    </span>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="rounded-full border border-[#eadfce] px-3 py-2 text-xs font-bold text-[#8d5639] transition hover:bg-[#f4ede3]"
                >
                  {authText.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="whitespace-nowrap rounded-full border border-[#d9c4ae] bg-white/70 px-4 py-2.5 text-xs font-bold text-[#805037] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#a15f3d] hover:bg-white hover:shadow-md"
                >
                  {authText.signIn}
                </Link>
                <Link
                  to="/signup"
                  className="whitespace-nowrap rounded-full bg-gradient-to-r from-[#9b6242] to-[#78472f] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#8d5639]/20 transition duration-300 hover:-translate-y-0.5 hover:from-[#a96d4b] hover:to-[#70432e] hover:shadow-lg"
                >
                  {authText.signUp}
                </Link>
              </>
            )}
          </div>

          <Link
            to="/catalog"
            className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-[#8d5639] px-5 py-3 text-xs font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#70432e] xl:flex"
          >
            {t("nav.findRecipe")}
            <ArrowRight size={15} />
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t("nav.openMenu")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eadfce] text-[#684c3a] sm:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 border-t border-[#eadfce]/70 bg-[#faf6ef]/95 px-4 py-2.5 sm:hidden">
        {user ? (
          <>
            <Link
              to="/profile"
              title="Profil sozlamalari"
              className="flex min-w-0 max-w-[55vw] items-center gap-2 rounded-full border border-[#eadfce] bg-white/80 py-1 pl-1 pr-2.5 shadow-sm"
            >
              {user.avatar ? <img src={user.avatar} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover" /> : <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#a66b49] to-[#70432e] text-xs font-extrabold uppercase text-white shadow-sm">{user.name?.charAt(0) || "U"}</div>}
              <div className="flex min-w-0 flex-col text-left">
                <span className="max-w-[30vw] truncate text-[11px] font-extrabold text-[#593a29]">
                  {user.name}
                </span>
                <span className="text-[8px] font-semibold uppercase tracking-wider text-[#a27a5e]">
                  {t("nav.userRole")}
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="rounded-full border border-[#d9c4ae] bg-white/80 px-4 py-2 text-xs font-bold text-[#805037] shadow-sm transition duration-300 active:scale-95"
            >
              {authText.logout}
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signin"
              className="min-w-[108px] rounded-full border border-[#cdb49e] bg-white/80 px-4 py-2.5 text-center text-xs font-bold text-[#805037] shadow-sm transition duration-300 hover:border-[#a15f3d] hover:bg-white active:scale-95"
            >
              {authText.signIn}
            </Link>
            <Link
              to="/signup"
              className="min-w-[132px] rounded-full bg-gradient-to-r from-[#9b6242] to-[#78472f] px-4 py-2.5 text-center text-xs font-bold text-white shadow-md shadow-[#8d5639]/20 transition duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              {authText.signUp}
            </Link>
          </>
        )}
      </div>

      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden border-t border-[#eadfce] bg-[#faf6ef] px-6 py-5 sm:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-[#eadfce] pb-3 text-sm font-semibold text-[#65564b] transition hover:text-[#a15f3d]"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
