import { motion } from "motion/react";

import PRODUCTS from "./db.js";
import FilterableProductTable from "./filterable-product-table";

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
