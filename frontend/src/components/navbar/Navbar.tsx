import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h2>Choose products in shops</h2>
      </div>

      <ul className="navbar__links">
        <li>
          <Link to="/" className="cart__link">Shop</Link>
        </li>
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Shopping cart
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;