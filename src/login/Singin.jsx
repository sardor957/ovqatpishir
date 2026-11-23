import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ChefHat, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

const copy = {
  uz: {
    signIn: "Hisobga kirish", signUp: "Ro‘yxatdan o‘tish", name: "Ismingiz", email: "Gmail yoki email",
    password: "Parol", confirm: "Parolni tasdiqlang", enter: "Kirish", create: "Akkaunt yaratish",
    noAccount: "Akkauntingiz yo‘qmi?", hasAccount: "Akkauntingiz bormi?", switchUp: "Ro‘yxatdan o‘ting",
    switchIn: "Kirish", back: "Bosh sahifaga qaytish", welcome: "Oshxona hamjamiyatiga xush kelibsiz",
    subtitle: "Sevimli retseptlaringizni bir joyda saqlang va oshxona olamiga qo‘shiling.", mismatch: "Parollar bir-biriga mos kelmadi.",
  },
  ru: {
    signIn: "Войти в аккаунт", signUp: "Регистрация", name: "Ваше имя", email: "Gmail или email",
    password: "Пароль", confirm: "Подтвердите пароль", enter: "Войти", create: "Создать аккаунт",
    noAccount: "Нет аккаунта?", hasAccount: "Уже есть аккаунт?", switchUp: "Зарегистрироваться",
    switchIn: "Войти", back: "Вернуться на главную", welcome: "Добро пожаловать в сообщество Кухни",
    subtitle: "Сохраняйте любимые рецепты и присоединяйтесь к нашему кулинарному миру.", mismatch: "Пароли не совпадают.",
  },
  en: {
    signIn: "Sign in", signUp: "Create an account", name: "Your name", email: "Gmail or email",
    password: "Password", confirm: "Confirm password", enter: "Sign in", create: "Create account",
    noAccount: "Don't have an account?", hasAccount: "Already have an account?", switchUp: "Sign up",
    switchIn: "Sign in", back: "Back to home", welcome: "Welcome to the Oshxona community",
    subtitle: "Keep your favorite recipes together and join our cooking community.", mismatch: "Passwords do not match.",
  },
};

export default function Singin() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const isSignUp = location.pathname === "/signup";
  const language = (localStorage.getItem("language") || "uz").slice(0, 2);
  const t = copy[language] || copy.uz;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    setError("");
    setPassword("");
    setConfirmPassword("");
  }, [isSignUp]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (isSignUp && password !== confirmPassword) {
      setError(t.mismatch);
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) await signUp({ name, email, password });
      else await signIn({ email, password });
      navigate("/", { replace: true });
    } catch (submitError) {
      setError(submitError.message || "Xatolik yuz berdi. Qayta urinib ko‘ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf6ef] px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#8d5639] transition hover:text-[#70432e]">
          <ArrowLeft size={17} /> {t.back}
        </Link>

        <section className="rounded-[28px] border border-[#eadfce] bg-white p-6 shadow-xl shadow-[#72543b]/10 sm:p-9">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8d5639] text-white shadow-lg shadow-[#8d5639]/20">
              <ChefHat size={30} />
            </div>
            <h1 className="font-display text-3xl font-bold text-[#593a29]">
              {isSignUp ? t.signUp : t.signIn}
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#978574]">{t.welcome}</p>
            <p className="mt-1 text-xs leading-5 text-[#a18b78]">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#684c3a]">{t.name}</span>
                <input value={name} onChange={(event) => setName(event.target.value)} required minLength={2} autoComplete="name"
                  className="w-full rounded-xl border border-[#e8dccd] bg-[#fffdfa] px-4 py-3 text-sm text-[#493326] outline-none transition focus:border-[#a56843] focus:ring-2 focus:ring-[#a56843]/10" />
              </label>
            )}

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#684c3a]">{t.email}</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email"
                className="w-full rounded-xl border border-[#e8dccd] bg-[#fffdfa] px-4 py-3 text-sm text-[#493326] outline-none transition focus:border-[#a56843] focus:ring-2 focus:ring-[#a56843]/10" />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#684c3a]">{t.password}</span>
              <span className="relative block">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  className="w-full rounded-xl border border-[#e8dccd] bg-[#fffdfa] px-4 py-3 pr-12 text-sm text-[#493326] outline-none transition focus:border-[#a56843] focus:ring-2 focus:ring-[#a56843]/10" />
                <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a18b78] hover:text-[#8d5639]">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>

            {isSignUp && (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#684c3a]">{t.confirm}</span>
                <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required minLength={8} autoComplete="new-password"
                  className="w-full rounded-xl border border-[#e8dccd] bg-[#fffdfa] px-4 py-3 text-sm text-[#493326] outline-none transition focus:border-[#a56843] focus:ring-2 focus:ring-[#a56843]/10" />
              </label>
            )}

            {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full rounded-full bg-[#8d5639] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-[#8d5639]/15 transition hover:-translate-y-0.5 hover:bg-[#70432e] disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "..." : isSignUp ? t.create : t.enter}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#897666]">
            {isSignUp ? t.hasAccount : t.noAccount}{" "}
            <Link to={isSignUp ? "/signin" : "/signup"} className="font-bold text-[#a15f3d] hover:underline">
              {isSignUp ? t.switchIn : t.switchUp}
            </Link>
          </p>
         
        </section>
      </div>
    </main>
  );
}
