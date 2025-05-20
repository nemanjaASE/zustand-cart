import type { CartProduct } from "@/types/cartProduct";
import type { Product } from "@/types/product";
import type { Store } from "@/types/store";
import type { StateCreator } from "zustand";

type CartState = {
  products: CartProduct[];
  total: number;
};

type CartActions = {
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  incQty: (productId: string) => void;
  decQty: (productId: string) => void;
  getProductById: (productId: string) => CartProduct | undefined;
  reset: () => void;
  setTotal: (total: number) => void;
};

export type CartSlice = CartState & CartActions;

const initialState: CartState = {
  products: [],
  total: 0,
};

export const createCartSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  CartSlice
> = (set, get) => ({
  ...initialState,
  incQty: (productId) =>
    set((state) => {
      const product = state.products.find(
        (product) => product.id === productId
      );
      if (product) {
        product.qty += 1;
      }
    }),
  decQty: (productId) =>
    set((state) => {
      const productIndex = state.products.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        if (state.products[productIndex].qty === 1) {
          state.products.splice(productIndex, 1);
        } else {
          state.products[productIndex].qty -= 1;
        }
      }
    }),
  addProduct: (product) =>
    set((state) => {
      state.products.push({ ...product, qty: 1 });
    }),
  removeProduct: (productId) =>
    set((state) => {
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    }),
  getProductById: (productId) =>
    get().products.find((product) => product.id === productId),
  reset: () => set(() => initialState),
  setTotal: (total) =>
    set((state) => {
      state.total = total;
    }),
});
