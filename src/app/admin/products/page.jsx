import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  Archive,
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  LayoutGrid,
  PackageCheck,
  PackagePlus,
  PackageSearch,
  RotateCcw,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";
import { z } from "zod";
import AdminProductEditPanel from "@/components/admin/AdminProductEditPanel";
import { requireAdmin } from "@/lib/auth-guards";
import { formatPriceFromKopecks } from "@/lib/money";
import { prisma } from "@/lib/prisma";
import { saveProductImage } from "@/lib/upload-product-image";

export const runtime = "nodejs";

const PRODUCT_STATUSES = ["DRAFT", "ACTIVE", "ARCHIVED"];
const PRODUCTS_PER_PAGE = 6;

const productSchema = z.object({
  productId: z.string().trim().optional(),
  title: z.string().trim().min(2),
  slug: z.string().trim().min(2),
  categoryName: z.string().trim().min(2),
  shortDescription: z.string().trim().optional(),
  description: z.string().trim().optional(),
  currentImage: z.string().trim().optional(),
  priceRubles: z.coerce.number().positive(),
  oldPriceRubles: z.coerce
    .number()
    .positive()
    .optional()
    .or(z.literal("")),
  stock: z.coerce.number().int().min(0),
  status: z.enum(PRODUCT_STATUSES),
  isFeatured: z.boolean().default(false),
});

function slugify(value) {
  const map = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  };

  return value
    .toLowerCase()
    .split("")
    .map((letter) => map[letter] ?? letter)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function rublesToKopecks(value) {
  return Math.round(Number(value) * 100);
}

function kopecksToRubles(value) {
  if (!value) {
    return "";
  }

  return String(value / 100);
}

