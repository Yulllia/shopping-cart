import { IShop } from "../../interfaces/interfaces";
import "./Shop.css";
import { useRecoilState } from "recoil";
import { selectedShopState } from "../../recoils/atom/selectedShopAtom";
import { useEffect } from "react";

function Shop({ name }: IShop) {
  const [selectedShop, setSelectShop] = useRecoilState<string>(selectedShopState);

  useEffect(()=>{
    const shop = localStorage.getItem('selectedShopName') ?? 'all'
    setSelectShop(shop)
  },[name])

  const isDisabled = selectedShop !== "all" && selectedShop !== name;

  const handleClick = () => {
    setSelectShop(name);
    localStorage.setItem('selectedShopName', name);
  };


  return (
    <div className={`shop ${isDisabled ? 'disabled' : ''}`} onClick={handleClick}>
      <p className="shop_name">{name}</p>
    </div>
  );
}

export default Shop;
