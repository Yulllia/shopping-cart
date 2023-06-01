import { atom } from "recoil";

export const selectedShopState = atom({
  key: "selectedShopState",
  default: 'all',
});
