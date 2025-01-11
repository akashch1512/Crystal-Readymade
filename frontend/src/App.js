import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import Contact from "./components/Contact";
import ProductCard from "./components/ProductCard";
import axios from "axios";
import Developers from "./components/Developers";
import ComparisonHistory from "./components/comparisonHistory";
import useScrollAnimation from "./components/useScrollAnimation";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories] = useState([
    "electronics",
    "jewelry",
    "men_clothing",
    "women_clothing",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState("");

  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleRegister = (username) => {
    setUsername(username);
    alert(`Welcome, ${username}!`);
    setIsLoggedIn(true);
  };

  const handleSearch = async () => {
    if (!selectedCategory || !searchTerm || selectedPlatforms.length === 0) {
      setError(
        "Please select a category, enter a search term, and choose at least one platform."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${BASE_URL}/api/products?category=${selectedCategory}&search=${searchTerm}&platforms=${selectedPlatforms.join(
          ","
        )}&username=${username}`
      );
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-sine",
      offset: 120,
      once: false,
      
    });
  }, []);

  const Navbar = () => (
    <nav className={`navbar ${isMobileMenuOpen ? "active" : ""}`}>
      <div className="logo">ProCompare</div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/developers">Developers</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      <div className="hamburger" onClick={toggleMobileMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );

  const ProductsSection = () => (
    <section id="products" className="product-list">
      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading products...</p>}
      {!loading && !error && products.length > 0 ? (
        <div className="product-cards"  data-aos="fade-up">
          {products.map((productPair, index) => (
            <ProductCard key={index} productPair={productPair} />
          ))}
        </div>
      ) : (
        !loading && !error && <p>Search Products...</p>
      )}
    </section>
  );

  const CategorySelector = () => (
    <div className="category-selector-container" data-aos="fade-right">
      <h3 data-aos="fade-right">
        Select Category:{" "}
      </h3>
      {categories.map((category, index) => (
        <div
          key={index}
          className={`category-card ${
            selectedCategory === category ? "selected" : ""
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
        </div>
      ))}
    </div>
  );

  const PlatformSelector = () => {
    const platformLogos = {
      flipkart: "flipkart.png",
      amazon: "amazon.png",
      myntra: "myntra.png",
      meesho: "Meesho.png",
    };

    return (
      <div className="platform-selector-container">
        <h3 data-aos="fade-up">Select Platforms:</h3>
        <div className="platform-selector" data-aos="fade-up" >
          {Object.keys(platformLogos).map((platform) => (
            <div
              key={platform}
              className={`platform-chip ${
                selectedPlatforms.includes(platform) ? "selected" : ""
              }`}
              onClick={() => handlePlatformChange(platform)}
            >
              <img src={platformLogos[platform]} alt={`${platform} logo`} />
              <span>
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const BenefitsSection = () => {
    useScrollAnimation();

    return (
      <section className="benefits-section">
        <h2 data-aos="fade-up" data-aos-delay="600">
          Why Choose ProCompare?
        </h2>
        <div className="benefits-container">
          <div className="benefit-item" data-aos="fade-up">
            <img src="i3.webp" alt="Comparison Feature 1" />
            <p data-aos="zoom-in">
              Compare products across multiple platforms effortlessly.
            </p>
          </div>
          <div className="benefit-item" data-aos="fade-up" data-aos-delay="200">
            <img src="i2.jpeg" alt="Comparison Feature 2" />
            <p data-aos="zoom-in">
              Save time and money by finding the best deals instantly.
            </p>
          </div>
          <div className="benefit-item" data-aos="fade-up" data-aos-delay="400">
            <img src="i4.jpeg" alt="Comparison Feature 3" />
            <p data-aos="zoom-in">
              Access detailed insights and product reviews.
            </p>
          </div>
          <div className="benefit-item" data-aos="fade-up" data-aos-delay="600">
            <img src="i1.jpg" alt="Comparison Feature 4" />
            <p data-aos="zoom-in">
              Track price trends and stay ahead of the market.
            </p>
          </div>
        </div>
      </section>
    );
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div className="home-layout">
                      <div className="left-side">
                        <h1 data-aos="fade-right" data-aos-delay="100">
                          Welcome To ProCompare
                        </h1>
                        <button
                          data-aos="fade-right"
                          data-aos-delay="100"
                          className="compare-button"
                          onClick={() =>
                            document
                              .getElementById("forScroll")
                              .scrollIntoView({ behavior: "smooth" })
                          }
                        >
                          Compare
                        </button>
                      </div>
                      <div className="right-side">
                        <img
                          data-aos="fade-left"
                          data-aos-delay="100"
                          src="finalmanleft.png"
                          alt="Home Illustration"
                          className="home-image"
                        />
                      </div>
                    </div>
                    <BenefitsSection />
                    <div className="search-section" id="forScroll">
                      <h1 data-aos="fade-down" data-aos-delay="0">
                        Compare
                      </h1>
                      <div className="search-bar">
                        <CategorySelector />
                        <input data-aos="zoom-in"
                          type="text"
                          placeholder="Search products..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="search-input"
                        />
                        <button data-aos="fade-left"
                          onClick={async () => {
                            await handleSearch(); // Wait for the search logic to complete

                            setTimeout(() => {
                              const target =
                                document.getElementById("bottomScrollTarget");
                              if (target) {
                                target.scrollIntoView({ behavior: "smooth" });
                              }
                            }, 200); 
                          }}
                          disabled={loading || !selectedCategory}
                          className="search-button"
                        >
                          {loading ? "Loading..." : "Search"}
                        </button>
                        {error && <p className="error-message">{error}</p>} {}
                      </div>
                      <PlatformSelector />
                    </div>
                    <ProductsSection />
                  </>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/developers" element={<Developers />} />
              <Route
                path="/profile"
                element={<ComparisonHistory username={username} />}
              />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/register"
              element={<Register onRegister={handleRegister} />}
            />
          </Routes>
        )}
        <div id="bottomScrollTarget" style={{ height: "1px" }}></div>
      </div>
    </Router>
  );
}

export default App;
