import Header from "../Components/Header";
import { MdDelete } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

const Notice = () => {
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const handleToggleDropdown = (index) => {
    // If clicking the same item, toggle the dropdown, else open the clicked one
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const [formData, setFormData] = useState({
    date: "",
    noticeName: "",
    notice: "",
  });

  const [notices, setNotices] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have a state object `formData` with the necessary fields
    const { date, noticeName, notice } = formData;
    console.log(formData);

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        "http://localhost:5000/api/other/add-notice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            publish_date: date, // from the form
            notice_name: noticeName, // from the form
            notice_description: notice, // from the form
          }),
        }
      );

      console.log(response);
      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        // Optionally, reset the form or perform other actions
        setFormData({
          date: "",
          noticeName: "",
          notice: "",
        });
      } else {
        const errorResult = await response.json();
        console.error("Error:", errorResult);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchNotices = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "http://localhost:5000/api/other/get-notice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setNotices(result.notices);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching notices:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    // Create a new Date object from the string
    const date = new Date(dateString);

    // Format the date to Bengali (Bangladesh locale)
    const formatter = new Intl.DateTimeFormat("bn-BD", options);

    // Format and return the date as a string
    return formatter.format(date);
  };

  const leftSectionStyle = {
    width: "30%",
    height: "700px",
    // backgroundColor: '#f9f9f9',
    padding: "20px",
    // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderRight: "1px solid #ddd",
  };

  const rightSectionStyle = {
    width: "70%",
    height: "700px",
    // backgroundColor: '#ffffff',
    padding: "20px",
    overflowY: "auto",
    maxHeight: "80vh", // Adjust based on your layout needs
  };

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "10px",
    // padding: "15px",
    backgroundColor: "#e9ecef",
  };

  const iconStyle = {
    backgroundColor: "#E7E6F2",
    color: "#857CBC",
    width: "120px",
    height: "155px",
    display: "flex",
    // alignItems: "center",
    paddingTop: "10px",
    justifyContent: "center",
  };

  console.log(notices);

  return (
    <div>
      <Header title={"নোটিশ"} />
      <div style={{ display: "flex", marginTop: "50px" }}>
        {/* Left Section */}
        <form onSubmit={handleSubmit} style={leftSectionStyle}>
          <div className="col-md-12 d-flex flex-column mb-3">
            <label className="mb-2 text-[16px]">তারিখ</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              aria-label="Select date"
              style={{ borderRadius: "5px" }}
            />
          </div>
          <div className="col-md-12 d-flex flex-column mb-3">
            <label className="mb-2 text-[16px]">নোটিশের নাম</label>
            <textarea
              className="form-control"
              name="noticeName"
              value={formData.noticeName}
              onChange={handleInputChange}
              aria-label="Enter notice"
              placeholder="নোটিশের নাম লিখুন"
              style={{
                borderRadius: "5px",
                height: "80px",
                resize: "none",
                paddingTop: "10px",
              }}
            />
          </div>
          <div className="col-md-12 d-flex flex-column mb-3">
            <label className="mb-2 text-[16px]">নোটিশ</label>
            <textarea
              className="form-control"
              name="notice"
              value={formData.notice}
              onChange={handleInputChange}
              aria-label="Enter notice"
              placeholder="নোটিশ লিখুন"
              style={{
                borderRadius: "5px",
                height: "300px",
                resize: "none",
                paddingTop: "10px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#13007D",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            নোটিশ দিন
          </button>
        </form>

        {/* Right Section */}
        <div style={rightSectionStyle}>
          <h4 style={{ marginBottom: "20px" }}>পূর্বের নোটিশ</h4>
          {notices.map((card, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            >
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "10px" }}>
                  <FaClipboardList size={25} fill="#13007D" />
                </div>
                <div style={{ padding: "10px", position: "relative" }}>
                  {" "}
                  {/* This makes sure the dropdown is positioned relative to this container */}
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>
                      {new Date(card.publish_date).toLocaleDateString("bn-BD", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                   <div >
                   <span style={{ cursor: "pointer",marginRight:"10px" }}>
                      <MdDelete size={20} />
                    </span>
                    <span style={{ cursor: "pointer" }}>
                      <FaEdit size={20} />
                    </span>
                   </div>
                  </div>
                  
                  <p style={{fontWeight:"600"}}>{card.notice_name}</p>
                  <p>{card.notice_description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notice;
