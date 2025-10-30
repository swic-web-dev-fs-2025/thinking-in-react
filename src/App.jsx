import { motion } from "motion/react";
import { useState } from "react";

import PRODUCTS from "./db.js";

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-emerald-50 p-8">
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

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-2 border-green-200">
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form className="mb-6">
      <input
        type="text"
        value={filterText}
        placeholder="Search fresh produce..."
        onChange={(e) => onFilterTextChange(e.target.value)}
        className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
      />
      <label className="flex items-center gap-2 mt-4 text-green-800 cursor-pointer">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
          className="w-5 h-5 accent-green-600 cursor-pointer"
        />
        <span className="font-medium">Only show products in stock</span>
      </label>
    </form>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
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
    <table className="w-full">
      <thead>
        <tr className="border-b-2 border-green-200">
          <th className="text-left pb-3 text-green-800 font-semibold">Name</th>
          <th className="text-right pb-3 text-green-800 font-semibold">
            Price
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function ProductCategoryRow({ category }) {
  const emoji = category === "Fruits" ? "🍎" : "🥬";

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
