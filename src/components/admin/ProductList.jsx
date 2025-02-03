import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import './ProductList.css';
import EditProductForm from './EditProductForm';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/products/list-products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProducts(response.data.products);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:7000/api/products/delete-product/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProducts(products.filter(product => product._id !== productId));
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
    setShowAddForm(false);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts(products.map(p => 
      p._id === updatedProduct._id ? updatedProduct : p
    ));
    setEditingProduct(null);
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-products-container">
      <div className="admin-header">
        <h2>Product Management</h2>
        <button className="add-product-btn" onClick={() => setShowAddForm(true)}>
          <FaPlus /> Add New Product
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ProductForm 
              onProductAdded={handleProductAdded}
              onClose={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={handleProductUpdated}
        />
      )}

      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image-container">
              <img src={product.image[0]} alt={product.name} />
              <div className="product-actions-overlay">
                <button 
                  className="edit-btn"
                  onClick={() => setEditingProduct(product)}
                >
                  <FaEdit />
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(product._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <p className="brand">{product.mark}</p>
              <p className="category">{product.category}</p>
              <div className="sizes">
                {product.sizes.map((size) => (
                  <span key={`${product._id}-${size.size}`} className="size-badge">
                    {size.size}: {size.quantity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList; 