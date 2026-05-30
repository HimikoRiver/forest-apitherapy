"use client";

import { useEffect, useRef, useState, useTransition } from "react";

export default function CartQuantityControl({
  cartItemId,
  quantity,
  maxQuantity,
  updateAction,
}) {
  const [value, setValue] = useState(String(quantity));
  const [isPending, startTransition] = useTransition();

  const timeoutRef = useRef(null);
  const lastSubmittedValueRef = useRef(String(quantity));

  useEffect(() => {
    setValue(String(quantity));
    lastSubmittedValueRef.current = String(quantity);
  }, [quantity]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  function submitQuantity(nextValue) {
    const numericValue = Number(nextValue);

    const normalizedQuantity = Math.min(
      Math.max(Number.isFinite(numericValue) ? numericValue : 1, 1),
      maxQuantity
    );

    const normalizedValue = String(normalizedQuantity);

    setValue(normalizedValue);

    if (normalizedValue === lastSubmittedValueRef.current) {
      return;
    }

    lastSubmittedValueRef.current = normalizedValue;

    const formData = new FormData();

    formData.set("cartItemId", cartItemId);
    formData.set("quantity", normalizedValue);

    startTransition(() => {
      updateAction(formData);
    });
  }

  function handleChange(event) {
    const nextValue = event.target.value;

    setValue(nextValue);
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      submitQuantity(nextValue);
    }, 450);
  }

  function handleBlur() {
    clearTimeout(timeoutRef.current);
    submitQuantity(value);
  }

  return (
    <div className="space-y-2">
      <label className="block">
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
          Количество
        </span>

        <input
          type="number"
          min="1"
          max={maxQuantity}
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
          className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
        />
      </label>

      <p className="min-h-5 text-xs leading-5 text-[#f3efe5]/48">
        {isPending ? "Сохраняем..." : "Цена обновится автоматически"}
      </p>
    </div>
  );
}