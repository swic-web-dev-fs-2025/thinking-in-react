import { motion } from "motion/react";
import { useState } from "react";

import PRODUCTS from "./db.js";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 p-8">
      <Header />
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}

function Header() {
  return (
    <motion.header
      className="text-center mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-5xl font-bold text-green-800 mb-2"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 200,
        }}
      >
        <motion.span
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          🤔
        </motion.span>{" "}
        The Thinking{" "}
        <motion.span
          initial={{ opacity: 0, rotate: 20 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          🧑🏾‍🌾
        </motion.span>{" "}
        Farmer's Market
      </motion.h1>

      <motion.div
        className="flex justify-center gap-3 text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, staggerChildren: 0.1 }}
      >
        {["🥕", "🥬", "🍎", "🌽", "🍅"].map((emoji, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            whileHover={{
              scale: 1.3,
              rotate: 15,
              transition: { duration: 0.2 },
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>

      <motion.p
        className="text-emerald-700 mt-4 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Fresh picks from our component garden 🌱
      </motion.p>
    </motion.header>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("category"); // Changed default!
  const [maxPrice, setMaxPrice] = useState(5);

  const clearFilters = () => {
    setFilterText("");
    setInStockOnly(false);
    setSortBy("category");
    setMaxPrice(5);
  };

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
    filterText || inStockOnly || sortBy !== "category" || maxPrice < 5;

  return (
    <form className="mb-6 space-y-4">
      <input
        type="text"
        value={filterText}
        placeholder="Search fresh produce..."
        onChange={(e) => onFilterTextChange(e.target.value)}
        className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-green-800 mb-2">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white cursor-pointer"
          >
            <option value="category">Category</option>
            <option value="name">Name (A-Z)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-green-800 mb-2">
            Max price: ${maxPrice}
          </label>
          <input
            type="range"
            min="1"
            max="5"
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
            onChange={(e) => onInStockOnlyChange(e.target.checked)}
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

function ProductTable({ products, filterText, inStockOnly, sortBy, maxPrice }) {
  const rows = [];
  let lastCategory = null;

  // Filter products
  const filtered = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(filterText.toLowerCase());
    const matchesStock = !inStockOnly || product.stocked;
    const priceNum = Number(product.price.replace("$", ""));
    const matchesPrice = priceNum <= maxPrice;
    return matchesSearch && matchesStock && matchesPrice;
  });

  // Sort products with multi-level sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "category") {
      // First by category, then by name within category
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    // Price sorting
    const priceA = Number(a.price.replace("$", ""));
    const priceB = Number(b.price.replace("$", ""));
    return sortBy === "price-low" ? priceA - priceB : priceB - priceA;
  });

  // Build rows
  sorted.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-green-700">
          Showing <span className="font-bold">{sorted.length}</span> of{" "}
          <span className="font-bold">{products.length}</span> products
        </p>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-4">🥺</p>
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

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

function ProductRow({ product }) {
  const name = product.stocked ? (
    <span className="text-gray-800">{product.name}</span>
  ) : (
    <span className="text-red-500">
      {product.name} <span className="text-sm">(Out of stock)</span>
    </span>
  );

  return (
    <tr className="border-b border-green-100 hover:bg-green-50 transition-colors">
      <td className="py-3">{name}</td>
      <td className="py-3 text-right font-medium text-green-700">
        {product.price}
      </td>
    </tr>
  );
}
