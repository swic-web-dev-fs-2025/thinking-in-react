import { MAX_PRODUCT_PRICE } from "../constants";
import { generateEmptyProductMessage, parsePrice } from "../lib";
import useFilters from "./use-filters";

/**
 * @param {{name: string, price: string, category: string, stocked: boolean}[]} products
 */
export default function FilterableProductTable({ products }) {
  const {
    filterText,
    inStockOnly,
    sortBy,
    maxPrice,
    setFilterText,
    setInStockOnly,
    setSortBy,
    setMaxPrice,
    clearFilters,
  } = useFilters();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-2 border-green-200">
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        sortBy={sortBy}
        maxPrice={maxPrice}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
        onSortByChange={setSortBy}
        onMaxPriceChange={setMaxPrice}
        onClearFilters={clearFilters}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
        sortBy={sortBy}
        maxPrice={maxPrice}
      />
    </div>
  );
}

/**
 * Renders a downward-pointing chevron SVG icon.
 * Commonly used for dropdown or disclosure indicators.
 *
 * It's taken from https://heroicons.com/
 */
function ChevronDownIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

/**
 * @param {string} category
 */
function ProductCategoryRow({ category }) {
  const categoryEmojis = {
    Fruits: "🍎",
    Vegetables: "🥬",
    Herbs: "🌿",
  };

  const emoji = categoryEmojis[category] || "📦";

  return (
    <tr>
      <th
        colSpan="2"
        className="pt-6 pb-2 text-left text-lg font-bold text-green-700"
      >
        {emoji} {category}
      </th>
    </tr>
  );
}

/**
 * @param {{name: string, price: string, category: string, stocked: boolean}} product
 */
function ProductRow({ product }) {
  return (
    <tr className="border-b border-green-100 hover:bg-green-50 transition-colors">
      <td className="py-3">
        {product.stocked ? (
          <span className="text-gray-800">{product.name}</span>
        ) : (
          <span className="text-red-500">
            {product.name} <span className="text-sm">(Out of stock)</span>
          </span>
        )}
      </td>
      <td className="py-3 text-right font-medium text-green-700">
        {product.price}
      </td>
    </tr>
  );
}

/**
 * @param {{name: string, price: string, category: string, stocked: boolean}[]} products
 * @param {string} filterText
 * @param {boolean} inStockOnly
 * @param {string} sortBy
 * @param {number} maxPrice
 */
function ProductTable({ products, filterText, inStockOnly, sortBy, maxPrice }) {
  const filteredAndSorted = products
    .filter((product) => {
      const matchesPrice = parsePrice(product.price) <= maxPrice;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(filterText.toLowerCase());
      const matchesStock = !inStockOnly || product.stocked;

      return matchesSearch && matchesStock && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "category")
        // First by category, then by name within category
        return a.category !== b.category
          ? a.category.localeCompare(b.category)
          : a.name.localeCompare(b.name);

      if (sortBy === "name") return a.name.localeCompare(b.name);

      // Price sorting
      const priceA = parsePrice(a.price);
      const priceB = parsePrice(b.price);
      return sortBy === "price-low" ? priceA - priceB : priceB - priceA;
    });

  /**
   * Using `flatMap` to insert category headers.
   *
   * For each product, we check if it's the first product or if its category
   * differs from the previous product's category. If so, we insert a
   * `ProductCategoryRow` before the `ProductRow`. Otherwise, we just insert
   * the `ProductRow`.
   */
  const rows = filteredAndSorted.flatMap((product, index, products) => {
    const prevProduct = products[index - 1];

    return !prevProduct || product.category !== prevProduct.category
      ? [
          <ProductCategoryRow
            category={product.category}
            key={`${product.category}-${index}`}
          />,
          <ProductRow product={product} key={product.name} />,
        ]
      : [<ProductRow product={product} key={product.name} />];
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-green-700">
          Showing <span className="font-bold">{filteredAndSorted.length}</span>{" "}
          of <span className="font-bold">{products.length}</span> products
        </p>
      </div>

      {filteredAndSorted.length ? (
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-green-200">
              <th className="text-left pb-3 text-green-800 font-semibold">
                Name
              </th>
              <th className="text-right pb-3 text-green-800 font-semibold">
                Price
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-4">🥺</p>
          <p className="text-lg font-medium">
            {generateEmptyProductMessage(
              filterText,
              inStockOnly,
              maxPrice,
              MAX_PRODUCT_PRICE
            )}
          </p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}

/**
 * @param {string} filterText
 * @param {boolean} inStockOnly
 * @param {string} sortBy
 * @param {number} maxPrice
 * @param {(text: string) => void} onFilterTextChange
 * @param {(checked: boolean) => void} onInStockOnlyChange
 * @param {(sort: string) => void} onSortByChange
 * @param {(price: number) => void} onMaxPriceChange
 * @param {() => void} onClearFilters
 */
function SearchBar({
  filterText,
  inStockOnly,
  sortBy,
  maxPrice,
  onFilterTextChange,
  onInStockOnlyChange,
  onSortByChange,
  onMaxPriceChange,
  onClearFilters,
}) {
  const hasActiveFilters =
    filterText ||
    inStockOnly ||
    sortBy !== "category" ||
    maxPrice < MAX_PRODUCT_PRICE;

  return (
    <form className="mb-6 space-y-4">
      <label htmlFor="search-input" className="sr-only">
        Search products
      </label>
      <input
        id="search-input"
        type="search"
        value={filterText}
        placeholder="Search fresh produce..."
        onChange={(e) => {
          onFilterTextChange(e.target.value);
        }}
        className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <select
            id="sort-by-select"
            value={sortBy}
            onChange={(e) => {
              onSortByChange(e.target.value);
            }}
            className="w-full pl-4 pr-10 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white cursor-pointer appearance-none"
          >
            <option value="category">Category</option>
            <option value="name">Name (A-Z)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/4  w-5 h-5 text-green-600 pointer-events-none" />
        </div>

        <div>
          <label
            htmlFor="price-slider"
            className="block text-sm font-medium text-green-800 mb-2"
          >
            Max price: ${maxPrice}
          </label>
          <input
            id="price-slider"
            type="range"
            min="1"
            max={MAX_PRODUCT_PRICE}
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-green-800 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => {
              onInStockOnlyChange(e.target.checked);
            }}
            className="w-5 h-5 accent-green-600 cursor-pointer"
          />
          <span className="font-medium">Only show in stock</span>
        </label>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="px-4 py-2 text-sm font-medium text-green-700 hover:text-green-900 hover:bg-green-100 rounded-lg transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
    </form>
  );
}
