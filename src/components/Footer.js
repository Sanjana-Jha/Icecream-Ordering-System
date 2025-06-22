import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
  //   <div>
  //     <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
  //   <div className="col-md-4 d-flex align-items-center">
  //     <Link to="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1" aria-label="Bootstrap">
      
  //     </Link>
  //     <span className="mb-3 mb-md-0 text-body-secondary">© 2025 Mother Dairy, Inc</span>
  //   </div>

  //   <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      
  //   </ul>
  // </footer>
  //   </div>

  <footer 
  style={{
   backgroundColor:"rgb(142 56 110)",
    color: "#fff",
    padding: "40px 20px",
   // marginTop:"100px"
    
  }}
>
  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
    }}
  >
    {/* Left Side - Copyright */}
    <div style={{ textAlign: "center", fontSize: "14px", flex: "1 1 200px", opacity: "0.8" }}>
      © {new Date().getFullYear()} SweetScoops. All Rights Reserved.
    </div>

    {/* Center - Email */}
    <div style={{ textAlign: "center", flex: "1 1 300px" }}>
      <p style={{ marginBottom: "8px" }}>Email: info@sweetscoops.com</p>
    </div>

    {/* Right Side - Social Media Icons */}
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", flex: "1 1 300px" }}>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontSize: "24px" }}>
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontSize: "24px" }}>
        <i className="fab fa-instagram"></i>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontSize: "24px" }}>
        <i className="fab fa-twitter"></i>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontSize: "24px" }}>
        <i className="fab fa-linkedin-in"></i>
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontSize: "24px" }}>
        <i className="fab fa-youtube"></i>
      </a>
    </div>
  </div>
</footer>

  )
}
