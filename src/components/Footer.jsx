import Image from "next/image";

const navItems = [
  { label: "Главная", href: "/#home" },
  { label: "О специалисте", href: "/#about" },
  { label: "Услуги", href: "/#services" },
  { label: "Пчелопродукты", href: "/#products" },
  { label: "Контакты", href: "/#contacts" },
];

const contacts = [
  { label: "Телефон", value: "+7 (___) ___-__-__", href: "tel:+7" },
  { label: "WhatsApp", value: "Написать в WhatsApp", href: "#" },
  { label: "Telegram", value: "Открыть Telegram", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-black text-[#f3efe5]">
      <div
        data-menu-hide-start
        aria-hidden="true"
        className="pointer-events-none absolute -top-64 left-0 h-px w-px"
      />

      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: "url('/textures/suede-green.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.66)_52%,#000_100%)]" />

      <div className="relative mx-auto w-full max-w-[1600px] px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
        <div className="grid w-full gap-12 lg:grid-cols-[1.25fr_0.75fr_0.75fr]">
          <div className="max-w-xl">
            <div className="flex items-center gap-5">
              <div className="relative h-32 w-32 shrink-0 sm:h-40 sm:w-40">
                <Image
                  src="/images/logo.webp"
                  alt="APIDARB"
                  fill
                  sizes="(max-width: 640px) 128px, 160px"
                  className="object-contain"
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#d8b66a]">
                  APIDARB
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#f6e7bd] sm:text-3xl">
                  Центр апитерапии
                </h2>
              </div>
            </div>
          </div>

          <nav aria-label="Навигация по сайту">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#d8b66a]">
              Разделы
            </h3>

            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-3 text-sm text-[#eee4cc]/82 transition hover:text-[#f6d98d]"
                  >
                    <span className="size-1.5 rounded-full bg-[#d8b66a]/65 transition group-hover:bg-[#f6d98d]" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#d8b66a]">
              Связь
            </h3>

            <ul className="space-y-4">
              {contacts.map((item) => (
                <li key={item.label}>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#9d927c]">
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    className="mt-1 inline-block text-sm text-[#eee4cc]/86 transition hover:text-[#f6d98d]"
                  >
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-[#d8b66a]/45 to-transparent" />

        <div className="flex w-full flex-col gap-4 text-xs text-[#a79d88] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} APIDARB. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}