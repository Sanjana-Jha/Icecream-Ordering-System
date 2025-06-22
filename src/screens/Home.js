import React,{useEffect,useState} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/Carousel';

export default function Home() {
//   const [data,setdata] = useState([]);

//   const loadData = async()=>{
//     let response = await fetch("http://localhost:5000/api/foodData",{
//       method:"POST",
//       headers:{
//         'Content-Type':'application/json'
//       }
//     });
//     response = await response.json();
//     console.log(response[0]);
//   }
//  useEffect(()=>{
//   loadData()
//  },[])


  return (
    <div>
      <div> <Navbar /> </div>
      <div> <Carousel /> </div>

      {/* About Us Section */}
      <div id="about-us" className="container">
          <h1
          style={{
            textAlign: "center",
            marginBottom:"10px",
            marginTop:"20px",
            color:"#d05e9d",
            fontWeight:"600",
            paddingBottom:"30px"
          }}
        >
          About Us
        </h1>
       <div
  className="aboutus"
  style={{
    display: "flex",
    alignItems: "flex-start",
   // padding: "40px",
    gap: "40px",
   flexWrap: "nowrap",
  }}
>
  <img
    src="/aboutus.png"
    alt="About SweetScoops"
    style={{
      width: "50%",
      height: "auto",
      borderRadius: "12px",
      objectFit: "cover",
      minWidth: "300px",
    }}
  />
  <div
    className="txt"
    style={{
      width: "50%",
      minWidth: "300px",
      backgroundColor: "#f0fdfa",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.7",
      color: "#1e293b",
    }}
  >
    <h2 style={{ color: "#0f766e", marginBottom: "15px", fontSize: "28px" }}>
      Scoop Joy in Every Bite
    </h2>
    <p style={{ fontSize: "16px", marginBottom: "10px" }}>
      Since 2015, <strong>Little Moons</strong> has been on a mission to make every moment sweeter with handcrafted, premium ice cream.
    </p>
    <p style={{ fontSize: "16px", marginBottom: "10px" }}>
      We believe in real ingredients, bold flavors, and the magic of a well-made scoop. Whether it's a classic vanilla bean or an adventurous mango-chili swirl, each flavor is thoughtfully created to bring a smile to your face.Perfect for sunny days, cozy nights, celebrations, or just because — there's a scoop for every mood.
    </p>
    <p style={{ fontSize: "16px", marginBottom: "10px" }}>
      Our small-batch process ensures creamy, rich texture in every bite. Perfect for sunny days, cozy nights, celebrations, or just because — there's a scoop for every mood.
    </p>
    <p style={{ fontSize: "16px" }}>
      Come visit us, share a laugh, and enjoy the little moments that matter. Because at SweetScoops, we don't just serve ice cream — we serve happiness.Perfect for sunny days, cozy nights, celebrations, or just because — there's a scoop for every mood.
    </p>
  </div>
</div>

      </div>

      {/* Cards Section */}
      <div className='container' id="products"> <Card /> </div>

      {/* Contact Us Section */}
      <div id="contact">
        <h1
          style={{
            textAlign: "center",
            marginBottom:"40px",
            color:"#d05e9d",
            fontWeight:"600"
          }}
        >
          Contact Us
        </h1>
        <div
          style={{
            backgroundImage: "url('/bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            padding: "60px 0", // padding top and bottom
          }}
        >
          <div className="container">
            <div
              className="contactus"
              style={{
                display: "flex", // Default flex layout for large screens
                flexDirection: "row", // Row layout for larger screens
                alignItems: "flex-start",
                padding: "40px",
                gap: "40px",
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.85)", // White transparent background on content
              }}
            >
              {/* Left Side - Contact Info */}
              <div style={{ width: "40%" }}>
                <div style={{ marginTop: "20px" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
                  >
                    <i className="fas fa-phone" style={{ marginRight: "10px", fontSize: "20px" }}></i>
                    <span>+1 234 567 890</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
                  >
                    <i className="fas fa-envelope" style={{ marginRight: "10px", fontSize: "20px" }}></i>
                    <span>info@sweetscoops.com</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <i className="fas fa-map-marker-alt" style={{ marginRight: "10px", fontSize: "20px" }}></i>
                    <span>123 Ice Cream Street, Dessert City</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div style={{ width: "60%" }}>
                <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <textarea
                    placeholder="Your Message"
                    rows="5"
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  ></textarea>
                  <button
                    type="submit"
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: "rgb(15, 118, 110)",
                      color: "#fff",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div><Footer /></div>
    </div>
  );
}


