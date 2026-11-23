import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft, Camera, Check, ChefHat, LockKeyhole, Save, UserRound } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  const { user, updateProfile, changePassword } = useAuth();
  const { t } = useTranslation();
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef(null);

  if (!user) return <Navigate to="/signin" replace />;

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError(t("profile.photoOnly")); return; }
    if (file.size > 1.5 * 1024 * 1024) { setError(t("profile.photoSize")); return; }
    const reader = new FileReader();
    reader.onload = () => { setAvatar(String(reader.result)); setError(""); setProfileMessage(""); };
    reader.readAsDataURL(file);
  };

  const saveProfile = (event) => {
    event.preventDefault();
    setSaving(true); setError(""); setProfileMessage("");
    try {
      updateProfile({ name, avatar });
      setProfileMessage(t("profile.saved"));
    } catch (err) { setError(err.message || t("profile.saveError")); }
    finally { setSaving(false); }
  };

  const savePassword = async (event) => {
    event.preventDefault(); setPasswordError(""); setPasswordMessage("");
    if (newPassword !== confirmPassword) { setPasswordError(t("profile.passwordMismatch")); return; }
    try {
      await changePassword({ currentPassword, newPassword });
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      setPasswordMessage(t("profile.passwordChanged"));
    } catch (err) { setPasswordError(err.message || t("profile.passwordError")); }
  };

  const fieldClass = "mt-2 w-full rounded-xl border border-[#eadfce] bg-white px-4 py-3 text-sm text-[#593a29] outline-none transition placeholder:text-[#b49b85] focus:border-[#a15f3d] focus:ring-2 focus:ring-[#a15f3d]/10";
  const labelClass = "text-xs font-bold uppercase tracking-wider text-[#8d6a50]";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf6ef] px-4 py-10 text-[#593a29] sm:py-14">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#8d5639] transition hover:text-[#70432e]"><ArrowLeft size={17} /> {t("profile.back")}</Link>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8d5639] text-white shadow-lg shadow-[#8d5639]/20"><ChefHat size={25} /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#a27a5e]">{t("profile.brand")}</p>
              <h1 className="font-display text-3xl font-bold">{t("profile.title")}</h1>
            </div>
          </div>

          <section className="mb-6 rounded-3xl border border-[#eadfce] bg-white/80 p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-center gap-2">
              <UserRound size={19} className="text-[#a15f3d]" />
              <h2 className="font-display text-xl font-bold">{t("profile.personal")}</h2>
            </div>
            <form onSubmit={saveProfile}>
              <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row">
                <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#a66b49] to-[#70432e] text-3xl font-extrabold uppercase text-white shadow-md">
                  {avatar ? <img src={avatar} alt={t("profile.profilePhoto")} className="h-full w-full object-cover" /> : user.name?.charAt(0) || "U"}
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-bold">{t("profile.profilePhoto")}</p>
                  <p className="mt-1 text-xs text-[#9b8069]">{t("profile.photoHint")}</p>
                  <button type="button" onClick={() => fileRef.current?.click()} className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d9c4ae] bg-[#faf6ef] px-4 py-2 text-xs font-bold text-[#805037] transition hover:border-[#a15f3d]"><Camera size={15} /> {t("profile.choosePhoto")}</button><input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" /></div>
              </div>
              <div className="mb-5">
                <label className={labelClass}>{t("profile.name")}</label>
                <input value={name} onChange={(e) => { setName(e.target.value); setProfileMessage(""); }} className={fieldClass} placeholder={t("profile.namePlaceholder")} maxLength={50} /></div>
              <div className="mb-6">
                <label className={labelClass}>{t("profile.email")}</label>
                <input value={user.email} readOnly className={`${fieldClass} cursor-not-allowed bg-[#f7f1e9] text-[#9b8069]`} /><p className="mt-1.5 text-[11px] text-[#a27a5e]">{t("profile.emailHint")}</p></div>
              {error && <p role="alert" className="mb-3 text-sm font-semibold text-red-600">{error}</p>}
              {profileMessage && <p role="status" className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-700"><Check size={16} />{profileMessage}</p>}
              <button disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#9b6242] to-[#78472f] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#8d5639]/20 transition hover:-translate-y-0.5 disabled:opacity-60"><Save size={16} /> {saving ? t("profile.saving") : t("profile.save")}</button>
            </form>
          </section>

          <section className="rounded-3xl border border-[#eadfce] bg-white/80 p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-center gap-2">
              <LockKeyhole size={19} className="text-[#a15f3d]" />
              <h2 className="font-display text-xl font-bold">{t("profile.passwordTitle")}</h2>
            </div>
            <form onSubmit={savePassword}>
              <div className="mb-4">
                <label className={labelClass}>{t("profile.currentPassword")}</label>
                <input type="password" autoComplete="current-password" required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={fieldClass} placeholder={t("profile.currentPlaceholder")} /></div>
              <div className="mb-4">
                <label className={labelClass}>{t("profile.newPassword")}</label>
                <input type="password" autoComplete="new-password" required minLength={8} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={fieldClass} placeholder={t("profile.newPlaceholder")} /></div>
              <div className="mb-6">
                <label className={labelClass}>{t("profile.confirmPassword")}</label>
                <input type="password" autoComplete="new-password" required minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={fieldClass} placeholder={t("profile.confirmPlaceholder")} /></div>
              {passwordError && <p role="alert" className="mb-3 text-sm font-semibold text-red-600">{passwordError}</p>}
              {passwordMessage && <p role="status" className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-700">
                <Check size={16} />{passwordMessage}</p>}
              <button className="inline-flex items-center gap-2 rounded-full border border-[#d9c4ae] bg-[#faf6ef] px-6 py-3 text-sm font-bold text-[#805037] transition hover:border-[#a15f3d] hover:bg-[#f4ede3]"><LockKeyhole size={16} /> {t("profile.updatePassword")}</button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
