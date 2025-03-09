/* eslint-disable react/prop-types */

import profile from "../assets/profile.png";

const Header = ({ title }) => {
  return (
    <div className="header d-flex justify-content-between align-items-center p-3 bg-light ">
      <div>
        <h1 className="h3 mb-2">{title}</h1>
        <span style={{ color: "#565656" }}>
          পরিবার পরিকল্পনা স্মার্ট মনিটরিং সিস্টেম
        </span>
      </div>

      <div className="user-info d-flex align-items-center gap-2">
        <div>
          <p className="mb-0">আরিফুর রহমান</p>
          <p className="mb-0">ইউএফপিও</p>
        </div>
        <img
          src={profile}
          alt="User"
          className="rounded-circle me-2"
          style={{ width: "50px", height: "50px" }}
        />
      </div>
    </div>
  );
};

export default Header;
