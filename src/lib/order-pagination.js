export const ORDERS_PER_PAGE = 6;

export const ORDER_FILTER_IDS = [
  "ACTIVE",
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "CANCELED",
  "ALL",
];

const ORDER_FILTER_ID_SET = new Set(
  ORDER_FILTER_IDS
);

export function readSearchParam(value) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function normalizeOrderFilter(
  value,
  fallback = "ALL"
) {
  const normalizedValue =
    typeof value === "string"
      ? value.toUpperCase()
      : "";

  return ORDER_FILTER_ID_SET.has(
    normalizedValue
  )
    ? normalizedValue
    : fallback;
}

export function normalizePage(value) {
  const normalizedValue = readSearchParam(
    value
  );

  const parsedPage = Number.parseInt(
    normalizedValue || "1",
    10
  );

  if (
    !Number.isFinite(parsedPage) ||
    parsedPage < 1
  ) {
    return 1;
  }

  return parsedPage;
}

export function createOrderFilterCounts(
  groupedCounts
) {
  const countsByStatus =
    Object.fromEntries(
      groupedCounts.map((group) => [
        group.status,
        group._count?._all || 0,
      ])
    );

  const pending =
    countsByStatus.PENDING || 0;

  const processing =
    countsByStatus.PROCESSING || 0;

  const completed =
    countsByStatus.COMPLETED || 0;

  const canceled =
    countsByStatus.CANCELED || 0;

  return {
    ACTIVE: pending + processing,
    PENDING: pending,
    PROCESSING: processing,
    COMPLETED: completed,
    CANCELED: canceled,
    ALL:
      pending +
      processing +
      completed +
      canceled,
  };
}

export function createOrderWhere(
  filter,
  baseWhere = {}
) {
  if (filter === "ACTIVE") {
    return {
      ...baseWhere,
      status: {
        in: [
          "PENDING",
          "PROCESSING",
        ],
      },
    };
  }

  if (filter === "ALL") {
    return baseWhere;
  }

  return {
    ...baseWhere,
    status: filter,
  };
}

export function getTotalPages(
  totalItems
) {
  return Math.max(
    1,
    Math.ceil(
      totalItems / ORDERS_PER_PAGE
    )
  );
}