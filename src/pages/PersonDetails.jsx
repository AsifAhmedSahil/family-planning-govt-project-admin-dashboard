import { useEffect, useState } from "react";
import Header from "../Components/Header";
import DatePicker from "react-datepicker"; // Import DatePicker component
import "react-datepicker/dist/react-datepicker.css";
import { SlLocationPin } from "react-icons/sl";
import { FaRegTrashAlt } from "react-icons/fa";
import officer from "../assets/officer.png";
import { useParams } from "react-router-dom";

const PersonDetails = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const {emp_id} = useParams()
  console.log(emp_id)

  const presenlist = [
    {
      presentDate: "১২ আগষ্ট, ২০২৪",
      presentcount: "৪ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      presentDate: "১২ আগষ্ট, ২০২৪",
      presentcount: "২ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      presentDate: "১২ আগষ্ট, ২০২৪",
      presentcount: "৩ টি",
      status: "দেরীতে উপস্থিত",
    },
    {
      presentDate: "১২ আগষ্ট, ২০২৪",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      presentDate: "১২ আগষ্ট, ২০২৪",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      presentDate: "১২ আগষ্ট, ২০২৪",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      presentDate: "১২ আগষ্ট, ২০২৪",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      presentDate: "১২ আগষ্ট, ২০২৪",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      presentDate: "১২ আগষ্ট, ২০২৪",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      presentDate: "১২ আগষ্ট, ২০২৪",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
  ];

  const events = [
    { location: "যাত্রী পরিষদমন্দির", time: "০৯:২০" },
    { location: "বাজার মোড়", time: "১০:০০" },
    { location: "নতুন পাড়া", time: "১১:৩০" },
  ];

  const [employee ,setEmployee] = useState([])

  const containerStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "row",
  };

  const leftSectionStyle = {
    height: "500px", // Fixed height of 500px
    width: "60%", // 60% width
    padding: "10px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #ccc", // Add a border to separate sections
  };

  const rightSectionStyle = {
    height: "500px", // Fixed height of 500px
    width: "40%", // 40% width
    padding: "20px",
    fontWeight: "600",
    backgroundColor: "#ffffff",
    overflowY: "auto",
  };

  const cardStyle = {
    borderRadius: "5px",
    marginBottom: "10px",
  };

  const scrollableContentStyle = {
    maxHeight: "calc(500px - 56px)", // Adjust for card header height
    overflowY: "auto",
    padding: "10px",
  };

  const tableStyle = {
    width: "100%",
  };

  const badgeSuccessStyle = {
    backgroundColor: "#CEFFEA",
    color: "#00BE57",
    padding: "5px 10px",
    borderRadius: "5px",
  };

  const badgeDangerStyle = {
    backgroundColor: "#FFCECE",
    color: "#FF4747",
    padding: "5px 10px",
    borderRadius: "5px",
  };

  const rightCardStyle = {
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const iconStyle = {
    backgroundColor: "#e7e7ff",
    color: "#857CBC",
    width: "50px",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const textStyle = {
    fontSize: "14px",
    color: "#333",
  };

  const timeStyle = {
    fontSize: "12px",
    color: "#777",
  };
  const cardBodyStyle = {
    // margin: '15px',
  };

  const convertToBangla = (number) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
      .toString()
      .split("")
      .map((digit) => banglaDigits[parseInt(digit)])
      .join("");
  };
  const fetchEmployee = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/employee/get-employee-by-id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
           id:emp_id
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setEmployee(result); // Assuming you have a state variable `employees` to store the result
      } else {
        const errorResult = await response.json();
        console.error("Error fetching employees:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(()=>{
    fetchEmployee()
  },[])
  console.log(employee)

  return (
    <div>
      <Header title={"কর্মকর্তার তথ্য"} />
      <div className="dashboard p-3 " style={{ backgroundColor: "#FFFFFF" }}>
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#13007D",
              paddingBottom: "20px",
            }}
          >
            {employee?.name}
          </h3>
          <div
            className="col-md-4 d-flex flex-column mb-3"
            style={{ paddingBottom: "20px" }}
          >
            <label className="mb-2 text-[16px]">তারিখ</label>
            <div style={{ display: "flex", gap: "10px" }}>
              {/* Start Date Picker */}
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="Start Date"
                style={{ borderRadius: "5px" }} // Higher z-index
              />
              {/* End Date Picker */}
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="End Date"
                style={{ borderRadius: "5px" }} // Higher z-index
                minDate={startDate} // Ensure end date cannot be before start date
              />
            </div>
          </div>

          <div style={containerStyle}>
            {/* Left Section */}
            <div style={leftSectionStyle}>
              <div style={cardStyle}>
                <div className="table-container">
                  <div
                    className="table-responsive"
                    style={scrollableContentStyle}
                  >
                    <table className="table" style={tableStyle}>
                      <thead
                        style={{
                          position: "sticky",
                          top: 0,
                          backgroundColor: "#fff",
                        }}
                      >
                        <tr>
                          <th
                            style={{
                              color: "#323232",
                              backgroundColor: "#fff",
                            }}
                          >
                            তারিখ
                          </th>
                          <th
                            className="text-center"
                            style={{
                              color: "#323232",
                              backgroundColor: "#fff",
                            }}
                          >
                            উপস্থিতি দিয়েছে
                          </th>
                          <th
                            className="text-center"
                            style={{
                              color: "#323232",
                              backgroundColor: "#fff",
                            }}
                          >
                            উপস্থিতি স্ট্যাটাস
                          </th>
                          <th
                            style={{
                              color: "#323232",
                              backgroundColor: "#fff",
                            }}
                          ></th>
                        </tr>
                      </thead>

                      <tbody>
                        {presenlist.map((item, index) => (
                          <tr
                            key={index}
                            style={{
                              borderBottom: "1px solid #ddd",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                            }}
                          >
                            <td>{item.presentDate}</td>
                            <td className="text-center">{item.presentcount}</td>
                            <td className="text-center">
                              <span
                                style={
                                  item.status === "সঠিক সময়ে উপস্থিত"
                                    ? badgeSuccessStyle
                                    : badgeDangerStyle
                                }
                              >
                                {item.status}
                              </span>
                            </td>
                            <td
                              style={{
                                color: "red",
                                cursor: "pointer",
                                fontSize: "20px",
                              }}
                            >
                              <FaRegTrashAlt />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div
              style={rightSectionStyle}
              data-bs-toggle="modal"
              data-bs-target="#officerModal"
            >
              <p style={{ fontSize: "14px", color: "#565656" }}>ফারজানা খানম</p>
              {events.map((event, index) => (
                <div key={index} style={rightCardStyle}>
                  <div style={cardBodyStyle}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={iconStyle}>
                        <SlLocationPin />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          padding: "10px",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div style={textStyle}>{event.location}</div>
                          <div style={timeStyle}>সময় - {event.time}</div>
                        </div>
                        <div style={{ fontWeight: "bold", color: "#323232" }}>
                          {convertToBangla(index + 1)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="officerModal"
        tabIndex="-1"
        aria-labelledby="officerModalLabel"
        aria-hidden="true"
        style={{ overflowX: "hidden" }}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          style={{
            width: "70%", // Set the width of the modal to 70%
            height: "70%", // Set the height of the modal to 70%
            maxHeight: "90vh", // Ensure the modal's height doesn't exceed 90% of the viewport
            maxWidth: "60vw", // Ensure the modal's height doesn't exceed 90% of the viewport
            marginLeft: "auto", // Center the modal horizontally
            marginRight: "auto", // Center the modal horizontally
          }}
        >
          <div className="modal-content" style={{ padding: "30px" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="officerModalLabel">
                {/* Modal Title */}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ overflowX: "hidden" }}>
              {/* Modal Content */}
              <div className="row g-5">
                <div className="col-md-3 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px]"
                    style={{ color: "#13007D" }}
                  >
                    কাজের ক্ষেত্র
                  </label>
                  <p>বাড়ি পরিদর্শন</p>
                </div>
                <div className="col-md-3 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px]"
                    style={{ color: "#13007D" }}
                  >
                    দম্পতি নাম্বার
                  </label>
                  <p>১২০৯১১২</p>
                </div>
                <div className="col-md-3 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px]"
                    style={{ color: "#13007D" }}
                  >
                    দম্পতির নাম
                  </label>
                  <p>মাসুমা সুলতানা</p>
                </div>
                <div className="col-md-3 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px]"
                    style={{ color: "#13007D" }}
                  >
                    স্বামীর নাম
                  </label>
                  <p>আবদুল বাতেন</p>
                </div>
              </div>
              <div className="row g-5">
                <div className="col-md-3 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px]"
                    style={{ color: "#13007D" }}
                  >
                    ছেলে-মেয়ের সংখ্যা
                  </label>
                  <p>৩ জন</p>
                </div>
                <div className="col-md-3 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px]"
                    style={{ color: "#13007D" }}
                  >
                    পদ্ধতির নাম
                  </label>
                  <p>খাবার বড়ি</p>
                </div>
                <div className="col-md-3 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px]"
                    style={{ color: "#13007D" }}
                  >
                    মোবাইল নাম্বার
                  </label>
                  <p>মাসুমা সুলতানা</p>
                </div>
                <div className="col-md-3 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px]"
                    style={{ color: "#13007D" }}
                  >
                    সংক্ষিপ্ত ঠিকানা
                  </label>
                  <p>জামতলা, বাতেন বাড়ি</p>
                </div>
              </div>
              <div className="row g-5">
                <div className="col-md-3 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px]"
                    style={{ color: "#13007D" }}
                  >
                    ছবি
                  </label>
                  <p>
                    <img
                      src={officer}
                      alt="officer"
                      style={{ width: "150px", height: "150px" }}
                    />
                  </p>
                </div>
                <div className="col-md-6 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px]"
                    style={{ color: "#13007D" }}
                  >
                    বিবরন
                  </label>
                  <p>
                    এই দম্পতিকে জন্মনিয়ন্ত্রনের পরামর্শ দেয়া হয়েছে, কিছু
                    জন্মনিয়ন্ত্রক বড়ি দেয়া হয়েছে
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
