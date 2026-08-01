"use client";

import { useMemo, useState } from "react";
import { Phone } from "lucide-react";

const COUNTRIES = [
  {
    code: "RU",
    name: "Россия",
    dialCode: "+7",
    localLength: 10,
    placeholder: "928 123 45 67",
  },
  {
    code: "BY",
    name: "Беларусь",
    dialCode: "+375",
    localLength: 9,
    placeholder: "29 123 45 67",
  },
  {
    code: "KZ",
    name: "Казахстан",
    dialCode: "+7",
    localLength: 10,
    placeholder: "701 123 45 67",
  },
  {
    code: "AM",
    name: "Армения",
    dialCode: "+374",
    localLength: 8,
    placeholder: "91 123 456",
  },
  {
    code: "AZ",
    name: "Азербайджан",
    dialCode: "+994",
    localLength: 9,
    placeholder: "50 123 45 67",
  },
  {
    code: "GE",
    name: "Грузия",
    dialCode: "+995",
    localLength: 9,
    placeholder: "555 12 34 56",
  },
  {
    code: "KG",
    name: "Кыргызстан",
    dialCode: "+996",
    localLength: 9,
    placeholder: "555 123 456",
  },
  {
    code: "UZ",
    name: "Узбекистан",
    dialCode: "+998",
    localLength: 9,
    placeholder: "90 123 45 67",
  },
  {
    code: "FI",
    name: "Финляндия",
    dialCode: "+358",
    localLength: 9,
    placeholder: "40 123 4567",
  },
  {
    code: "TR",
    name: "Турция",
    dialCode: "+90",
    localLength: 10,
    placeholder: "532 123 45 67",
  },
];

function formatLocalNumber(value) {
  return value.replace(/\D/g, "");
}

export default function PhoneCountryField() {
  const [countryCode, setCountryCode] = useState("RU");
  const [localNumber, setLocalNumber] = useState("");

  const selectedCountry = useMemo(() => {
    return (
      COUNTRIES.find((country) => country.code === countryCode) || COUNTRIES[0]
    );
  }, [countryCode]);

  const internationalPhone = `${selectedCountry.dialCode}${localNumber}`;

  const isComplete =
    localNumber.length === selectedCountry.localLength;

  function handleCountryChange(event) {
    setCountryCode(event.target.value);
    setLocalNumber("");
  }

  function handlePhoneChange(event) {
    const digits = formatLocalNumber(event.target.value).slice(
      0,
      selectedCountry.localLength
    );

    setLocalNumber(digits);
  }

  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
        <Phone className="size-4" />
        Телефон
      </span>

      <input
        type="hidden"
        name="customerPhone"
        value={internationalPhone}
      />

      <div className="grid grid-cols-[minmax(118px,0.42fr)_minmax(0,1fr)] overflow-hidden rounded-2xl border border-[#d8b66a]/18 bg-black/34 transition duration-300 focus-within:border-[#d8b66a]/60 focus-within:bg-black/48 focus-within:shadow-[0_0_0_3px_rgba(216,182,106,0.08)] sm:grid-cols-[190px_minmax(0,1fr)]">
        <select
          value={countryCode}
          onChange={handleCountryChange}
          aria-label="Страна телефонного номера"
          className="min-w-0 border-r border-[#d8b66a]/18 bg-[#07110f] px-3 py-3 text-sm text-[#f3efe5] outline-none sm:px-4"
        >
          {COUNTRIES.map((country) => (
            <option
              key={country.code}
              value={country.code}
              className="bg-[#07110f] text-[#f3efe5]"
            >
              {country.name} {country.dialCode}
            </option>
          ))}
        </select>

        <div className="flex min-w-0 items-center">
          <span className="shrink-0 pl-3 text-sm font-bold text-[#d8b66a] sm:pl-4">
            {selectedCountry.dialCode}
          </span>

          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            value={localNumber}
            onChange={handlePhoneChange}
            required
            minLength={selectedCountry.localLength}
            maxLength={selectedCountry.localLength}
            pattern={`[0-9]{${selectedCountry.localLength}}`}
            placeholder={selectedCountry.placeholder}
            aria-label="Номер телефона без кода страны"
            aria-invalid={localNumber.length > 0 && !isComplete}
            className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-[#f3efe5] outline-none placeholder:text-[#f3efe5]/34 sm:px-3"
          />
        </div>
      </div>

      <span
        className={`mt-2 block text-xs ${
          localNumber.length > 0 && !isComplete
            ? "text-red-200/80"
            : "text-[#f3efe5]/42"
        }`}
      >
        {localNumber.length > 0 && !isComplete
          ? `Введите ${selectedCountry.localLength} цифр после кода страны`
          : `Номер сохранится в формате ${selectedCountry.dialCode}…`}
      </span>
    </label>
  );
}