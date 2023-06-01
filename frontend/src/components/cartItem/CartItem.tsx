import { ICart } from "../../interfaces/interfaces";
import "./CartItem.css";
import { fetchUpdateQty } from "../../fetchApi/fetchUpdateQty";
import { Image } from "antd";
import { fetchDeleteCart } from "../../fetchApi/fetchDeleteCart";
import { useRecoilState } from "recoil";
import { deletedCartItem } from "../../recoils/atom/deletedCartItem";
import { countCartItem } from "../../recoils/atom/countCartItem";
import { DeleteOutlined } from "@ant-design/icons";

const CartItem = ({ item }: ICart) => {
  const [count, setCount] = useRecoilState<number>(countCartItem);
  const [deleteItem, setDeleteItem] = useRecoilState<number>(deletedCartItem);

  const qtyChangeHandler = async (qty: string, id: string | undefined) => {
    setCount(+qty);
    try {
        await fetchUpdateQty(id, +qty);
  
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
  };

  const removeHandler = async(productId: string | undefined) => {
    try {
        await fetchDeleteCart(productId);
        setDeleteItem(deleteItem+1)
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
  };

  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <Image
          width={150}
          height={100}
          src={item?.imageUrl}
          alt={item?.name} 
        />
      </div>
      <p className="cartItem__name">{item?.name}</p>
      <p className="cartitem__price">${item?.price}</p>
      <select
        value={item.qty ?? count}
        onChange={(e) => qtyChangeHandler(e.target.value, item?._id)}
        className="cartItem__select"
      >
        {(() => {
          const options = [];
          for (let i = 1; i <= item!.countInStock ?? 1; i++) {
            options.push(
              <option key={i} value={i}>
                {i}
              </option>
            );
          }
          return options;
        })()}
      </select>
      <DeleteOutlined className="cartItem__deleteBtn" onClick={() => removeHandler(item?._id)}/>
    </div>
  );
};

export default CartItem;
