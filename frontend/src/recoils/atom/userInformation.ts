import { atom } from "recoil";

export const userInformationState = atom({
  key: "userInformationState",
  default: {
    name: "",
    email: "",
    phone: "",
    address: "",
  }
});
