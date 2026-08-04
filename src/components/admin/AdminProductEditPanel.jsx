"use client";

import { useActionState, useEffect, useRef } from "react";
import { FilePenLine, LoaderCircle, Save } from "lucide-react";

const INITIAL_STATE = {
  ok: false,
  savedAt: 0,
};

export default function AdminProductEditPanel({
  action,
  children,
}) {
  const detailsRef = useRef(null);
  const [state, formAction, isPending] = useActionState(
    action,
    INITIAL_STATE
  );

  useEffect(() => {
    if (!state?.ok || !state.savedAt) {
      return;
    }

    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  }, [state]);

  return (
    <details
      ref={detailsRef}
      className="mt-4 rounded-[24px] border border-[#d8b66a]/10 bg-black/18 p-4 transition open:border-[#d8b66a]/22 open:bg-black/26"
    >
      <summary className="flex cursor-pointer list-none items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d8b66a] transition hover:text-[#f3d98d]">
        <FilePenLine className="size-4" />
        Редактировать
      </summary>

      <form action={formAction} className="mt-5 space-y-4">
        {children}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/48 bg-[#d8b66a] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#07110f] shadow-[0_14px_38px_rgba(216,182,106,0.14)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_20px_52px_rgba(216,182,106,0.2)] disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:min-w-[260px]"
          >
            {isPending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Save className="size-4 transition duration-300 group-hover:scale-110" />
            )}

            {isPending ? "Сохраняем..." : "Сохранить изменения"}
          </button>
        </div>
      </form>
    </details>
  );
}