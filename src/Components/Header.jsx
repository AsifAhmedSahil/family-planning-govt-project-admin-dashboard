/* eslint-disable react/prop-types */
import { useState } from "react";
import profile from "../assets/profile.png";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is properly imported
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate()

  // Toggle dropdown visibility on profile image click
  const handleImageClick = () => {
    setDropdownOpen(!dropdownOpen); 
  };

  
  const handleLogout = () => {
    console.log("Logged out"); 
    localStorage.removeItem("authToken")
    navigate("/login")
    setDropdownOpen(false); 
  };

  return (
    <div className="header d-flex justify-content-between align-items-center p-3 bg-light position-relative">
      <div>
        <h1 className="h3 mb-2">{title}</h1>
        <span style={{ color: "#565656" }}>
          পরিবার পরিকল্পনা স্মার্ট মনিটরিং সিস্টেম
        </span>
      </div>

      <div className="user-info d-flex align-items-center gap-2 position-relative">
        <div>
          <p className="mb-0">আরিফুর রহমান</p>
          <p className="mb-0">ইউএফপিও</p>
        </div>
        <div>
          <img
            src={profile}
            alt="User"
            className="rounded-circle me-2"
            style={{ width: "50px", height: "50px", cursor: "pointer" }}
            onClick={handleImageClick} // Toggle dropdown on image click
          />
          {dropdownOpen && (
            <div
              className="dropdown-menu show"
              style={{
                position: "absolute",
                top: "55px", // Adjust dropdown position
                right: "0",
                minWidth: "120px",
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
                width: "max-content", // Dropdown width depends on the content
              }}
            >
              <button
                className="dropdown-item"
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px",
                  textAlign: "center",
                  width: "100%",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
