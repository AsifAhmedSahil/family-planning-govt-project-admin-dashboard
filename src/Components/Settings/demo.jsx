import React, { useState } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';

const Notice = () => {
  const [notices, setNotices] = useState([
    {
      id: 5,
      publish_date: "2025-03-20T18:00:00.000Z",
      notice_name: "মস্ত কর্মকর্তা-কর্মচারীদের অব",
      notice_description: "মস্ত কর্মকর্তা-কর্মচারীদের অবগতির জন্য জানানো যাচ্ছে যে...",
      createDate: "2025-03-11T08:57:28.000Z",
      updateDate: "2025-03-11T08:57:28.000Z"
    },
    {
      id: 3,
      publish_date: "2025-03-12T18:00:00.000Z",
      notice_name: "সমস্ত কর্মকর্তা-কর্মচারীদের",
      notice_description: "সমস্ত কর্মকর্তা-কর্মচারীদের অবগতির জন্য জানানো যাচ্ছে যে...",
      createDate: "2025-03-11T08:56:13.000Z",
      updateDate: "2025-03-11T08:56:13.000Z"
    }
  ]); // Sample notices array for demonstration

  const [dropdownIndex, setDropdownIndex] = useState(null);

  const handleToggleDropdown = (index) => {
    // If clicking the same item, toggle the dropdown, else open the clicked one
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleDelete = (id) => {
    console.log("Deleting notice with id:", id);
    // Handle your delete logic here
  };

  const handleUpdate = (id) => {
    console.log("Updating notice with id:", id);
    // Handle your update logic here
  };

  return (
    <div>
      {notices.map((card, index) => (
        <div key={index} style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "10px" }}>
              <FaClipboardList size={25} fill="#13007D" />
            </div>
            <div style={{ padding: "10px", position: "relative" }}> {/* This makes sure the dropdown is positioned relative to this container */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>{new Date(card.publish_date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <span style={{ cursor: "pointer" }} onClick={() => handleToggleDropdown(index)}>
                  <HiDotsVertical />
                </span>
              </div>
              <p>{card.notice_description}</p>

              {dropdownIndex === index && (
                <div
                  style={{
                    position: "absolute",  // Absolute position to place the dropdown below the icon
                    top: "100%",  // Position it directly below the icon
                    right: 0,  // Align it to the right side of the container
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    borderRadius: "5px",
                    zIndex: 10,
                    width: "150px",  // Set width for the dropdown
                    marginTop: "5px", // Optional: Add a little space between the dots and the dropdown
                  }}
                >
                  <button
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "none",
                      backgroundColor: "#f8d7da",
                      color: "#721c24",
                      borderBottom: "1px solid #ddd",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(card.id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "none",
                      backgroundColor: "#d4edda",
                      color: "#155724",
                      cursor: "pointer",
                    }}
                    onClick={() => handleUpdate(card.id)}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notice;
