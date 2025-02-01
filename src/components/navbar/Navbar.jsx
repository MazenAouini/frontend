import { useState } from "react";
import { FaShoppingBag, FaTimes, FaBars } from "react-icons/fa";
import "./Navbar.css";
import logo from "../assets/about/logo1-removebg-preview.png"
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header id="header">
      <a href="/">
        <img src={logo} alt="store logo" className="logo" />
      </a>
      
      <div>
        <nav id="navbar" className={menuOpen ? "active" : ""}>
          <ul>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/about">About</a></li>
            <li>
              <a href="/cart" className="cart-icon">
                <FaShoppingBag />
              </a>
            </li>
          </ul>
          <div id="close" onClick={() => setMenuOpen(false)}>
            <FaTimes />
          </div>
        </nav>
      </div>

      <div id="mobile">
        <a href="/cart">
          <FaShoppingBag />
        </a>
        <button onClick={() => setMenuOpen(true)}>
          <FaBars />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
