"use client";

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
import { PageLogo } from "@/components/shared/PageLogo";
import { authClient } from "@/lib/auth-client";

function getAuthErrorMessage(error, isSignUp) {
  if (error?.status === 429) {
    return "Слишком много попыток. Повторите позже.";
  }

  if (error?.code === "PASSWORD_COMPROMISED") {
    return "Этот пароль найден в известных утечках. Выберите другой пароль.";
  }

  return isSignUp
    ? "Не удалось создать аккаунт. Проверьте данные или попробуйте позже."
    : "Неверный email или пароль.";
}

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isSignUp = mode === "sign-up";

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
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
          getAuthErrorMessage(response.error, isSignUp)
        );
        return;
      }

      if (response?.data?.twoFactorRedirect) {
        return;
      }

      if (isSignUp) {
        setMode("sign-in");
        setName("");
        setPassword("");
        setSuccessMessage(
          "Аккаунт создан. Теперь войдите с вашим паролем."
        );
        return;
      }

      router.push("/profile");
      router.refresh();
    } catch {
      setErrorMessage(
        "Произошла ошибка. Попробуйте ещё раз."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030b0c] px-3 py-4 text-[#f3efe5] sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <BeesPageBackground />

      <div className="relative z-20 mb-3 flex justify-center sm:mb-4 lg:absolute lg:left-8 lg:top-8 lg:mb-0">
        <PageLogo variant="auth" />
      </div>

      <section className="relative z-10 mx-auto flex w-full max-w-md items-start justify-center pb-4 lg:min-h-[calc(100vh-64px)] lg:items-center lg:pb-0">
        <div className="w-full overflow-hidden rounded-[28px] border border-[#d8b66a]/20 bg-black/44 shadow-[0_28px_80px_rgba(0,0,0,0.5)] sm:rounded-[32px]">
          <div className="relative border-b border-[#d8b66a]/12 px-4 py-6 text-center sm:px-5 sm:py-7">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(216,182,106,0.14),transparent_42%)]" />

            <div className="relative mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl border border-[#d8b66a]/20 bg-[#d8b66a]/10 text-[#f3d98d] sm:mb-5 sm:size-14">
              {isSignUp ? (
                <UserPlus className="size-5 sm:size-6" />
              ) : (
                <ShieldCheck className="size-5 sm:size-6" />
              )}
            </div>

            <div className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b66a]/18 bg-black/24 px-3 py-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#d8b66a] sm:px-4 sm:text-[0.68rem] sm:tracking-[0.28em]">
              <UserRound className="size-4" />
              Личный кабинет
            </div>

            <h1 className="relative m-0 text-[1.35rem] font-bold tracking-[-0.05em] text-[#f3d98d] sm:text-2xl">
              {isSignUp
                ? "Создать аккаунт"
                : "Войти в профиль"}
            </h1>

            <p className="relative mx-auto mt-3 max-w-sm text-[0.8rem] leading-6 text-[#f3efe5]/72 sm:text-sm">
              Войдите, чтобы управлять профилем, корзиной и
              заказами.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 px-4 py-5 sm:px-5 sm:py-6"
          >
            {isSignUp && (
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#d8b66a]/90 sm:text-xs sm:tracking-[0.24em]">
                  <UserRound className="size-4" />
                  Имя
                </span>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                  maxLength={100}
                  autoComplete="name"
                  className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition duration-300 placeholder:text-[#f3efe5]/34 focus:border-[#d8b66a]/60 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)]"
                  placeholder="Ваше имя"
                />
              </label>
            )}

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#d8b66a]/90 sm:text-xs sm:tracking-[0.24em]">
                <Mail className="size-4" />
                Email
              </span>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
                maxLength={254}
                autoComplete="email"
                className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition duration-300 placeholder:text-[#f3efe5]/34 focus:border-[#d8b66a]/60 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)]"
                placeholder="example@mail.ru"
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#d8b66a]/90 sm:text-xs sm:tracking-[0.24em]">
                <KeyRound className="size-4" />
                Пароль
              </span>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
                minLength={isSignUp ? 12 : 8}
                maxLength={128}
                autoComplete={
                  isSignUp ? "new-password" : "current-password"
                }
                className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition duration-300 placeholder:text-[#f3efe5]/34 focus:border-[#d8b66a]/60 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)]"
                placeholder={
                  isSignUp ? "Минимум 12 символов" : "Введите пароль"
                }
              />
            </label>

            {errorMessage && (
              <p className="rounded-2xl border border-red-400/24 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-100">
                {errorMessage}
              </p>
            )}

            {successMessage && (
              <p className="rounded-2xl border border-emerald-300/20 bg-emerald-300/8 px-4 py-3 text-sm leading-6 text-emerald-100">
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/40 bg-[#d8b66a] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#07110f] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:text-sm sm:tracking-[0.22em]"
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

            {isSignUp && (
              <p className="m-0 text-center text-[0.68rem] leading-5 text-[#f3efe5]/48">
                Регистрируясь, вы принимаете{" "}
                <Link
                  href="/legal/terms"
                  className="text-[#d8b66a] underline decoration-[#d8b66a]/32 underline-offset-4 transition hover:text-[#f3d98d]"
                >
                  Условия пользования
                </Link>{" "}
                и подтверждаете ознакомление с{" "}
                <Link
                  href="/legal/privacy-policy"
                  className="text-[#d8b66a] underline decoration-[#d8b66a]/32 underline-offset-4 transition hover:text-[#f3d98d]"
                >
                  Политикой конфиденциальности
                </Link>
                .
              </p>
            )}
          </form>

          <div className="border-t border-[#d8b66a]/12 px-4 py-4 sm:px-5 sm:py-5">
            <button
              type="button"
              onClick={() => {
                setMode(
                  isSignUp ? "sign-in" : "sign-up"
                );
                setErrorMessage("");
                setSuccessMessage("");
                setPassword("");
              }}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/18 bg-black/24 px-3 py-3 text-center text-[0.78rem] font-medium leading-5 text-[#f3efe5]/72 transition duration-300 hover:border-[#d8b66a]/42 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d] sm:px-4 sm:text-sm"
            >
              <span>
                {isSignUp
                  ? "Уже есть аккаунт? Войти"
                  : "Нет аккаунта? Зарегистрироваться"}
              </span>

              <ArrowRight className="size-4 shrink-0 transition duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
