import "./ShoppingCart.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICard } from "../../interfaces/interfaces";
import CartItem from "../../components/cartItem/CartItem";
import { fetchCarts } from "../../fetchApi/fetchCart";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { deletedCartItem } from "../../recoils/atom/deletedCartItem";
import { countCartItem } from "../../recoils/atom/countCartItem";
import UserPersonaInfo from "../../components/userInfo/UserPersonaInfo";
import { userInformationState } from "../../recoils/atom/userInformation";
import { useForm } from "antd/es/form/Form";
import { notification } from "antd";
import { fetchSaveOrder } from "../../fetchApi/fetchSaveOrder";
import GoogleMaps from "../../components/googleMaps/GoogleMaps";
import { useJsApiLoader } from "@react-google-maps/api";

const API = process.env.REACT_APP_API_KEY;

const ShoppingCart = () => {
  const [shopping, setShopping] = useState<Array<ICard>>([]);
  const countCart = useRecoilValue(countCartItem);
  const deletedCart = useRecoilValue(deletedCartItem);
  const userInfo = useRecoilValue(userInformationState);
  const [form] = useForm();
  const [selected, setSelected] = useState({ lat: 49, lng: 24 });
  const [address, setAddress] = useState<string>("");
  const setFormValues = useSetRecoilState(userInformationState);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API ?? "",
  });

  useEffect(() => {
    const getCarts = async () => {
      getCartSubTotal();
      try {
        const carts = await fetchCarts();
        setShopping(carts);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
    };
    getCarts();
  }, [countCart, deletedCart]);

  const getCartCount = () => {
    return shopping.reduce((qty, item) => Number(item?.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return shopping
      .reduce((price, item) => price + item.price * (item?.qty ?? 1), 0)
      .toFixed(2);
  };
  const validateField = () => {
    const isUserInfoValid =
      form.getFieldError("name").length === 0 &&
      form.getFieldError("email").length === 0 &&
      form.getFieldError("phone").length === 0 &&
      form.getFieldError("address").length === 0 &&
      userInfo.email &&
      userInfo.name &&
      userInfo.phone &&
      userInfo.address;

    if (!isUserInfoValid) {
      notification.open({
        message: "Please fill in all required fields correctly.",
      });
      return { message: "Please fill in all required fields correctly." };
    }
  };

  const saveOrder = async () => {
    try {
      const error = validateField();
      if (!error?.message) {
        const data = {
          orders: shopping,
          total: +getCartSubTotal(),
          countOrders: getCartCount(),
          userInformation: userInfo,
        };
        const carts = await fetchSaveOrder(data);
        setFormValues({
          name: "",
          email: "",
          phone: "",
          address: "",
        });
        notification.open({
          message: carts.message,
        });
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="cart__block">
      <h2>Shopping Cart</h2>

      <div className="cartscreen">
        <div className="cart_user_block">
          {isLoaded ? (
            <GoogleMaps
              selected={selected}
              setAddress={setAddress}
            />
          ) : (
            <div>Loading...</div>
          )}
          <UserPersonaInfo
            form={form}
            setSelected={setSelected}
            address={address}
          />
        </div>
        <div className="cartscreen__left">
          {shopping.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            shopping.map((item: ICard) => (
              <CartItem key={item._id} item={item} />
            ))
          )}
        </div>
        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
            <button onClick={saveOrder}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
