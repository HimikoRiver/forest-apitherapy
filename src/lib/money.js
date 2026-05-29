export function formatPriceFromKopecks(priceKopecks) {
  const rubles = priceKopecks / 100;

  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(rubles);
}