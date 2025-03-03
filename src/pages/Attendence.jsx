import { SlLocationPin } from "react-icons/sl";
import Header from "../Components/Header";
import officer from "../assets/officer.png"

const Attendence = () => {
  const presenlist = [
    {
      name: "ফারজানা খানম",
      presentcount: "৪ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      name: "লায়লা বেগম",
      presentcount: "২ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      name: "ফারজানা খানম",
      presentcount: "৩ টি",
      status: "দেরীতে উপস্থিত",
    },
    {
      name: "ফারজানা খানম",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      name: "লায়লা বেগম",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      name: "রানীর ঝড়ু",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      name: "রানীর ঝড়ু",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      name: "লায়লা বেগম",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      name: "ফারজানা খানম",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      name: "লায়লা বেগম",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      name: "রানীর ঝড়ু",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      name: "রানীর ঝড়ু",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    {
      name: "লায়লা বেগম",
      presentcount: "১ টি",
      status: "সঠিক সময়ে উপস্থিত",
    },
    
    
    
  ];

  const events = [
    { location: "যাত্রী পরিষদমন্দির", time: "০৯:২০" },
    { location: "বাজার মোড়", time: "১০:০০" },
    { location: "নতুন পাড়া", time: "১১:৩০" },
    { location: "বাজার মোড়", time: "১০:০০" },
    { location: "নতুন পাড়া", time: "১১:৩০" },
    { location: "বাজার মোড়", time: "১০:০০" },
    { location: "নতুন পাড়া", time: "১১:৩০" },
    // Add more events as needed
  ];

  const containerStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "row",
  };

  const leftSectionStyle = {
    height: "500px", // Fixed height of 500px
    width: "60%", // 60% width
    padding: "10px",
    backgroundColor:"#ffffff",
    // Enable vertical scrolling when content exceeds height
    borderRight: "1px solid #ccc", // Add a border to separate sections
  };

  const rightSectionStyle = {
    height: "500px", // Fixed height of 500px
    width: "40%", // 40% width
    padding: " 20px",
    fontWeight:"600",
    backgroundColor:"#ffffff",
    overflowY:"auto"

    // Enable vertical scrolling when content exceeds height
  };

  const cardStyle = {
    borderRadius: "5px",
    marginBottom: "10px",
  };

  const cardHeaderStyle = {
    padding: "10px",
    fontWeight: "bold",
    fontSize: "16px",
    color:"#13007D"
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
    backgroundColor: "#f9f9f9", // Light background color
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Subtle shadow for depth
  };

  const cardBodyStyle = {
    // margin: '15px',
  };

  const iconStyle = {
    backgroundColor: "#e7e7ff", // Light purple background for the icon
    color: "#857CBC", // Purple color for the icon
    // borderRadius: '50%',
    width: "50px",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // marginRight: '10px',
  };

  const textStyle = {
    fontSize: "14px",
    color: "#333",
  };

  const timeStyle = {
    fontSize: "12px",
    color: "#777",
  };
  const convertToBangla = (number) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
      .toString()
      .split("")
      .map((digit) => banglaDigits[parseInt(digit)])
      .join("");
  };

  return (
    <div>
      <Header title={"উপস্থিতি"} />
      <div className="dashboard p-3" >
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <div className="row g-6">
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px]">তারিখ</label>
              <input
                type="date"
                className="form-control"
                aria-label="Select date"
                style={{ borderRadius: "5px" }} // Optional: Customize border radius if needed
              />
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                পদবী
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>পদবী</option>
                <option value="1">এফডব্লিউএ</option>
              </select>
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                জেলা
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>জেলা</option>
                <option value="1">চট্টগ্রাম</option>
              </select>
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                উপজেলা
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>উপজেলা</option>
                <option value="1">আনোয়ারা</option>
              </select>
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                ইউনিয়ন
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>ইউনিয়ন</option>
                <option value="1">কুশাখালি</option>
              </select>
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                ইউনিট
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>ইউনিট</option>
                <option value="1">১ক</option>
              </select>
            </div>
          </div>
        </div>
        <hr />

        {/* Two Sections */}
        <div style={cardHeaderStyle}>উপস্থিতি তালিকা</div>
        <div style={containerStyle}>
          {/* Left Section */}
          <div style={leftSectionStyle}>
            <div style={cardStyle}>
              <div className="table-container" >
                <div
                  className="table-responsive"
                  style={scrollableContentStyle}
                >
                  <table className="table" style={{ width: "100%" }}>
                    <thead
                      style={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#fff",
                        zIndex: 1,
                      }}
                    >
                      <tr>
                        <th
                          style={{
                            color: "#323232",
                            position: "sticky",
                            top: 0,
                            backgroundColor: "#fff",
                          }}
                        >
                          নাম
                        </th>
                        <th
                          style={{
                            color: "#323232",
                            position: "sticky",
                            top: 0,
                            backgroundColor: "#fff",
                          }}
                        >
                          উপস্থিতি দিয়েছে
                        </th>
                        <th
                          style={{
                            color: "#323232",
                            position: "sticky",
                            top: 0,
                            backgroundColor: "#fff",
                          }}
                        >
                          উপস্থিতি স্ট্যাটাস
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {presenlist.map((item, index) => (
                        <tr
                          key={index}
                          style={{ borderBottom: "1px solid #ddd" }}
                        >
                          <td>{item.name}</td>
                          <td>{item.presentcount}</td>
                          <td>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div style={rightSectionStyle} data-bs-toggle="modal"
              data-bs-target="#officerModal">
            <p style={{ fontSize: "14px", color: "#565656" }}>ফারজানা খানম</p>
            {events.map((event, index) => (
              <div key={index} style={rightCardStyle}>
                <div style={cardBodyStyle}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={iconStyle}>
                      <SlLocationPin /> {/* FontAwesome icon */}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "10px",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
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
      {/* modal */}

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

export default Attendence;
