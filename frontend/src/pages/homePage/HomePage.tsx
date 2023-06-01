import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { fetchProducts } from "../../fetchApi/fetchProducts";
import { fetchShops } from "../../fetchApi/fetchShops";
import { ICard, Products } from "../../interfaces/interfaces";
import "./HomePage.css";
import Shop from "../../components/shopItem/Shop";
import { useRecoilValue } from "recoil";
import { selectedShopState } from "../../recoils/atom/selectedShopAtom";
import { Spin } from "antd";

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Products>();
  const searchShop = useRecoilValue(selectedShopState);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const name = localStorage.getItem("selectedShopName");
        const productsDataPromise = await fetchProducts(name ?? searchShop);
        const shopsDataPromise = await fetchShops();

        const [productsData, shopsData] = await Promise.all([
          productsDataPromise,
          shopsDataPromise,
        ]);
        setProducts({
          products: productsData,
          shops: shopsData,
        });
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [searchShop]);

  if (loading) {
    return (
      <Spin tip="Loading" size="small">
        <div className="content" />
      </Spin>
    );
  }

  return (
    <div className="homescreen">
      <div className="shops_list">
        <h3 className="shops_title">Shops</h3>
        {products?.shops.map((shop, index) => (
          <Shop key={index} name={shop} />
        ))}
      </div>
        <>
          <div className="homescreen__products">
            {products?.products.map((product: ICard) => (
              <Card
                key={product._id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                productId={product._id}
                countInStock={product.countInStock}
                shopName={product.shopName}
              />
            ))}
          </div>
        </>
    </div>
  );
};

export default HomePage;
