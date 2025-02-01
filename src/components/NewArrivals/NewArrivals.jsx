import React from 'react';
import { Link } from 'react-router-dom';
import new_collections from '../assets/products/data';
import './NewArrivals.css';

const NewArrivals = () => {
  // Get the latest 4 products
  const newArrivals = new_collections.slice(0, 4);

  return (
    <section className="new-arrivals">
      <div className="new-arrivals-header">
        <h1>New Arrivals</h1>
        <p>Summer Collection New Modern Design</p>
      </div>
      <div className="new-arrivals-products">
        {newArrivals.map((product) => (
          <div className="shop-product" key={product.id}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-actions">
                  <button className="add-to-cart">View Details</button>
                </div>
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <p className="brand">{product.brand.toUpperCase()}</p>
                <div className="price-rating">
                  <p className="price">${product.price.toFixed(2)}</p>
                  <p className="rating">★ {product.rating}</p>
                </div>
                <p className="available-sizes">
                  Sizes: {product.sizes.join(', ')}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
