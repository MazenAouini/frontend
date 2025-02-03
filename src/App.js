import './App.css';
import Footer from './components/footer/footer'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import NewArrivals from './components/NewArrivals/NewArrivals';
import FeatureSection from './components/Features/Feature';
import Cart from './pages/cart/cart.jsx'
import Shop from './pages/shop/shop.jsx'
import About from './pages/about/About.jsx'
import SingleProduct from './pages/sproduct/sProduct.jsx'
import Login from './pages/adminlogin/login.jsx';
import Dashboard from './pages/admindashboard/Dashboard.jsx';
import { CartProvider } from './context/CartContext';

const App = () => {
  // Move PrivateRoute inside App component
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/adminlogin" replace />;
  };

  return (
    <CartProvider>
      <div className='App'>
        <Routes>
          {/* Admin Routes */}
          <Route path="/adminlogin" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <NewArrivals />
              <FeatureSection />
              <Footer />
            </>
          } />
          <Route path="/shop" element={
            <>
              <Navbar />
              <Shop />
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          } />
          <Route path="/cart" element={
            <>
              <Navbar />
              <Cart />
              <Footer />
            </>
          } />
          <Route path="/product/:id" element={
            <>
              <Navbar />
              <SingleProduct />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </CartProvider>
  );
};

export default App;
