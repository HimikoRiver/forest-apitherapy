import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function createPaginationItems(
  currentPage,
  totalPages
) {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  const items = [1];

  const startPage = Math.max(
    2,
    currentPage - 1
  );

  const endPage = Math.min(
    totalPages - 1,
    currentPage + 1
  );

  if (startPage > 2) {
    items.push("start-ellipsis");
  }

  for (
    let page = startPage;
    page <= endPage;
    page += 1
  ) {
    items.push(page);
  }

  if (endPage < totalPages - 1) {
    items.push("end-ellipsis");
  }

  items.push(totalPages);

  return items;
}

function createPageHref({
  basePath,
  activeFilter,
  page,
  anchorId,
}) {
  const searchParams =
    new URLSearchParams({
      status: activeFilter,
      page: String(page),
    });

  const anchor = anchorId
    ? `#${anchorId}`
    : "";

  return `${basePath}?${searchParams.toString()}${anchor}`;
}

export default function OrdersPagination({
  basePath,
  activeFilter,
  currentPage,
  totalPages,
  anchorId = "orders",
}) {
  if (totalPages <= 1) {
    return null;
  }

  const paginationItems =
    createPaginationItems(
      currentPage,
      totalPages
    );

  const previousPage = Math.max(
    1,
    currentPage - 1
  );

  const nextPage = Math.min(
    totalPages,
    currentPage + 1
  );

  const baseButtonClassName =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-xs font-bold transition duration-300";

  return (
    <nav
      aria-label="Страницы заказов"
      className="mt-5 flex flex-wrap items-center justify-center gap-2 border-t border-[#d8b66a]/10 pt-5"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageHref({
            basePath,
            activeFilter,
            page: previousPage,
            anchorId,
          })}
          scroll={false}
          prefetch={false}
          aria-label="Предыдущая страница"
          className={`${baseButtonClassName} gap-1.5 border-[#d8b66a]/18 bg-black/24 text-[#d8b66a] hover:border-[#d8b66a]/52 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d]`}
        >
          <ChevronLeft className="size-4" />

          <span className="hidden sm:inline">
            Назад
          </span>
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={`${baseButtonClassName} cursor-not-allowed gap-1.5 border-[#d8b66a]/8 bg-black/12 text-[#f3efe5]/20`}
        >
          <ChevronLeft className="size-4" />

          <span className="hidden sm:inline">
            Назад
          </span>
        </span>
      )}

      {paginationItems.map(
        (item) => {
          if (
            typeof item === "string"
          ) {
            return (
              <span
                key={item}
                aria-hidden="true"
                className="flex h-10 min-w-8 items-center justify-center text-sm text-[#d8b66a]/48"
              >
                …
              </span>
            );
          }

          const isCurrentPage =
            item === currentPage;

          if (isCurrentPage) {
            return (
              <span
                key={item}
                aria-current="page"
                className={`${baseButtonClassName} border-[#d8b66a]/58 bg-[#d8b66a] text-[#07110f] shadow-[0_10px_28px_rgba(216,182,106,0.14)]`}
              >
                {item}
              </span>
            );
          }

          return (
            <Link
              key={item}
              href={createPageHref({
                basePath,
                activeFilter,
                page: item,
                anchorId,
              })}
              scroll={false}
              prefetch={false}
              aria-label={`Страница ${item}`}
              className={`${baseButtonClassName} border-[#d8b66a]/16 bg-black/22 text-[#f3efe5]/58 hover:border-[#d8b66a]/44 hover:bg-[#d8b66a]/8 hover:text-[#f3d98d]`}
            >
              {item}
            </Link>
          );
        }
      )}

      {currentPage < totalPages ? (
        <Link
          href={createPageHref({
            basePath,
            activeFilter,
            page: nextPage,
            anchorId,
          })}
          scroll={false}
          prefetch={false}
          aria-label="Следующая страница"
          className={`${baseButtonClassName} gap-1.5 border-[#d8b66a]/18 bg-black/24 text-[#d8b66a] hover:border-[#d8b66a]/52 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d]`}
        >
          <span className="hidden sm:inline">
            Далее
          </span>

          <ChevronRight className="size-4" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={`${baseButtonClassName} cursor-not-allowed gap-1.5 border-[#d8b66a]/8 bg-black/12 text-[#f3efe5]/20`}
        >
          <span className="hidden sm:inline">
            Далее
          </span>

          <ChevronRight className="size-4" />
        </span>
      )}
    </nav>
  );
}