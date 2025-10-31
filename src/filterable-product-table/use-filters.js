import { useState } from "react";

import { MAX_PRODUCT_PRICE } from "../constants";

export default function useFilters() {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("category");
  const [maxPrice, setMaxPrice] = useState(MAX_PRODUCT_PRICE);

  const clearFilters = () => {
    setFilterText("");
    setInStockOnly(false);
    setSortBy("category");
    setMaxPrice(MAX_PRODUCT_PRICE);
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
