import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const products = ['Cups', 'Cone', 'Sticks', 'Family Pack'];

export default function Navbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedSearches);
  }, []);

  const updateRecentSearches = (term) => {
    let updatedSearches = [term, ...recentSearches.filter(item => item !== term)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = products.filter(product =>
        product.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    const section = document.getElementById("products");
    if (section) section.scrollIntoView({ behavior: "smooth" });
    updateRecentSearches(suggestion);
  };

  const handleSearchIconClick = () => {
    if (searchTerm) {
      const section = document.getElementById("products");
      if (section) section.scrollIntoView({ behavior: "smooth" });
      updateRecentSearches(searchTerm);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchIconClick();
    }
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light shadow-sm"
        style={{
          backgroundColor: "#ffffff",
          height: "90px",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div className="container-fluid position-relative">
          <Link className="navbar-brand d-lg-none" to="/">
            <img src="/logo.svg" alt="Logo" style={{ height: '50px' }} />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-between mobile-nav-bg" id="navbarNavAltMarkup">
            {/* Left nav links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ gap: "20px" }}>
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  id="aboutDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ cursor: 'pointer' }}
                >
                  About Us
                </span>
                <ul className="dropdown-menu" aria-labelledby="aboutDropdown">
                  <li>
                    <span
                      className="dropdown-item"
                      onClick={() => navigate("/Contact")}
                      style={{ cursor: "pointer" }}
                    >
                      Contact Us
                    </span>
                  </li>
                  <li><Link className="dropdown-item" to="/FAQ">FAQ</Link></li>
                  <li><Link className="dropdown-item" to="/Terms">T&C</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/Product">Products</Link>
              </li>

              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/Order">Orders</Link>
                </li>
              )}
            </ul>

            {/* Desktop logo */}
            <div className="d-none d-lg-block position-absolute top-50 start-50 translate-middle">
              <img src="/logo.svg" alt="Logo" style={{ height: '65px' }} />
            </div>

            {/* Right section */}
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 mt-3 mt-lg-0">
              {/* Search box */}
              <div className="position-relative" style={{ width: '100%', maxWidth: '250px' }}>
                <input
                  className="form-control rounded-pill"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyPress={handleSearchKeyPress}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  style={{
                    paddingRight: '40px',
                    paddingLeft: '15px',
                    backgroundColor: '#f8f9fa',
                    fontSize: '1rem',
                    border: '2px solid #d05e9d',
                    color: '#d05e9d',
                    boxShadow: 'none'
                  }}
                />
                <i
                  className="fas fa-search"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: '#d05e9d'
                  }}
                  onClick={handleSearchIconClick}
                />
                {isFocused && (suggestions.length > 0 || (searchTerm === '' && recentSearches.length > 0)) && (
                  <ul className="list-group position-absolute search-dropdown" style={{ zIndex: 1050, top: '100%', width: '100%' }}>
                    {suggestions.map((item, index) => (
                      <li
                        key={index}
                        className="list-group-item"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSuggestionClick(item)}
                      >
                        {item}
                      </li>
                    ))}
                    {suggestions.length === 0 && searchTerm === '' && recentSearches.map((item, index) => (
                      <li
                        key={index}
                        className="list-group-item"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSuggestionClick(item)}
                      >
                        Recent: {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Auth/Cart/Logout */}
              <div className="d-flex gap-2">
                {!localStorage.getItem("authToken") ? (
                  <>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/createuser">Signup</Link>
                  </>
                ) : (
                  <>
                    <div
                      className="btn bg-white text-success d-flex align-items-center"
                      onClick={() => navigate("/cart")}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fas fa-shopping-cart icon-pink"></i>
                    </div>
                    <div
                      className="btn bg-white text-danger d-flex align-items-center"
                      onClick={handleLogout}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fas fa-sign-out-alt icon-pink"></i>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Custom styles */}
      <style>{`
        .nav-link {
          color: #d05e9d !important;
          font-weight: 750;
          font-family: 'Montserrat', sans-serif;
          font-size: 1.2rem;
        }
        .nav-link:hover {
          color: rgb(15, 118, 110) !important;
          text-decoration: none;
        }
        input::placeholder {
          color: #d05e9d !important;
          opacity: 1;
        }

        /* Search suggestions */
        .search-dropdown .list-group-item {
          color: #d05e9d !important;
          font-weight: 750;
          font-family: 'Montserrat', sans-serif;
          font-size: 1.2rem;
          background-color: white;
          border: none;
        }
        .search-dropdown .list-group-item:hover {
          background-color: #f8f9fa;
          color: rgb(15, 118, 110);
        }

        /* New: Dropdown styling */
        .dropdown-menu {
          background-color: #ffffff;
          border: 1px solid #ddd;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
          font-family: 'Montserrat', sans-serif;
        }
        .dropdown-item {
          color: #d05e9d !important;
          font-weight: 600;
          font-size: 1rem;
        }
        .dropdown-item:hover {
          background-color: #f8f9fa;
          color: rgb(15, 118, 110) !important;
        }

        @media (min-width: 992px) and (max-width: 1200px) {
          .navbar-collapse {
            display: flex !important;
            align-items: center;
            justify-content: space-between;
            flex-wrap: nowrap !important;
          }
          .navbar-nav {
            flex-direction: row;
            flex-wrap: nowrap !important;
            gap: 5px !important;
          }
          .navbar-right-section {
            flex-direction: row !important;
            align-items: center !important;
            flex-wrap: nowrap !important;
            gap: 10px;
          }
          .form-control {
            max-width: 180px !important;
            font-size: 0.85rem;
          }
          .position-absolute.top-50.start-50.translate-middle {
            transform: translate(-50%, -50%) scale(0.9);
          }
        }

        @media (max-width: 991.98px) {
          .mobile-nav-bg {
            background-color: white;
            padding: 1rem;
            border-top: 1px solid #ddd;
          }
        }
      `}</style>
    </div>
  );
}
