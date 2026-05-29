"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <main className="min-h-screen bg-[#030b0c] px-4 py-10 text-[#f3efe5]">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-md items-center justify-center">
        <div className="w-full rounded-[28px] border border-[#d8b66a]/24 bg-black/28 px-5 py-7 shadow-[0_24px_70px_rgba(0,0,0,0.48)] backdrop-blur">
          <div className="mb-7 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.42em] text-[#d8b66a]">
              Личный кабинет
            </p>

            <h1 className="m-0 text-2xl font-bold tracking-[-0.05em] text-[#f3d98d]">
              {isSignUp ? "Создать аккаунт" : "Войти в профиль"}
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#f3efe5]/72">
              Войдите, чтобы управлять профилем, корзиной и заказами.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-[#d8b66a]/90">
                  Имя
                </span>

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                  placeholder="Ваше имя"
                />
              </label>
            )}

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-[#d8b66a]/90">
                Email
              </span>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                placeholder="example@mail.ru"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.24em] text-[#d8b66a]/90">
                Пароль
              </span>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
                className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
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
              className="mt-2 w-full rounded-2xl border border-[#d8b66a]/40 bg-[#d8b66a] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#07110f] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Подождите..."
                : isSignUp
                  ? "Зарегистрироваться"
                  : "Войти"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode(isSignUp ? "sign-in" : "sign-up");
              setErrorMessage("");
            }}
            className="mt-5 w-full text-center text-sm font-medium text-[#f3efe5]/72 transition hover:text-[#f3d98d]"
          >
            {isSignUp
              ? "Уже есть аккаунт? Войти"
              : "Нет аккаунта? Зарегистрироваться"}
          </button>
        </div>
      </section>
    </main>
  );
}
