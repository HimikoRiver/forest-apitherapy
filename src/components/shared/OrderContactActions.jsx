"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Check,
  Copy,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { homeContent } from "@/data/homeContent";

function findAdminContact(label) {
  return (
    homeContent.contactItems.find(
      (item) => item.label === label
    ) || null
  );
}

function normalizePhoneNumber(value) {
  const digits = String(value || "").replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (
    digits.length === 11 &&
    digits.startsWith("8")
  ) {
    return `7${digits.slice(1)}`;
  }

  if (digits.length === 10) {
    return `7${digits}`;
  }

  return digits;
}

function getOrderReference(orderId) {
  const normalizedOrderId = String(orderId || "").trim();

  if (!normalizedOrderId) {
    return "";
  }

  return normalizedOrderId.slice(-8).toUpperCase();
}

function createWhatsAppLink(baseHref, message) {
  if (!baseHref) {
    return null;
  }

  const cleanHref = baseHref.split("?")[0];

  return `${cleanHref}?text=${encodeURIComponent(message)}`;
}

function createGmailComposeLink(
  email,
  subject,
  body
) {
  const cleanEmail = String(email || "").trim();

  if (!cleanEmail) {
    return null;
  }

  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: cleanEmail,
    su: subject,
    body,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

function extractEmail(contact) {
  if (!contact?.href) {
    return "";
  }

  return contact.href
    .replace(/^mailto:/, "")
    .split("?")[0];
}

function copyWithFallback(value) {
  const textarea =
    document.createElement("textarea");

  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";

  document.body.appendChild(textarea);
  textarea.select();

  const copied =
    document.execCommand("copy");

  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error(
      "Не удалось скопировать текст."
    );
  }
}

function ActionLink({
  href,
  icon: Icon,
  label,
  primary = false,
  external = false,
  mobileOnly = false,
}) {
  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target={
        external ? "_blank" : undefined
      }
      rel={
        external
          ? "noopener noreferrer"
          : undefined
      }
      className={`group min-h-11 items-center justify-center gap-2 rounded-2xl border px-3 py-2.5 text-[0.64rem] font-bold uppercase tracking-[0.12em] transition duration-300 ${
        mobileOnly
          ? "inline-flex lg:hidden"
          : "inline-flex"
      } ${
        primary
          ? "border-[#d8b66a]/64 bg-[#d8b66a] text-[#07110f] shadow-[0_12px_30px_rgba(216,182,106,0.14)] hover:-translate-y-0.5 hover:brightness-110"
          : "border-[#d8b66a]/18 bg-black/24 text-[#d8b66a] hover:-translate-y-0.5 hover:border-[#d8b66a]/52 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d]"
      }`}
    >
      <Icon className="size-4 shrink-0 transition duration-300 group-hover:scale-110" />

      <span>{label}</span>
    </a>
  );
}