function readSearchParam(value) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function normalizePage(value) {
  const parsedPage = Number.parseInt(
    readSearchParam(value) || "1",
    10
  );

  if (!Number.isFinite(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return parsedPage;
}

function createPaginationItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  const items = [1];
  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

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

function createProductsPageHref(page) {
  return `/admin/products?page=${page}#products`;
}

async function persistProduct(formData) {
  await requireAdmin();

  const productId = String(formData.get("productId") || "");
  const rawTitle = String(formData.get("title") || "");
  const rawSlug = String(formData.get("slug") || "");
  const rawCategoryName = String(
    formData.get("categoryName") || ""
  );
  const imageFile = formData.get("imageFile");

  const parsed = productSchema.parse({
    productId: productId || undefined,
    title: rawTitle,
    slug: rawSlug || slugify(rawTitle),
    categoryName: rawCategoryName,
    shortDescription: String(
      formData.get("shortDescription") || ""
    ),
    description: String(formData.get("description") || ""),
    currentImage: String(
      formData.get("currentImage") || ""
    ),
    priceRubles: formData.get("priceRubles"),
    oldPriceRubles: formData.get("oldPriceRubles") || "",
    stock: formData.get("stock"),
    status: formData.get("status"),
    isFeatured: formData.get("isFeatured") === "on",
  });

  const uploadedImage = await saveProductImage(imageFile);
  const image =
    uploadedImage || parsed.currentImage || null;

  const category = await prisma.category.upsert({
    where: {
      slug: slugify(parsed.categoryName),
    },
    update: {
      name: parsed.categoryName,
    },
    create: {
      name: parsed.categoryName,
      slug: slugify(parsed.categoryName),
    },
  });

  const productData = {
    title: parsed.title,
    slug: parsed.slug,
    shortDescription: parsed.shortDescription || null,
    description: parsed.description || null,
    image,
    priceKopecks: rublesToKopecks(parsed.priceRubles),
    oldPriceKopecks: parsed.oldPriceRubles
      ? rublesToKopecks(parsed.oldPriceRubles)
      : null,
    stock: parsed.stock,
    status: parsed.status,
    isFeatured: parsed.isFeatured,
    categoryId: category.id,
  };

  if (parsed.productId) {
    await prisma.product.update({
      where: {
        id: parsed.productId,
      },
      data: productData,
    });
  } else {
    await prisma.product.upsert({
      where: {
        slug: parsed.slug,
      },
      update: productData,
      create: productData,
    });
  }

  revalidatePath("/products");
  revalidatePath("/cart");
  revalidatePath("/checkout");
  revalidatePath("/admin/products");
}

async function saveProduct(formData) {
  "use server";

  await persistProduct(formData);
  redirect("/admin/products?page=1#products");
}

async function updateProduct(_previousState, formData) {
  "use server";

  await persistProduct(formData);

  return {
    ok: true,
    savedAt: Date.now(),
  };
}

async function updateProductStatus(formData) {
  "use server";

  await requireAdmin();

  const productId = String(formData.get("productId") || "");
  const status = String(formData.get("status") || "");

  if (
    !productId ||
    !PRODUCT_STATUSES.includes(status)
  ) {
    return;
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/products");
  revalidatePath("/cart");
  revalidatePath("/checkout");
  revalidatePath("/admin/products");
}

async function deleteProduct(formData) {
  "use server";

  await requireAdmin();

  const productId = String(formData.get("productId") || "");

  if (!productId) {
    return;
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      slug: true,
    },
  });

  if (!product) {
    return;
  }

  await prisma.$transaction([
    prisma.cartItem.deleteMany({
      where: {
        productId,
      },
    }),
    prisma.orderItem.updateMany({
      where: {
        productId,
      },
      data: {
        productId: null,
      },
    }),
    prisma.product.delete({
      where: {
        id: productId,
      },
    }),
  ]);

  revalidatePath("/products");
  revalidatePath(`/products/${product.slug}`);
  revalidatePath("/cart");
  revalidatePath("/checkout");
  revalidatePath("/admin/products");
}

function StatusBadge({ status, isFeatured }) {
  const statusLabels = {
    ACTIVE: "Активен",
    DRAFT: "Черновик",
    ARCHIVED: "Архив",
  };

  return (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex items-center rounded-full border border-[#d8b66a]/18 bg-[#d8b66a]/8 px-3 py-1 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-[#d8b66a]/88">
        {statusLabels[status] || status}
      </span>

      {isFeatured && (
        <span className="inline-flex items-center gap-1 rounded-full border border-[#d8b66a]/18 bg-[#d8b66a]/10 px-3 py-1 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-[#f3d98d]">
          <Sparkles className="size-3" />
          Featured
        </span>
      )}
    </div>
  );
}

function AdminTextField({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
  placeholder,
  min,
  step,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
        {label}
      </span>

      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        min={min}
        step={step}
        className="w-full rounded-2xl border border-[#d8b66a]/14 bg-black/36 px-4 py-3 text-sm text-[#f3efe5] outline-none transition duration-300 placeholder:text-[#f3efe5]/34 focus:border-[#d8b66a]/58 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)]"
      />
    </label>
  );
}

function AdminTextarea({
  label,
  name,
  rows,
  defaultValue,
  placeholder,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
        {label}
      </span>

      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full resize-none rounded-2xl border border-[#d8b66a]/14 bg-black/36 px-4 py-3 text-sm leading-6 text-[#f3efe5] outline-none transition duration-300 placeholder:text-[#f3efe5]/34 focus:border-[#d8b66a]/58 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)]"
      />
    </label>
  );
}

function AdminSelect({
  label,
  name,
  defaultValue,
  options,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
        {label}
      </span>

      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-2xl border border-[#d8b66a]/14 bg-black/36 px-4 py-3 text-sm text-[#f3efe5] outline-none transition duration-300 focus:border-[#d8b66a]/58 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function PrimaryButton({ children }) {
  return (
    <button
      type="submit"
      className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/48 bg-[#d8b66a] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#07110f] shadow-[0_14px_38px_rgba(216,182,106,0.14)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_20px_52px_rgba(216,182,106,0.2)]"
    >
      <Save className="size-4 transition duration-300 group-hover:scale-110" />
      {children}
    </button>
  );
}

function StatusActionButton({
  status,
  currentStatus,
  children,
  icon: Icon,
  danger,
}) {
  return (
    <form action={updateProductStatus}>
      <input
        type="hidden"
        name="status"
        value={status}
      />

      {children.hiddenInput}

      <button
        type="submit"
        disabled={currentStatus === status}
        className={`group inline-flex items-center justify-center gap-2 rounded-2xl border px-3.5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-36 ${
          danger
            ? "border-red-300/22 bg-red-950/10 text-red-100 hover:border-red-300/56 hover:bg-red-400/10"
            : "border-[#d8b66a]/20 bg-black/22 text-[#d8b66a] hover:border-[#d8b66a]/55 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d]"
        }`}
      >
        <Icon className="size-4 transition duration-300 group-hover:scale-110" />
        {children.label}
      </button>
    </form>
  );
}

function DeleteProductBlock({ productId }) {
  return (
    <details className="mt-4 rounded-[24px] border border-red-300/12 bg-red-950/5 p-4 transition open:border-red-300/30 open:bg-red-950/10">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-100/86 transition hover:text-red-100">
        <Trash2 className="size-4" />
        Удалить товар
      </summary>

      <form
        action={deleteProduct}
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <input
          type="hidden"
          name="productId"
          value={productId}
        />

        <p className="m-0 max-w-xl text-sm leading-6 text-[#f3efe5]/62">
          Это действие полностью удалит товар из базы и
          очистит его из корзин. В старых заказах сохранится
          текстовая история товара.
        </p>

        <button
          type="submit"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-red-300/34 bg-red-950/18 px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-red-100 transition duration-300 hover:-translate-y-0.5 hover:border-red-300/70 hover:bg-red-500/16"
        >
          <Trash2 className="size-4 transition duration-300 group-hover:scale-110" />
          Да, удалить
        </button>
      </form>
    </details>
  );
}

function ProductsPagination({
  currentPage,
  totalPages,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const paginationItems = createPaginationItems(
    currentPage,
    totalPages
  );

  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(
    totalPages,
    currentPage + 1
  );

  const baseButtonClassName =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-xs font-bold transition duration-300";

  return (
    <nav
      aria-label="Страницы товаров"
      className="mt-5 flex flex-wrap items-center justify-center gap-2 border-t border-[#d8b66a]/10 pt-5"
    >
      {currentPage > 1 ? (
        <Link
          href={createProductsPageHref(previousPage)}
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

      {paginationItems.map((item) => {
        if (typeof item === "string") {
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
            href={createProductsPageHref(item)}
            prefetch={false}
            aria-label={`Страница ${item}`}
            className={`${baseButtonClassName} border-[#d8b66a]/16 bg-black/22 text-[#f3efe5]/58 hover:border-[#d8b66a]/44 hover:bg-[#d8b66a]/8 hover:text-[#f3d98d]`}
          >
            {item}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={createProductsPageHref(nextPage)}
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

export default async function AdminProductsPage({
  searchParams,
}) {
  await requireAdmin();

  const resolvedSearchParams = await searchParams;
  const requestedPage = normalizePage(
    resolvedSearchParams?.page
  );

  const totalProducts =
    await prisma.product.count();

  const totalPages = Math.max(
    1,
    Math.ceil(
      totalProducts / PRODUCTS_PER_PAGE
    )
  );

  const currentPage = Math.min(
    requestedPage,
    totalPages
  );

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip:
      (currentPage - 1) *
      PRODUCTS_PER_PAGE,
    take: PRODUCTS_PER_PAGE,
    include: {
      category: true,
    },
  });

  return (
    <main className="min-h-screen px-4 py-8 text-[#f3efe5] sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-7xl">
        <div className="mb-6 overflow-hidden rounded-[34px] border border-[#d8b66a]/16 bg-[#030b0c]/72 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
          <div className="relative px-5 py-7 sm:px-7 lg:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,182,106,0.14),transparent_34%)]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b66a]/18 bg-black/24 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]">
                  <PackageSearch className="size-4" />
                  Административная панель
                </div>

                <h1 className="m-0 max-w-3xl text-3xl font-bold tracking-[-0.06em] text-[#f3d98d] sm:text-4xl lg:text-5xl">
                  Управление товарами
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f3efe5]/72 sm:text-base">
                  Добавляйте товары, загружайте фото,
                  обновляйте остатки и управляйте
                  видимостью в каталоге.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/admin"
                  className="group inline-flex items-center gap-2 rounded-2xl border border-[#d8b66a]/24 bg-black/24 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/60 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d] hover:shadow-[0_12px_34px_rgba(216,182,106,0.12)]"
                >
                  <ArrowLeft className="size-4 transition group-hover:-translate-x-0.5" />
                  Назад
                </Link>

                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 rounded-2xl border border-[#d8b66a]/24 bg-black/24 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/60 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d] hover:shadow-[0_12px_34px_rgba(216,182,106,0.12)]"
                >
                  <LayoutGrid className="size-4 transition group-hover:scale-110" />
                  Каталог
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
          <form
            action={saveProduct}
            className="h-fit overflow-hidden rounded-[32px] border border-[#d8b66a]/16 bg-[#030b0c]/76 shadow-[0_24px_70px_rgba(0,0,0,0.44)]"
          >
            <div className="border-b border-[#d8b66a]/12 px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                  <PackagePlus className="size-5" />
                </div>

                <div>
                  <p className="m-0 text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[#d8b66a]/78">
                    Новый товар
                  </p>

                  <h2 className="m-0 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                    Добавить товар
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <AdminTextField
                label="Название"
                name="title"
                required
                placeholder="Горный мёд"
              />

              <AdminTextField
                label="Slug"
                name="slug"
                placeholder="gornyy-med"
              />

              <AdminTextField
                label="Категория"
                name="categoryName"
                required
                defaultValue="Пчелопродукты"
              />

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                  <ImagePlus className="size-4" />
                  Фото товара
                </span>

                <input
                  name="imageFile"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="w-full rounded-2xl border border-[#d8b66a]/14 bg-black/36 px-4 py-3 text-sm text-[#f3efe5] transition file:mr-4 file:rounded-xl file:border-0 file:bg-[#d8b66a] file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-[0.16em] file:text-[#07110f] hover:border-[#d8b66a]/38"
                />
              </label>

              <AdminTextarea
                label="Краткое описание"
                name="shortDescription"
                rows={3}
                placeholder="Короткое описание для карточки"
              />

              <AdminTextarea
                label="Полное описание"
                name="description"
                rows={4}
                placeholder="Описание для будущей страницы товара"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <AdminTextField
                  label="Цена ₽"
                  name="priceRubles"
                  type="number"
                  min="1"
                  step="1"
                  required
                  placeholder="1200"
                />

                <AdminTextField
                  label="Старая цена ₽"
                  name="oldPriceRubles"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="1500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <AdminTextField
                  label="Остаток"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  required
                  defaultValue="25"
                />

                <AdminSelect
                  label="Статус"
                  name="status"
                  defaultValue="ACTIVE"
                  options={PRODUCT_STATUSES}
                />
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-[#d8b66a]/12 bg-black/22 px-4 py-3 text-sm text-[#f3efe5]/82 transition hover:border-[#d8b66a]/30 hover:bg-black/32">
                <input
                  name="isFeatured"
                  type="checkbox"
                  className="size-4 accent-[#d8b66a]"
                />
                Показывать выше остальных
              </label>

              <PrimaryButton>
                Сохранить товар
              </PrimaryButton>
            </div>
          </form>

          <div
            id="products"
            className="scroll-mt-24 overflow-hidden rounded-[32px] border border-[#d8b66a]/16 bg-[#030b0c]/76 shadow-[0_24px_70px_rgba(0,0,0,0.44)]"
          >
            <div className="border-b border-[#d8b66a]/12 px-5 py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                    <PackageCheck className="size-5" />
                  </div>

                  <div>
                    <p className="m-0 text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[#d8b66a]/78">
                      Каталог
                    </p>

                    <h2 className="m-0 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                      Текущие товары
                    </h2>
                  </div>
                </div>

                <p className="m-0 rounded-full border border-[#d8b66a]/14 bg-black/22 px-3 py-1 text-xs text-[#f3efe5]/58">
                  На странице: {products.length} из{" "}
                  {totalProducts}
                </p>
              </div>
            </div>

            {totalProducts === 0 ? (
              <p className="p-5 text-sm leading-7 text-[#f3efe5]/72">
                Пока товаров нет.
              </p>
            ) : (
              <div className="space-y-4 p-5">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="group rounded-[28px] border border-[#d8b66a]/12 bg-black/24 p-4 transition duration-300 hover:border-[#d8b66a]/30 hover:bg-black/32 hover:shadow-[0_20px_54px_rgba(0,0,0,0.28)]"
                  >
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <div className="flex min-w-0 gap-4">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={84}
                            height={84}
                            unoptimized={product.image.startsWith(
                              "/uploads/products/"
                            )}
                            className="h-20 w-20 shrink-0 rounded-2xl border border-[#d8b66a]/12 object-cover"
                          />
                        ) : (
                          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#d8b66a]/12 bg-black/28 text-center text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#f3efe5]/36">
                            Без фото
                          </div>
                        )}

                        <div className="min-w-0">
                          <StatusBadge
                            status={product.status}
                            isFeatured={
                              product.isFeatured
                            }
                          />

                          <h3 className="mt-3 text-lg font-bold tracking-[-0.04em] text-[#f3d98d]">
                            {product.title}
                          </h3>

                          <p className="mt-2 truncate text-sm text-[#f3efe5]/58">
                            /products/{product.slug}
                          </p>

                          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#d8b66a]/58">
                            {product.category?.name ||
                              "Без категории"}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-left xl:text-right">
                        <p className="m-0 text-xl font-bold text-[#d8b66a]">
                          {formatPriceFromKopecks(
                            product.priceKopecks
                          )}
                        </p>

                        {product.oldPriceKopecks && (
                          <p className="mt-1 text-sm text-[#f3efe5]/38 line-through">
                            {formatPriceFromKopecks(
                              product.oldPriceKopecks
                            )}
                          </p>
                        )}

                        <p className="mt-2 text-sm text-[#f3efe5]/62">
                          Остаток: {product.stock}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2.5">
                      <StatusActionButton
                        status="ACTIVE"
                        currentStatus={product.status}
                        icon={CheckCircle2}
                      >
                        {{
                          label: "Активировать",
                          hiddenInput: (
                            <input
                              type="hidden"
                              name="productId"
                              value={product.id}
                            />
                          ),
                        }}
                      </StatusActionButton>

                      <StatusActionButton
                        status="DRAFT"
                        currentStatus={product.status}
                        icon={RotateCcw}
                      >
                        {{
                          label: "В черновик",
                          hiddenInput: (
                            <input
                              type="hidden"
                              name="productId"
                              value={product.id}
                            />
                          ),
                        }}
                      </StatusActionButton>

                      <StatusActionButton
                        status="ARCHIVED"
                        currentStatus={product.status}
                        icon={Archive}
                        danger
                      >
                        {{
                          label: "Архивировать",
                          hiddenInput: (
                            <input
                              type="hidden"
                              name="productId"
                              value={product.id}
                            />
                          ),
                        }}
                      </StatusActionButton>
                    </div>

                    <DeleteProductBlock
                      productId={product.id}
                    />

                    <AdminProductEditPanel
                      action={updateProduct}
                    >
                      <input
                        type="hidden"
                        name="productId"
                        value={product.id}
                      />

                      <input
                        type="hidden"
                        name="currentImage"
                        value={product.image || ""}
                      />

                      <div className="grid gap-4 md:grid-cols-2">
                        <AdminTextField
                          label="Название"
                          name="title"
                          required
                          defaultValue={product.title}
                        />

                        <AdminTextField
                          label="Slug"
                          name="slug"
                          required
                          defaultValue={product.slug}
                        />
                      </div>

                      <AdminTextField
                        label="Категория"
                        name="categoryName"
                        required
                        defaultValue={
                          product.category?.name ||
                          "Пчелопродукты"
                        }
                      />

                      <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                          <ImagePlus className="size-4" />
                          Новое фото товара
                        </span>

                        <input
                          name="imageFile"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="w-full rounded-2xl border border-[#d8b66a]/14 bg-black/36 px-4 py-3 text-sm text-[#f3efe5] transition file:mr-4 file:rounded-xl file:border-0 file:bg-[#d8b66a] file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-[0.16em] file:text-[#07110f] hover:border-[#d8b66a]/38"
                        />

                        {product.image && (
                          <span className="mt-2 block text-xs text-[#f3efe5]/46">
                            Текущее фото сохранится, если
                            не выбрать новое.
                          </span>
                        )}
                      </label>

                      <AdminTextarea
                        label="Краткое описание"
                        name="shortDescription"
                        rows={3}
                        defaultValue={
                          product.shortDescription || ""
                        }
                      />

                      <AdminTextarea
                        label="Полное описание"
                        name="description"
                        rows={4}
                        defaultValue={
                          product.description || ""
                        }
                      />

                      <div className="grid gap-4 md:grid-cols-4">
                        <AdminTextField
                          label="Цена ₽"
                          name="priceRubles"
                          type="number"
                          min="1"
                          step="1"
                          required
                          defaultValue={kopecksToRubles(
                            product.priceKopecks
                          )}
                        />

                        <AdminTextField
                          label="Старая цена ₽"
                          name="oldPriceRubles"
                          type="number"
                          min="1"
                          step="1"
                          defaultValue={kopecksToRubles(
                            product.oldPriceKopecks
                          )}
                        />

                        <AdminTextField
                          label="Остаток"
                          name="stock"
                          type="number"
                          min="0"
                          step="1"
                          required
                          defaultValue={product.stock}
                        />

                        <AdminSelect
                          label="Статус"
                          name="status"
                          defaultValue={product.status}
                          options={PRODUCT_STATUSES}
                        />
                      </div>

                      <label className="flex items-center gap-3 rounded-2xl border border-[#d8b66a]/12 bg-black/22 px-4 py-3 text-sm text-[#f3efe5]/82 transition hover:border-[#d8b66a]/30 hover:bg-black/32">
                        <input
                          name="isFeatured"
                          type="checkbox"
                          defaultChecked={
                            product.isFeatured
                          }
                          className="size-4 accent-[#d8b66a]"
                        />
                        Показывать выше остальных
                      </label>
                    </AdminProductEditPanel>
                  </article>
                ))}

                <ProductsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}