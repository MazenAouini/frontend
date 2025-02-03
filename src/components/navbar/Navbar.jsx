import { useState } from "react";
import { FaShoppingBag, FaTimes, FaBars } from "react-icons/fa";
import "./Navbar.css";
import logo from "../assets/about/logo1-removebg-preview.png"
import { Link } from "react-router-dom";
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();

  return (
    <section id="header">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      
      <div className="nav-container">
        <nav id="navbar" className={menuOpen ? "active" : ""}>
          <ul>
          
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <div id="close" onClick={() => setMenuOpen(false)}>
            <FaTimes />
          </div>
        </nav>
        
        <Link to="/cart" className="cart-icon">
          <FaShoppingBag />
          {getCartItemsCount() > 0 && (
            <span className="cart-badge">{getCartItemsCount()}</span>
          )}
        </Link>
      </div>

      <div id="mobile">
        <Link to="/cart" className="cart-icon">
          <FaShoppingBag />
        </Link>
        <button onClick={() => setMenuOpen(true)}>
          <FaBars />
        </button>
      </div>
    </section>
  );
};

export default Navbar;
