import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);


  return (
    <nav className="navbar">
      <div className="box">
        <div className="logo_image">
          <h2>Choose products in shops</h2>
        </div>
        <ul className={nav ? 'menu active' : 'menu'}>
          <li onClick={() => setNav(false)}>
            <Link to="/" className="cart__link" >
              Shop
            </Link>
          </li>
          <li onClick={() => setNav(false)}>
            <Link to="/cart" className="cart__link">
              <i className="fas fa-shopping-cart"></i>
              <span>Shopping cart</span>
            </Link>
          </li>
        </ul>
        <div onClick={() => setNav(!nav)} className={"mobile_btn"}>
          {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
