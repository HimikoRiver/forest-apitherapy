import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 as ok`;

    return Response.json({
      ok: true,
      database: "connected",
      result,
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    return Response.json(
      {
        ok: false,
        database: "error",
      },
      {
        status: 500,
      }
    );
  }
}
