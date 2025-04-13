/* eslint-disable react/prop-types */
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const Header = ({ title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  console.log(user)

  const handleImageClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logged out");
    localStorage.removeItem("authToken");
    navigate("/login");
    setDropdownOpen(false);
  };

  const handleProfileSection = () => {
    navigate("/profile");
  };

  return (
    <div className="header d-flex justify-content-between align-items-center bg-light position-relative ">
      <div className="mb-2">
        <h1 className="h3 ">{title}</h1>
        <span style={{ color: "#565656" }}>
          পরিবার পরিকল্পনা স্মার্ট মনিটরিং সিস্টেম
        </span>
      </div>

      <div className="user-info d-flex align-items-center gap-2 position-relative">
        <div>
          <p className="mb-0 " style={{ fontWeight: "bold", fontSize: "18px" }}>
            {user?.name}
          </p>
          <p className="mb-0" style={{ textAlign: "right" }}>
            {user?.designation}
          </p>
        </div>
        <div>
          <img
            src={`${import.meta.env.REACT_APP_BASE_URL}/uploads/${user?.image}`}
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
              top: "55px",
              right: "0",
              minWidth: "140px", // slightly increased for uniformity
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            <button
              className="dropdown-item"
              style={{
                background: "none",
                border: "none",
                padding: "10px 12px",
                textAlign: "start",
                width: "100%",
                cursor: "pointer",
                fontSize: "16px",
              }}
              onClick={handleLogout}
            >
              লগআউট
            </button>
            
            <button
              className="dropdown-item"
              style={{
                background: "none",
                border: "none",
                padding: "10px 12px",
                textAlign: "start",
                width: "100%",
                cursor: "pointer",
                fontSize: "16px",
              }}
              onClick={handleProfileSection}
            >
              আমার প্রোফাইল
            </button>
          </div>
          
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
