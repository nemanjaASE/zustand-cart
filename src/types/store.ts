import type { CartSlice } from "@/store/cart-slice";
import type { UserSlice } from "@/store/user-slice";

export type Store = UserSlice & CartSlice;
