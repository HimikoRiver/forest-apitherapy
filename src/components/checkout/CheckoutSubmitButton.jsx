"use client";

import { LoaderCircle, Send } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function CheckoutSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="group inline-flex w-auto min-w-[220px] max-w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/40 bg-[#d8b66a] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#07110f] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-wait disabled:translate-y-0 disabled:opacity-70 disabled:brightness-90 sm:min-w-[250px] sm:px-7 sm:text-sm"
    >
      {pending ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <Send className="size-4 transition duration-300 group-hover:scale-110" />
      )}

      {pending ? "Оформляем заказ..." : "Подтвердить заказ"}
    </button>
  );
}