function CopyButton({
  copyKey,
  value,
  label,
  copiedKey,
  onCopy,
  fullWidth = false,
}) {
  if (!value) {
    return null;
  }

  const isCopied =
    copiedKey === copyKey;

  return (
    <button
      type="button"
      onClick={() =>
        onCopy(copyKey, value)
      }
      className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/18 bg-black/24 px-3 py-2.5 text-[0.64rem] font-bold uppercase tracking-[0.12em] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/52 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d] ${
        fullWidth ? "col-span-2" : ""
      }`}
    >
      {isCopied ? (
        <Check className="size-4 shrink-0 text-emerald-200" />
      ) : (
        <Copy className="size-4 shrink-0 transition duration-300 group-hover:scale-110" />
      )}

      <span>
        {isCopied
          ? "Скопировано"
          : label}
      </span>
    </button>
  );
}

export default function OrderContactActions({
  mode = "customer",
  orderId,
  orderStatus,
  customerName,
  customerPhone,
  customerEmail,
  compact = false,
}) {
  const copyTimerRef = useRef(null);
  const [copiedKey, setCopiedKey] =
    useState(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(
          copyTimerRef.current
        );
      }
    };
  }, []);

  const isAdminMode =
    mode === "admin";

  const orderReference =
    getOrderReference(orderId);

  const visibleOrderNumber =
    orderReference
      ? `№${orderReference}`
      : "без номера";

  const adminPhoneContact =
    findAdminContact("Телефон");

  const adminWhatsAppContact =
    findAdminContact("WhatsApp");

  const adminEmailContact =
    findAdminContact("E-mail");

  const adminEmail =
    extractEmail(adminEmailContact);

  const customerQuestionPrefix =
    orderStatus === "CANCELED"
      ? "Здравствуйте! Возник вопрос по отменённому заказу"
      : "Здравствуйте! Подскажите, пожалуйста, по заказу";

  const customerMessage = `${customerQuestionPrefix} ${visibleOrderNumber}.
ID заказа: ${orderId}.`;

  const safeCustomerName =
    String(customerName || "").trim() ||
    "клиент";

  const administratorMessage = `Здравствуйте, ${safeCustomerName}! Пишем по вашему заказу ${visibleOrderNumber} в центре APIDARB.
ID заказа: ${orderId}.`;

  const customerPhoneDigits =
    normalizePhoneNumber(
      customerPhone
    );

  const customerWhatsAppHref =
    customerPhoneDigits
      ? createWhatsAppLink(
          `https://wa.me/${customerPhoneDigits}`,
          administratorMessage
        )
      : null;

  const administratorWhatsAppHref =
    createWhatsAppLink(
      adminWhatsAppContact?.href,
      customerMessage
    );

  const administratorEmailHref =
    createGmailComposeLink(
      adminEmail,
      `Заказ APIDARB ${visibleOrderNumber}`,
      customerMessage
    );

  const customerEmailHref =
    createGmailComposeLink(
      customerEmail,
      `Заказ APIDARB ${visibleOrderNumber}`,
      administratorMessage
    );

  const customerContactsText = [
    customerPhone
      ? `Телефон: ${customerPhone}`
      : null,

    customerEmail
      ? `Email: ${customerEmail}`
      : null,

    `Заказ: ${visibleOrderNumber}`,
    `ID заказа: ${orderId}`,
  ]
    .filter(Boolean)
    .join("\n");

  async function handleCopy(
    copyKey,
    value
  ) {
    if (!value) {
      return;
    }

    try {
      if (
        navigator.clipboard
          ?.writeText
      ) {
        await navigator.clipboard.writeText(
          value
        );
      } else {
        copyWithFallback(value);
      }

      setCopiedKey(copyKey);

      if (copyTimerRef.current) {
        window.clearTimeout(
          copyTimerRef.current
        );
      }

      copyTimerRef.current =
        window.setTimeout(() => {
          setCopiedKey(null);
        }, 2200);
    } catch (error) {
      console.error(
        "Failed to copy contact data:",
        error
      );
    }
  }

  return (
    <section
      className={`overflow-hidden border border-[#d8b66a]/16 bg-[#030b0c]/86 shadow-[0_24px_70px_rgba(0,0,0,0.34)] ${
        compact
          ? "rounded-[26px]"
          : "rounded-[32px]"
      }`}
    >
      <div
        className={`border-b border-[#d8b66a]/12 ${
          compact
            ? "px-4 py-4"
            : "px-5 py-5"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex shrink-0 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d] ${
              compact
                ? "size-10"
                : "size-11"
            }`}
          >
            <MessageCircle className="size-5" />
          </div>

          <div className="min-w-0">
            <p className="m-0 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#d8b66a]/76">
              {isAdminMode
                ? "Контакты клиента"
                : "Поддержка"}
            </p>

            <h3 className="mt-1 text-base font-bold tracking-[-0.04em] text-[#f3d98d]">
              {isAdminMode
                ? "Связаться с клиентом"
                : "Связаться с администратором"}
            </h3>
          </div>
        </div>
      </div>

      <div
        className={
          compact ? "p-4" : "p-5"
        }
      >
        <div className="rounded-[20px] border border-[#d8b66a]/10 bg-black/22 px-4 py-3">
          <p className="m-0 text-xs leading-5 text-[#f3efe5]/56">
            {isAdminMode
              ? "Контакты указаны клиентом при оформлении заказа."
              : "Номер заказа уже добавлен в подготовленное сообщение."}
          </p>

          <p className="mt-2 break-all text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#d8b66a]/78">
            Заказ {visibleOrderNumber}
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {isAdminMode ? (
            <>
              <ActionLink
                href={
                  customerWhatsAppHref
                }
                icon={MessageCircle}
                label="WhatsApp"
                primary
                external
              />

              <ActionLink
                href={
                  customerPhone
                    ? `tel:${customerPhone}`
                    : null
                }
                icon={Phone}
                label="Позвонить"
                mobileOnly
              />

              <ActionLink
                href={
                  customerEmailHref
                }
                icon={Mail}
                label="Email"
                external
              />

              <CopyButton
                copyKey="customer-contacts"
                value={
                  customerContactsText
                }
                label="Копировать контакты"
                copiedKey={copiedKey}
                onCopy={handleCopy}
                fullWidth
              />
            </>
          ) : (
            <>
              <ActionLink
                href={
                  administratorWhatsAppHref
                }
                icon={MessageCircle}
                label="WhatsApp"
                primary
                external
              />

              <ActionLink
                href={
                  adminPhoneContact?.href
                }
                icon={Phone}
                label="Позвонить"
                mobileOnly
              />

              <ActionLink
                href={
                  administratorEmailHref
                }
                icon={Mail}
                label="Email"
                external
              />

              <CopyButton
                copyKey="administrator-message"
                value={customerMessage}
                label="Скопировать текст сообщения"
                copiedKey={copiedKey}
                onCopy={handleCopy}
                fullWidth
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}