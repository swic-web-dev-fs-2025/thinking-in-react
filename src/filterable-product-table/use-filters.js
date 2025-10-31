import { useState } from "react";

import { maxPrice as maxProductPrice } from "../lib.js";

export default function useFilters() {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("category");
  const [maxPrice, setMaxPrice] = useState(maxProductPrice);

  const clearFilters = () => {
    setFilterText("");
    setInStockOnly(false);
    setSortBy("category");
    setMaxPrice(5);
  };

  return {
    filterText,
    inStockOnly,
    sortBy,
    maxPrice,
    setFilterText,
    setInStockOnly,
    setSortBy,
    setMaxPrice,
    clearFilters,
  };
}
