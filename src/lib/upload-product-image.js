import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function saveProductImage(file) {
  if (!file || file.size === 0) {
    return null;
  }

  const extension = ALLOWED_IMAGE_TYPES[file.type];

  if (!extension) {
    throw new Error("Поддерживаются только изображения JPG, PNG и WebP.");
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Изображение должно быть меньше 5 МБ.");
  }

  const uploadsDirectory = path.join(
    process.cwd(),
    "public",
    "uploads",
    "products"
  );

  await mkdir(uploadsDirectory, {
    recursive: true,
  });

  const fileName = `${randomUUID()}.${extension}`;
  const filePath = path.join(uploadsDirectory, fileName);

  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(filePath, buffer);

  return `/uploads/products/${fileName}`;
}