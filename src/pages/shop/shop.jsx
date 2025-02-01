import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './shop.css'
import new_collections from '../../components/assets/products/data'

const Shop = () => {
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSize, setSelectedSize] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('all')

  // Get unique categories and brands for filters
  const categories = ['all', ...new Set(new_collections.map(item => item.category))]
  const brands = ['all', ...new Set(new_collections.map(item => item.brand))]

  const filterProducts = (products) => {
    return products.filter(item => {
      const priceMatch = (() => {
        switch(priceRange) {
          case 'under-50':
            return item.price < 50
          case '50-100':
            return item.price >= 50 && item.price <= 100
          case 'over-100':
            return item.price > 100
          default:
            return true
        }
      })()

      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
      const sizeMatch = selectedSize === 'all' || item.sizes.includes(selectedSize)
      const brandMatch = selectedBrand === 'all' || item.brand === selectedBrand

      return priceMatch && categoryMatch && sizeMatch && brandMatch
    })
  }

  const sortProducts = (products) => {
    switch(sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price)
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...products].sort((a, b) => b.rating - a.rating)
      default:
        return products
    }
  }

  const filteredAndSortedProducts = sortProducts(filterProducts(new_collections))

  return (
    <div className='shop'>
      <div className='shop-header'>
        <h1>Shop All Products</h1>
        <div className='shop-filters'>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <select 
            value={selectedBrand} 
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand === 'all' ? 'All Brands' : brand.toUpperCase()}
              </option>
            ))}
          </select>
          
          <select 
            value={selectedSize} 
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="all">All Sizes</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          <select 
            value={priceRange} 
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="under-50">Under $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="over-100">Over $100</option>
          </select>
        </div>
      </div>

      <div className='shop-products'>
        {filteredAndSortedProducts.map(product => (
          <div className='shop-product' key={product.id}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
              <div className='product-image'>
                <img src={product.image} alt={product.name} />
                <div className='product-actions'>
                  <button className='add-to-cart'>Add to Cart</button>
                </div>
              </div>
              <div className='product-details'>
                <h3>{product.name}</h3>
                <p className='brand'>{product.brand.toUpperCase()}</p>
                <div className='price-rating'>
                  <p className='price'>${product.price.toFixed(2)}</p>
                  <p className='rating'>★ {product.rating}</p>
                </div>
                <p className='available-sizes'>
                  Sizes: {product.sizes.join(', ')}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shop
