import products from "./db.js";
import { parsePrice } from "./lib.js";

export const MAX_PRODUCT_PRICE = Math.max(
  ...products.map((p) => parsePrice(p.price))
);
