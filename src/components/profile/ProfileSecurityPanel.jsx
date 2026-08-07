"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Copy,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

function readTotpSecret(totpURI) {
  try {
    return new URL(totpURI).searchParams.get("secret") || "";
  } catch {
    return "";
  }
}

function SecurityStatus({ enabled, isAdmin }) {
  return (
    <div
      className={`rounded-[24px] border p-4 ${
        enabled
          ? "border-emerald-300/20 bg-emerald-300/8"
          : "border-amber-300/20 bg-amber-300/8"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl border ${
            enabled
              ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
              : "border-amber-300/20 bg-amber-300/10 text-amber-100"
          }`}
        >
          {enabled ? (
            <ShieldCheck className="size-5" />
          ) : (
            <ShieldOff className="size-5" />
          )}
        </div>

        <div>
          <p className="m-0 text-sm font-bold text-[#f3efe5]">
            {enabled
              ? "Двухфакторная защита включена"
              : "Двухфакторная защита выключена"}
          </p>

          <p className="m-0 mt-1.5 text-xs leading-6 text-[#f3efe5]/62">
            {enabled
              ? "После правильного пароля вход дополнительно подтверждается одноразовым кодом."
              : isAdmin
                ? "Для администратора 2FA обязательна. До подключения административные разделы недоступны."
                : "Подключите приложение-аутентификатор, чтобы защитить аккаунт даже при утечке пароля."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProfileSecurityPanel({
  initialEnabled,
  isAdmin,
}) {
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(initialEnabled);
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [totpURI, setTotpURI] = useState("");
  const [backupCodes, setBackupCodes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const totpSecret = useMemo(
    () => readTotpSecret(totpURI),
    [totpURI]
  );

  async function copyText(value) {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setSuccessMessage("Скопировано.");
      setErrorMessage("");
    } catch {
      setErrorMessage("Не удалось скопировать. Скопируйте значение вручную.");
    }
  }

  async function enableTwoFactor(event) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await authClient.twoFactor.enable({
        password,
        issuer: "APIDARB",
      });

      if (response?.error) {
        setErrorMessage(
          response.error.status === 429
            ? "Слишком много попыток. Повторите позже."
            : "Не удалось подключить защиту. Проверьте пароль."
        );
        return;
      }

      setTotpURI(response?.data?.totpURI || "");
      setBackupCodes(response?.data?.backupCodes || []);
      setPassword("");
      setSuccessMessage(
        "Добавьте ключ в приложение-аутентификатор и подтвердите первый код."
      );
    } catch {
      setErrorMessage("Не удалось подключить двухфакторную защиту.");
    } finally {
      setIsLoading(false);
    }
  }

  async function verifyTwoFactor(event) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await authClient.twoFactor.verifyTotp({
        code: verificationCode.trim(),
        trustDevice: false,
      });

      if (response?.error) {
        setErrorMessage(
          response.error.status === 429
            ? "Слишком много попыток. Повторите позже."
            : "Код не подошёл. Дождитесь нового кода и попробуйте снова."
        );
        return;
      }

      setIsEnabled(true);
      setVerificationCode("");
      setTotpURI("");
      setSuccessMessage(
        "Двухфакторная защита включена. Сохраните резервные коды в безопасном месте."
      );
      router.refresh();
    } catch {
      setErrorMessage("Не удалось подтвердить код.");
    } finally {
      setIsLoading(false);
    }
  }

  async function disableTwoFactor(event) {
    event.preventDefault();

    if (isAdmin) {
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await authClient.twoFactor.disable({
        password,
      });

      if (response?.error) {
        setErrorMessage(
          response.error.status === 429
            ? "Слишком много попыток. Повторите позже."
            : "Не удалось отключить защиту. Проверьте пароль."
        );
        return;
      }

      setIsEnabled(false);
      setPassword("");
      setBackupCodes([]);
      setTotpURI("");
      setSuccessMessage("Двухфакторная защита отключена.");
      router.refresh();
    } catch {
      setErrorMessage("Не удалось отключить двухфакторную защиту.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <SecurityStatus enabled={isEnabled} isAdmin={isAdmin} />

      {!isEnabled && !totpURI && (
        <form
          onSubmit={enableTwoFactor}
          className="rounded-[26px] border border-[#d8b66a]/14 bg-black/24 p-5"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
              <LockKeyhole className="size-5" />
            </div>

            <div>
              <p className="m-0 text-sm font-bold text-[#f3d98d]">
                Подключить 2FA
              </p>
              <p className="m-0 mt-1 text-xs text-[#f3efe5]/52">
                Для подтверждения нужен текущий пароль.
              </p>
            </div>
          </div>

          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={12}
            maxLength={128}
            placeholder="Текущий пароль"
            className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition placeholder:text-[#f3efe5]/34 focus:border-[#d8b66a]/60 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)]"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/40 bg-[#d8b66a] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#07110f] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ShieldCheck className="size-4" />
            {isLoading ? "Подключаем..." : "Подключить защиту"}
          </button>
        </form>
      )}

      {!isEnabled && totpURI && (
        <div className="space-y-4 rounded-[26px] border border-[#d8b66a]/14 bg-black/24 p-5">
          <div>
            <p className="m-0 text-sm font-bold text-[#f3d98d]">
              1. Добавьте APIDARB в аутентификатор
            </p>
            <p className="m-0 mt-2 text-xs leading-6 text-[#f3efe5]/62">
              В Google Authenticator, Microsoft Authenticator или другом TOTP-приложении выберите ручное добавление ключа.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8b66a]/14 bg-black/34 p-4">
            <p className="m-0 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[#d8b66a]/80">
              Секретный ключ
            </p>

            <div className="mt-2 flex items-center gap-2">
              <code className="min-w-0 flex-1 break-all text-sm leading-6 text-[#f3efe5]">
                {totpSecret || "Ключ не удалось прочитать автоматически"}
              </code>

              {totpSecret && (
                <button
                  type="button"
                  onClick={() => copyText(totpSecret)}
                  aria-label="Скопировать секретный ключ"
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#d8b66a]/18 bg-[#d8b66a]/8 text-[#d8b66a] transition hover:border-[#d8b66a]/42 hover:text-[#f3d98d]"
                >
                  <Copy className="size-4" />
                </button>
              )}
            </div>
          </div>

          <form onSubmit={verifyTwoFactor}>
            <p className="m-0 mb-2 text-sm font-bold text-[#f3d98d]">
              2. Подтвердите шестизначный код
            </p>

            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={verificationCode}
              onChange={(event) => setVerificationCode(event.target.value)}
              required
              maxLength={6}
              placeholder="000000"
              className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-center text-lg tracking-[0.24em] text-[#f3efe5] outline-none transition placeholder:text-[#f3efe5]/34 focus:border-[#d8b66a]/60 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)]"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/40 bg-[#d8b66a] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#07110f] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CheckCircle2 className="size-4" />
              {isLoading ? "Проверяем..." : "Подтвердить и включить"}
            </button>
          </form>
        </div>
      )}

      {backupCodes.length > 0 && (
        <div className="rounded-[26px] border border-[#d8b66a]/14 bg-black/24 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="m-0 text-sm font-bold text-[#f3d98d]">
                Резервные коды
              </p>
              <p className="m-0 mt-2 text-xs leading-6 text-[#f3efe5]/62">
                Сохраните их офлайн. Каждый код предназначен для восстановления доступа, если телефон недоступен.
              </p>
            </div>

            <button
              type="button"
              onClick={() => copyText(backupCodes.join("\n"))}
              aria-label="Скопировать резервные коды"
              className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#d8b66a]/18 bg-[#d8b66a]/8 text-[#d8b66a] transition hover:border-[#d8b66a]/42 hover:text-[#f3d98d]"
            >
              <Copy className="size-4" />
            </button>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {backupCodes.map((backupCode) => (
              <code
                key={backupCode}
                className="rounded-xl border border-[#d8b66a]/10 bg-black/34 px-3 py-2 text-center text-xs text-[#f3efe5]/84"
              >
                {backupCode}
              </code>
            ))}
          </div>
        </div>
      )}

      {isEnabled && !isAdmin && (
        <form
          onSubmit={disableTwoFactor}
          className="rounded-[26px] border border-red-300/12 bg-red-300/5 p-5"
        >
          <p className="m-0 text-sm font-bold text-red-100">
            Отключить 2FA
          </p>
          <p className="m-0 mt-2 text-xs leading-6 text-[#f3efe5]/58">
            После отключения для входа снова будет достаточно одного пароля.
          </p>

          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={12}
            maxLength={128}
            placeholder="Текущий пароль"
            className="mt-4 w-full rounded-2xl border border-red-300/14 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition placeholder:text-[#f3efe5]/34 focus:border-red-300/38"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-red-300/20 bg-red-300/8 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-red-100 transition hover:bg-red-300/12 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ShieldOff className="size-4" />
            Отключить защиту
          </button>
        </form>
      )}

      {isEnabled && isAdmin && (
        <div className="rounded-[22px] border border-[#d8b66a]/12 bg-[#d8b66a]/6 px-4 py-3 text-xs leading-6 text-[#f3efe5]/68">
          Для аккаунта администратора 2FA обязательна и не отключается через интерфейс сайта.
        </div>
      )}

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
    </div>
  );
}
