import type { Store } from "@/types/store";
import type { StateCreator } from "zustand";

type UserState = {
  userName: string;
  fullName: string;
  age: number;
  address: string;
};

type UserAction = {
  setAddress: (address: string) => void;
  fetchUser: () => Promise<void>;
};

export type UserSlice = UserState & UserAction;

export const createUserSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  address: "",
  age: 0,
  fullName: "",
  userName: "",
  setAddress: (address) =>
    set((state) => {
      state.address = address;
    }),
  fetchUser: async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    set({
      address: "",
      fullName: "John Doe",
      userName: "JohnDoe@test.com",
      age: 20,
    });
  },
});
