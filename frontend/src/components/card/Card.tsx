import { ICard } from "../../interfaces/interfaces";
import "./Card.css";
import { fetchAddToCard } from "../../fetchApi/fetchAddToCard";
import { useRecoilValue } from "recoil";
import { selectedShopState } from "../../recoils/atom/selectedShopAtom";


function Card({ imageUrl, description, price, name, productId }: ICard) {
  const shop = useRecoilValue(selectedShopState);

  async function saveItemToCart(productId: string | undefined) {
    try {
      await fetchAddToCard(productId);
    } catch (error) {
      console.error("Error fetching shop data:", error);
    }
  }

  return (
    <div className="product">
      <img src={imageUrl} alt={name} />

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__description">{description?.substring(0, 100)}...</p>

        <p className="info__price">${price}</p>
        <button
          className="info__button"
          disabled={shop === "all"}
          onClick={() => saveItemToCart(productId)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Card;
