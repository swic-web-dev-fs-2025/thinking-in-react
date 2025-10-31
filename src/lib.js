import products from "./db.js";

export const maxPrice = products
  .sort((a, b) => {
    const priceA = parseFloat(a.price.replace("$", ""));
    const priceB = parseFloat(b.price.replace("$", ""));
    return priceB - priceA;
  })[0]
  .price.replace("$", "");
