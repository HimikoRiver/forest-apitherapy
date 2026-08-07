import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function hasBytes(buffer, offset, bytes) {
  if (buffer.length < offset + bytes.length) {
    return false;
  }

  return bytes.every(
    (byte, index) => buffer[offset + index] === byte
  );
}

function isJpeg(buffer) {
  return (
    hasBytes(buffer, 0, [0xff, 0xd8, 0xff]) &&
    buffer.length >= 4 &&
    buffer[buffer.length - 2] === 0xff &&
    buffer[buffer.length - 1] === 0xd9
  );
}

function isPng(buffer) {
  return hasBytes(buffer, 0, [
    0x89,
    0x50,
    0x4e,
    0x47,
    0x0d,
    0x0a,
    0x1a,
    0x0a,
  ]);
}

function isWebp(buffer) {
  return (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  );
}

function matchesDeclaredImageType(buffer, mimeType) {
  switch (mimeType) {
    case "image/jpeg":
      return isJpeg(buffer);
    case "image/png":
      return isPng(buffer);
    case "image/webp":
      return isWebp(buffer);
    default:
      return false;
  }
}

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

  const buffer = Buffer.from(await file.arrayBuffer());

  if (
    buffer.length === 0 ||
    buffer.length > MAX_IMAGE_SIZE_BYTES ||
    !matchesDeclaredImageType(buffer, file.type)
  ) {
    throw new Error(
      "Содержимое файла не соответствует допустимому формату изображения."
    );
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

  await writeFile(filePath, buffer, {
    flag: "wx",
    mode: 0o644,
  });

  return `/uploads/products/${fileName}`;
}
