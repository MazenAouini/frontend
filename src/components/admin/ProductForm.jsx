import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import './ProductForm.css';

const ProductForm = ({ onProductAdded, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    mark: '',
    category: '',
    sizes: [{ size: '', quantity: 0 }],
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...formData.sizes];
    newSizes[index][field] = value;
    setFormData(prev => ({
      ...prev,
      sizes: newSizes
    }));
  };

  const addSizeField = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, { size: '', quantity: 0 }]
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('mark', formData.mark);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('sizes', JSON.stringify(formData.sizes));
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await axios.post(
        'http://localhost:7000/api/products/create-product',
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        onProductAdded(response.data.product);
        setFormData({
          name: '',
          price: '',
          mark: '',
          category: '',
          sizes: [{ size: '', quantity: 0 }],
          image: null
        });
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = '';
        }
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setError(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <div className="form-header">
        <h2>Add New Product</h2>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mark">Brand</label>
          <input
            type="text"
            id="mark"
            name="mark"
            value={formData.mark}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="man">man</option>
            <option value="woman">women</option>
            <option value="kids">kids</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sizes">Sizes and Stock</label>
          {formData.sizes.map((size, index) => (
            <div key={`size-${size.size || index}-${index}`} className="size-input-group">
              <input
                id={`size-${index}`}
                type="text"
                placeholder="Size"
                value={size.size}
                onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                aria-label="Size"
              />
              <input
                id={`quantity-${index}`}
                type="number"
                placeholder="Quantity"
                value={size.quantity}
                onChange={(e) => handleSizeChange(index, 'quantity', e.target.value)}
                aria-label="Quantity"
              />
            </div>
          ))}
          <button type="button" onClick={addSizeField} className="add-size-btn">
            Add Size
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

ProductForm.propTypes = {
  onProductAdded: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ProductForm; 