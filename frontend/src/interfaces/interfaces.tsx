import { FormInstance } from "antd";
import { Dispatch, SetStateAction } from "react";


export interface ICard {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  countInStock: number;
  imageUrl: string;
  shopName: string;
  qty?: number;
  productId: string | undefined;
  addedCart?: boolean;
  index?: number;
}
export interface CardI {
  product: ICard;
}
export interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  orders: Array<ICard>;
  total: number;
  countOrders: number;
  userInformation: User;
}

export interface IShop {
  name: string;
  // other properties of IShop
}

export interface ICart {
  item: ICard;
}

export interface Products {
  products: Array<ICard>;
  shops: Array<string>;
}
interface Coordinate {
  lat: number;
  lng: number;
}
export interface FormValues {
  name: string;
  address: string;
  phone:string;
  email: string;
}

export interface UserForm {
  form: FormInstance<FormValues>,
  address: string,
  setSelected:Dispatch<SetStateAction<Coordinate>>,
}


export interface GoogleMapsI {
  selected: Coordinate,
  setAddress: Dispatch<SetStateAction<string>>
}

export interface AutoCompleteI {
  setSelected:Dispatch<SetStateAction<Coordinate>>,
  handleInputChange: (e: { target: { name: string; value: string; }; }) => Promise<void>,
  address: string
}
