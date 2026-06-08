"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  KeyRound,
  LogIn,
  Mail,
  ShieldCheck,
  UserPlus,
  UserRound,
} from "lucide-react";
import BeesPageBackground from "@/components/shared/BeesPageBackground";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isSignUp = mode === "sign-up";

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = isSignUp
        ? await authClient.signUp.email({
            name,
            email,
            password,
          })
        : await authClient.signIn.email({
            email,
            password,
          });

      if (response?.error) {
        setErrorMessage(
          response.error.message || "Не удалось выполнить действие."
        );
        return;
      }

      router.push("/profile");
      router.refresh();
    } catch {
      setErrorMessage("Произошла ошибка. Попробуйте ещё раз.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030b0c] px-4 py-8 text-[#f3efe5] sm:px-6 lg:px-8">
      <BeesPageBackground />

      <Link
        href="/"
        aria-label="На главную"
        className="group absolute left-4 top-4 z-20 inline-flex items-center justify-center transition duration-300 hover:-translate-y-0.5 sm:left-6 sm:top-6 lg:left-8 lg:top-8"
      >
        <Image
          src="/images/logo1.webp"
          alt="APIDARB"
          width={112}
          height={112}
          priority
          className="h-20 w-20 rounded-full object-contain opacity-92 transition duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:drop-shadow-[0_0_22px_rgba(216,182,106,0.32)] sm:h-24 sm:w-24"
        />
      </Link>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-md items-center justify-center">
        <div className="w-full overflow-hidden rounded-[32px] border border-[#d8b66a]/20 bg-black/44 shadow-[0_28px_80px_rgba(0,0,0,0.5)]">
          <div className="relative border-b border-[#d8b66a]/12 px-5 py-7 text-center">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(216,182,106,0.14),transparent_42%)]" />

            <div className="relative mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-[#d8b66a]/20 bg-[#d8b66a]/10 text-[#f3d98d]">
              {isSignUp ? (
                <UserPlus className="size-6" />
              ) : (
                <ShieldCheck className="size-6" />
              )}
            </div>

            <div className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b66a]/18 bg-black/24 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]">
              <UserRound className="size-4" />
              Личный кабинет
            </div>

            <h1 className="relative m-0 text-2xl font-bold tracking-[-0.05em] text-[#f3d98d]">
              {isSignUp ? "Создать аккаунт" : "Войти в профиль"}
            </h1>

            <p className="relative mx-auto mt-3 max-w-sm text-sm leading-6 text-[#f3efe5]/72">
              Войдите, чтобы управлять профилем, корзиной и заказами.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 px-5 py-6">
            {isSignUp && (
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#d8b66a]/90">
                  <UserRound className="size-4" />
                  Имя
                </span>

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition duration-300 placeholder:text-[#f3efe5]/34 focus:border-[#d8b66a]/60 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)]"
                  placeholder="Ваше имя"
                />
              </label>
            )}

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#d8b66a]/90">
                <Mail className="size-4" />
                Email
              </span>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition duration-300 placeholder:text-[#f3efe5]/34 focus:border-[#d8b66a]/60 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)]"
                placeholder="example@mail.ru"
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#d8b66a]/90">
                <KeyRound className="size-4" />
                Пароль
              </span>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
                className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition duration-300 placeholder:text-[#f3efe5]/34 focus:border-[#d8b66a]/60 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)]"
                placeholder="Минимум 8 символов"
              />
            </label>

            {errorMessage && (
              <p className="rounded-2xl border border-red-400/24 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-100">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/40 bg-[#d8b66a] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#07110f] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSignUp ? (
                <UserPlus className="size-4 transition duration-300 group-hover:scale-110" />
              ) : (
                <LogIn className="size-4 transition duration-300 group-hover:scale-110" />
              )}

              {isLoading
                ? "Подождите..."
                : isSignUp
                  ? "Зарегистрироваться"
                  : "Войти"}
            </button>
          </form>

          <div className="border-t border-[#d8b66a]/12 px-5 py-5">
            <button
              type="button"
              onClick={() => {
                setMode(isSignUp ? "sign-in" : "sign-up");
                setErrorMessage("");
              }}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/18 bg-black/24 px-4 py-3 text-center text-sm font-medium text-[#f3efe5]/72 transition duration-300 hover:border-[#d8b66a]/42 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d]"
            >
              {isSignUp
                ? "Уже есть аккаунт? Войти"
                : "Нет аккаунта? Зарегистрироваться"}

              <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}