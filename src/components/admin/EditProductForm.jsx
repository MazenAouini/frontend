import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './EditProductForm.css';

const EditProductForm = ({ product, onClose, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    mark: product.mark,
    category: product.category,
    sizes: product.sizes || [],
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState(product.image[0]);

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

  const removeSizeField = (index) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      // Show image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

      const response = await axios.put(
        `http://localhost:7000/api/products/update-product/${product._id}`,
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        onProductUpdated(response.data.product);
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-product-overlay">
      <div className="edit-product-modal">
        <div className="modal-header">
          <h2>Edit Product</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="edit-product-form">
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
              <option value="women">women</option>
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
                <button 
                  type="button" 
                  className="remove-size-btn"
                  onClick={() => removeSizeField(index)}
                >
                  &times;
                </button>
              </div>
            ))}
            <button type="button" onClick={addSizeField} className="add-size-btn">
              Add Size
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="current-image">Current Image</label>
            <div className="current-image">
              <img id="current-image" src={currentImage} alt="Product" />
            </div>
            <label htmlFor="image" className="image-upload-label">
              Change Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="image-input"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditProductForm.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    mark: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    sizes: PropTypes.arrayOf(PropTypes.shape({
      size: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired
    })),
    image: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onProductUpdated: PropTypes.func.isRequired
};

export default EditProductForm; 