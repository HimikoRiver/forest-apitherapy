import Link from "next/link";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth-guards";
import { formatPriceFromKopecks } from "@/lib/money";
import { prisma } from "@/lib/prisma";

const PRODUCT_STATUSES = ["DRAFT", "ACTIVE", "ARCHIVED"];

const productSchema = z.object({
  productId: z.string().trim().optional(),
  title: z.string().trim().min(2),
  slug: z.string().trim().min(2),
  categoryName: z.string().trim().min(2),
  shortDescription: z.string().trim().optional(),
  description: z.string().trim().optional(),
  priceRubles: z.coerce.number().positive(),
  oldPriceRubles: z.coerce.number().positive().optional().or(z.literal("")),
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

async function saveProduct(formData) {
  "use server";

  await requireAdmin();

  const productId = String(formData.get("productId") || "");
  const rawTitle = String(formData.get("title") || "");
  const rawSlug = String(formData.get("slug") || "");
  const rawCategoryName = String(formData.get("categoryName") || "");

  const parsed = productSchema.parse({
    productId: productId || undefined,
    title: rawTitle,
    slug: rawSlug || slugify(rawTitle),
    categoryName: rawCategoryName,
    shortDescription: String(formData.get("shortDescription") || ""),
    description: String(formData.get("description") || ""),
    priceRubles: formData.get("priceRubles"),
    oldPriceRubles: formData.get("oldPriceRubles") || "",
    stock: formData.get("stock"),
    status: formData.get("status"),
    isFeatured: formData.get("isFeatured") === "on",
  });

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

async function updateProductStatus(formData) {
  "use server";

  await requireAdmin();

  const productId = String(formData.get("productId") || "");
  const status = String(formData.get("status") || "");

  if (!PRODUCT_STATUSES.includes(status)) {
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

export default async function AdminProductsPage() {
  await requireAdmin();

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });

  return (
    <main className="min-h-screen bg-[#030b0c] px-4 py-10 text-[#f3efe5]">
      <section className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.42em] text-[#d8b66a]">
              Админка
            </p>

            <h1 className="m-0 text-3xl font-bold tracking-[-0.05em] text-[#f3d98d] md:text-4xl">
              Управление товарами
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f3efe5]/72">
              Здесь можно добавить новый товар, отредактировать существующий или
              скрыть его из публичного каталога.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="inline-flex rounded-2xl border border-[#d8b66a]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d]"
            >
              Назад
            </Link>

            <Link
              href="/products"
              className="inline-flex rounded-2xl border border-[#d8b66a]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d]"
            >
              Каталог
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
          <form
            action={saveProduct}
            className="h-fit rounded-[30px] border border-[#d8b66a]/18 bg-black/28 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)]"
          >
            <h2 className="m-0 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
              Добавить товар
            </h2>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                  Название
                </span>

                <input
                  name="title"
                  required
                  className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                  placeholder="Горный мёд"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                  Slug
                </span>

                <input
                  name="slug"
                  className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                  placeholder="gornyy-med"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                  Категория
                </span>

                <input
                  name="categoryName"
                  required
                  defaultValue="Пчелопродукты"
                  className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                  Краткое описание
                </span>

                <textarea
                  name="shortDescription"
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm leading-6 text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                  placeholder="Короткое описание для карточки"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                  Полное описание
                </span>

                <textarea
                  name="description"
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm leading-6 text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                  placeholder="Описание для будущей страницы товара"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                    Цена ₽
                  </span>

                  <input
                    name="priceRubles"
                    type="number"
                    min="1"
                    step="1"
                    required
                    className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                    placeholder="1200"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                    Старая цена ₽
                  </span>

                  <input
                    name="oldPriceRubles"
                    type="number"
                    min="1"
                    step="1"
                    className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                    placeholder="1500"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                    Остаток
                  </span>

                  <input
                    name="stock"
                    type="number"
                    min="0"
                    step="1"
                    defaultValue="25"
                    required
                    className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                    Статус
                  </span>

                  <select
                    name="status"
                    defaultValue="ACTIVE"
                    className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                  >
                    {PRODUCT_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-[#d8b66a]/14 bg-black/20 px-4 py-3 text-sm text-[#f3efe5]/82">
                <input
                  name="isFeatured"
                  type="checkbox"
                  className="size-4 accent-[#d8b66a]"
                />
                Показывать выше остальных
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl border border-[#d8b66a]/40 bg-[#d8b66a] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#07110f] transition hover:brightness-110"
              >
                Сохранить товар
              </button>
            </div>
          </form>

          <div className="rounded-[30px] border border-[#d8b66a]/18 bg-black/28 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
            <h2 className="m-0 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
              Текущие товары
            </h2>

            {products.length === 0 ? (
              <p className="mt-5 text-sm leading-7 text-[#f3efe5]/72">
                Пока товаров нет.
              </p>
            ) : (
              <div className="mt-5 space-y-4">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="rounded-3xl border border-[#d8b66a]/14 bg-black/22 p-4"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="m-0 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]/76">
                          {product.category?.name || "Без категории"} ·{" "}
                          {product.status}
                          {product.isFeatured ? " · FEATURED" : ""}
                        </p>

                        <h3 className="mt-2 text-lg font-bold tracking-[-0.04em] text-[#f3d98d]">
                          {product.title}
                        </h3>

                        <p className="mt-2 text-sm text-[#f3efe5]/62">
                          /products/{product.slug}
                        </p>
                      </div>

                      <div className="text-left md:text-right">
                        <p className="m-0 text-lg font-bold text-[#d8b66a]">
                          {formatPriceFromKopecks(product.priceKopecks)}
                        </p>

                        <p className="mt-1 text-sm text-[#f3efe5]/60">
                          Остаток: {product.stock}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <form action={updateProductStatus}>
                        <input
                          type="hidden"
                          name="productId"
                          value={product.id}
                        />
                        <input type="hidden" name="status" value="ACTIVE" />

                        <button
                          type="submit"
                          disabled={product.status === "ACTIVE"}
                          className="rounded-2xl border border-[#d8b66a]/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Активировать
                        </button>
                      </form>

                      <form action={updateProductStatus}>
                        <input
                          type="hidden"
                          name="productId"
                          value={product.id}
                        />
                        <input type="hidden" name="status" value="DRAFT" />

                        <button
                          type="submit"
                          disabled={product.status === "DRAFT"}
                          className="rounded-2xl border border-[#d8b66a]/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          В черновик
                        </button>
                      </form>

                      <form action={updateProductStatus}>
                        <input
                          type="hidden"
                          name="productId"
                          value={product.id}
                        />
                        <input type="hidden" name="status" value="ARCHIVED" />

                        <button
                          type="submit"
                          disabled={product.status === "ARCHIVED"}
                          className="rounded-2xl border border-red-400/24 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-100 transition hover:border-red-300/60 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Архивировать
                        </button>
                      </form>
                    </div>

                    <details className="mt-4 rounded-3xl border border-[#d8b66a]/12 bg-black/18 p-4">
                      <summary className="cursor-pointer text-sm font-bold uppercase tracking-[0.2em] text-[#d8b66a]">
                        Редактировать
                      </summary>

                      <form action={saveProduct} className="mt-5 space-y-4">
                        <input
                          type="hidden"
                          name="productId"
                          value={product.id}
                        />

                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="block">
                            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                              Название
                            </span>

                            <input
                              name="title"
                              required
                              defaultValue={product.title}
                              className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                            />
                          </label>

                          <label className="block">
                            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                              Slug
                            </span>

                            <input
                              name="slug"
                              required
                              defaultValue={product.slug}
                              className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                            />
                          </label>
                        </div>

                        <label className="block">
                          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                            Категория
                          </span>

                          <input
                            name="categoryName"
                            required
                            defaultValue={
                              product.category?.name || "Пчелопродукты"
                            }
                            className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                            Краткое описание
                          </span>

                          <textarea
                            name="shortDescription"
                            rows={3}
                            defaultValue={product.shortDescription || ""}
                            className="w-full resize-none rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm leading-6 text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                            Полное описание
                          </span>

                          <textarea
                            name="description"
                            rows={4}
                            defaultValue={product.description || ""}
                            className="w-full resize-none rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm leading-6 text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                          />
                        </label>

                        <div className="grid gap-4 md:grid-cols-4">
                          <label className="block">
                            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                              Цена ₽
                            </span>

                            <input
                              name="priceRubles"
                              type="number"
                              min="1"
                              step="1"
                              required
                              defaultValue={kopecksToRubles(
                                product.priceKopecks
                              )}
                              className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                            />
                          </label>

                          <label className="block">
                            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                              Старая цена ₽
                            </span>

                            <input
                              name="oldPriceRubles"
                              type="number"
                              min="1"
                              step="1"
                              defaultValue={kopecksToRubles(
                                product.oldPriceKopecks
                              )}
                              className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                            />
                          </label>

                          <label className="block">
                            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                              Остаток
                            </span>

                            <input
                              name="stock"
                              type="number"
                              min="0"
                              step="1"
                              required
                              defaultValue={product.stock}
                              className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                            />
                          </label>

                          <label className="block">
                            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                              Статус
                            </span>

                            <select
                              name="status"
                              defaultValue={product.status}
                              className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                            >
                              {PRODUCT_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>

                        <label className="flex items-center gap-3 rounded-2xl border border-[#d8b66a]/14 bg-black/20 px-4 py-3 text-sm text-[#f3efe5]/82">
                          <input
                            name="isFeatured"
                            type="checkbox"
                            defaultChecked={product.isFeatured}
                            className="size-4 accent-[#d8b66a]"
                          />
                          Показывать выше остальных
                        </label>

                        <button
                          type="submit"
                          className="w-full rounded-2xl border border-[#d8b66a]/40 bg-[#d8b66a] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#07110f] transition hover:brightness-110"
                        >
                          Сохранить изменения
                        </button>
                      </form>
                    </details>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}