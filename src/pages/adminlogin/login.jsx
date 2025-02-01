import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import './login.css'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setError('') // Clear error when user types
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:7000/api/auth/login', formData)
      const { token } = response.data
      
      // Store token in localStorage
      localStorage.setItem('token', token)
      
      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      
      navigate('/dashboard')
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed')
      setFormData({ ...formData, password: '' })
    }
  }

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2>Admin Login</h2>
        <p className='subtitle'>Please enter your credentials</p>
        
        {error && <div className='error-message'>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className='signin-button'>
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login