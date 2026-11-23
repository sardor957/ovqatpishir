import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const USERS_KEY = "ovqatpishir_auth_users_v1";
const SESSION_KEY = "ovqatpishir_auth_session_v1";
const AuthContext = createContext(null);

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function publicUser(user) {
  if (!user) return null;
  return { id: user.id, name: user.name, email: user.email, avatar: user.avatar || "" };
}

function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function base64ToBytes(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

async function hashPassword(password, salt) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Xavfsiz kirish uchun saytni localhost yoki HTTPS orqali oching.");
  }

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: base64ToBytes(salt),
      iterations: 120000,
      hash: "SHA-256",
    },
    key,
    256,
  );

  return bytesToBase64(new Uint8Array(bits));
}

function getInitialUser() {
  const session = readJson(SESSION_KEY, null);
  if (!session?.id) return null;
  const users = readJson(USERS_KEY, []);
  const found = users.find((item) => item.id === session.id);
  if (!found) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
  return publicUser(found);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  useEffect(() => {
    const syncFromStorage = (event) => {
      if (event.key === SESSION_KEY || event.key === USERS_KEY) {
        setUser(getInitialUser());
      }
    };
    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  const signUp = useCallback(async ({ name, email, password }) => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedName.length < 2) throw new Error("Ism kamida 2 ta belgidan iborat bo‘lsin.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      throw new Error("To‘g‘ri email manzilini kiriting.");
    }
    if (password.length < 8) throw new Error("Parol kamida 8 ta belgidan iborat bo‘lsin.");

    const users = readJson(USERS_KEY, []);
    if (users.some((item) => item.email === normalizedEmail)) {
      throw new Error("Bu email bilan akkaunt allaqachon mavjud. Kirish bo‘limidan foydalaning.");
    }

    const saltBytes = crypto.getRandomValues(new Uint8Array(16));
    const salt = bytesToBase64(saltBytes);
    const passwordHash = await hashPassword(password, salt);
    const newUser = {
      id: crypto.randomUUID(),
      name: normalizedName,
      email: normalizedEmail,
      passwordSalt: salt,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: newUser.id }));
    setUser(publicUser(newUser));
    return publicUser(newUser);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = readJson(USERS_KEY, []);
    const found = users.find((item) => item.email === normalizedEmail);

    if (!found) throw new Error("Email yoki parol noto‘g‘ri.");
    const passwordHash = await hashPassword(password, found.passwordSalt);
    if (passwordHash !== found.passwordHash) {
      throw new Error("Email yoki parol noto‘g‘ri.");
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: found.id }));
    setUser(publicUser(found));
    return publicUser(found);
  }, []);

  const updateProfile = useCallback(({ name, avatar }) => {
    const session = readJson(SESSION_KEY, null);
    if (!session?.id) throw new Error("Avval akkauntingizga kiring.");
    const users = readJson(USERS_KEY, []);
    const index = users.findIndex((item) => item.id === session.id);
    if (index < 0) throw new Error("Foydalanuvchi topilmadi.");

    const normalizedName = String(name ?? users[index].name).trim();
    if (normalizedName.length < 2) throw new Error("Ism kamida 2 ta belgidan iborat bo‘lsin.");
    users[index] = { ...users[index], name: normalizedName, avatar: avatar ?? users[index].avatar ?? "" };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const nextUser = publicUser(users[index]);
    setUser(nextUser);
    return nextUser;
  }, []);

  const changePassword = useCallback(async ({ currentPassword, newPassword }) => {
    const session = readJson(SESSION_KEY, null);
    if (!session?.id) throw new Error("Avval akkauntingizga kiring.");
    const users = readJson(USERS_KEY, []);
    const index = users.findIndex((item) => item.id === session.id);
    if (index < 0) throw new Error("Foydalanuvchi topilmadi.");
    const currentHash = await hashPassword(currentPassword, users[index].passwordSalt);
    if (currentHash !== users[index].passwordHash) throw new Error("Joriy parol noto‘g‘ri.");
    if (String(newPassword).length < 8) throw new Error("Yangi parol kamida 8 ta belgidan iborat bo‘lsin.");
    if (currentPassword === newPassword) throw new Error("Yangi parol eskisidan farq qilishi kerak.");

    const salt = bytesToBase64(crypto.getRandomValues(new Uint8Array(16)));
    users[index] = { ...users[index], passwordSalt: salt, passwordHash: await hashPassword(newPassword, salt) };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, signUp, signIn, signOut, updateProfile, changePassword }), [user, signUp, signIn, signOut, updateProfile, changePassword]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth AuthProvider ichida ishlatilishi kerak.");
  return context;
}
