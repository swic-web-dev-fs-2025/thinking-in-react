/**
 * @param {string} searchQuery
 * @param {boolean} inStockOnly
 * @param {number} maxPrice
 * @param {number} maxProductPrice
 * @returns {string}
 */
export const generateEmptyProductMessage = (
  searchQuery,
  inStockOnly,
  maxPrice,
  maxProductPrice
) => {
  const conditions = [
    searchQuery && `matching "${searchQuery}"`,
    inStockOnly && "in stock",
    maxPrice < maxProductPrice && `under $${maxPrice}`,
  ].filter(Boolean);

  if (!conditions.length) return "No products found";
  if (conditions.length === 1) return `No products ${conditions[0]}`;

  return `No products ${conditions.slice(0, -1).join(", ")} and ${
    conditions[conditions.length - 1]
  }`;
};

export const parsePrice = (priceString) => Number(priceString.replace("$", ""));
