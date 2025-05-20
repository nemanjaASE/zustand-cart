import type { Product } from "./product";

export type CartProduct = Product & { qty: number };
