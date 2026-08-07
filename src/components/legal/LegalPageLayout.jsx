import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Footer from "@/components/home/footer/Footer";
import BeesPageBackground from "@/components/shared/BeesPageBackground";
import { PageLogo } from "@/components/shared/PageLogo";
import { legalLinks } from "@/data/legalLinks";
import {
  LEGAL_DOCUMENT_VERSION,
  LEGAL_UPDATED_AT,
  legalOperator,
  legalOperatorIsComplete,
} from "@/lib/legal/operator";

export function LegalSection({ id, title, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-6 border-b border-[#d8b66a]/10 py-6 first:pt-0 last:border-b-0 last:pb-0 sm:py-7"
    >
      <h2 className="m-0 text-xl font-bold tracking-[-0.04em] text-[#f3d98d] sm:text-2xl">
        {title}
      </h2>

      <div className="mt-4 space-y-4 text-sm leading-7 text-[#f3efe5]/74 sm:text-[0.95rem] sm:leading-8 [&_a]:text-[#d8b66a] [&_a]:underline [&_a]:decoration-[#d8b66a]/30 [&_a]:underline-offset-4 [&_li]:pl-1 [&_strong]:font-bold [&_strong]:text-[#f3efe5]/92 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-[#d8b66a]">
        {children}
      </div>
    </section>
  );
}

function OperatorCard() {
  return (
    <aside className="h-fit rounded-[28px] border border-[#d8b66a]/16 bg-black/28 p-5 shadow-[0_22px_60px_rgba(0,0,0,0.26)] lg:sticky lg:top-5">
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
          <ShieldCheck className="size-5" />
        </div>

        <div>
          <p className="m-0 text-[0.64rem] font-bold uppercase tracking-[0.24em] text-[#d8b66a]/76">
            Оператор сайта
          </p>
          <p className="m-0 mt-1 text-sm font-bold text-[#f3d98d]">
            {legalOperator.status}
          </p>
        </div>
      </div>

      <dl className="mt-5 space-y-3 text-xs leading-6 text-[#f3efe5]/68">
        <div>
          <dt className="text-[#d8b66a]/72">ФИО</dt>
          <dd className="m-0 mt-0.5 break-words text-[#f3efe5]/84">
            {legalOperator.name}
          </dd>
        </div>

        <div>
          <dt className="text-[#d8b66a]/72">ИНН</dt>
          <dd className="m-0 mt-0.5 text-[#f3efe5]/84">
            {legalOperator.inn}
          </dd>
        </div>

        <div>
          <dt className="text-[#d8b66a]/72">ОГРНИП</dt>
          <dd className="m-0 mt-0.5 text-[#f3efe5]/84">
            {legalOperator.ogrnip}
          </dd>
        </div>
      </dl>

      <div className="mt-5 space-y-2 border-t border-[#d8b66a]/10 pt-4">
        <a
          href={`mailto:${legalOperator.email}`}
          className="flex items-center gap-2 text-xs text-[#f3efe5]/68 transition hover:text-[#f3d98d]"
        >
          <Mail className="size-4 shrink-0 text-[#d8b66a]/78" />
          <span className="break-all">{legalOperator.email}</span>
        </a>

        <a
          href="tel:+79667271771"
          className="flex items-center gap-2 text-xs text-[#f3efe5]/68 transition hover:text-[#f3d98d]"
        >
          <Phone className="size-4 shrink-0 text-[#d8b66a]/78" />
          <span>{legalOperator.phone}</span>
        </a>
      </div>

      {!legalOperatorIsComplete && (
        <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/8 px-3 py-3 text-[0.7rem] leading-5 text-amber-100/88">
          Черновик: перед публикацией необходимо добавить ФИО, ИНН и ОГРНИП продавца в переменные окружения.
        </div>
      )}
    </aside>
  );
}

export default function LegalPageLayout({
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-[#030b0c] px-4 pb-10 pt-4 text-[#f3efe5] sm:px-6 sm:pb-12 sm:pt-6 lg:px-8 lg:pb-16 lg:pt-8">
        <BeesPageBackground />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="mb-4 flex items-center justify-between gap-4">
            <PageLogo variant="auth" />

            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-2xl border border-[#d8b66a]/22 bg-black/26 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#d8b66a] transition hover:-translate-y-0.5 hover:border-[#d8b66a]/52 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d]"
            >
              <ArrowLeft className="size-4 transition group-hover:-translate-x-0.5" />
              На главную
            </Link>
          </div>

          <header className="overflow-hidden rounded-[32px] border border-[#d8b66a]/16 bg-[#030b0c]/82 shadow-[0_30px_90px_rgba(0,0,0,0.48)] backdrop-blur-sm sm:rounded-[36px]">
            <div className="relative px-5 py-7 sm:px-7 sm:py-8 lg:px-9 lg:py-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,182,106,0.15),transparent_36%)]" />

              <div className="relative max-w-4xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b66a]/18 bg-black/24 px-4 py-2 text-[0.64rem] font-bold uppercase tracking-[0.26em] text-[#d8b66a]">
                  <FileText className="size-4" />
                  {eyebrow}
                </div>

                <h1 className="m-0 text-3xl font-bold tracking-[-0.055em] text-[#f3d98d] sm:text-4xl lg:text-5xl">
                  {title}
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#f3efe5]/70 sm:text-base sm:leading-8">
                  {description}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.68rem] uppercase tracking-[0.16em] text-[#d8b66a]/66">
                  <span>Версия {LEGAL_DOCUMENT_VERSION}</span>
                  <span>Обновлено: {LEGAL_UPDATED_AT}</span>
                </div>
              </div>
            </div>

            <nav
              aria-label="Юридические документы"
              className="flex flex-wrap gap-2 border-t border-[#d8b66a]/10 px-5 py-4 sm:px-7 lg:px-9"
            >
              {legalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-[#d8b66a]/14 bg-black/22 px-3 py-2 text-xs font-medium text-[#f3efe5]/68 transition hover:border-[#d8b66a]/38 hover:bg-[#d8b66a]/8 hover:text-[#f3d98d]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>

          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
            <article className="rounded-[30px] border border-[#d8b66a]/14 bg-[#030b0c]/82 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-sm sm:p-7 lg:p-8">
              {children}
            </article>

            <OperatorCard />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
