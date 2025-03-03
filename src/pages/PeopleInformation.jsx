import { useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

import Header from "../Components/Header";
import officer from "../assets/officer.png";
import { FaRegEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PeopleInformation = () => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    // Navigate to the individual person's details page
    navigate(`/person/${id}`);
  };
  const [data, setData] = useState([
    {
      id:"001",
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      id:"002",
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      id:"003",
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      id:"004",
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      id:"005",
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      id:"005",
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      id:"006",
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      id:"006",
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      id:"007",
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      id:"008",
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      id:"009",
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
    {
      id:"0010",
      name: "সাব্বির আহমেদ",
      mobile: "০১৮২৯৩৩৭৫৯৯",
      nid: "২৯৩৩৭৫৯৯",
      address: "শাকপাড়া, পূর্ব হাটহাজারী, ফতেয়াবাদ, চট্টগ্রাম",
    },
  ]);

  const convertToBangla = (number) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
      .toString()
      .split("")
      .map((digit) => banglaDigits[parseInt(digit)])
      .join("");
  };

  const initialFormData = {
    title: "পদবী",
    district: "জেলা",
    upazila: "উপজেলা",
    union: "ইউনিয়ন",
    unit: "ইউনিট",
    officerName: "",
    officerId: "",
    officerEmail: "",
    address: "",
    image: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData);
    setFormData(initialFormData);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleImageChange = (e) => {
    const { id, files } = e.target;
    setFormData({
      ...formData,
      [id]: files[0], // Store the selected file (if any)
    });
  };
  
  return (
    <div>
      <Header title={"কর্মকর্তার তথ্য"} />
      <div className="dashboard p-3 " style={{ backgroundColor: "#FFFFFF" }}>
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <div className="row g-6 ">
            {" "}
            {/* g-6 adds gap between columns */}
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px] " style={{ color: "#323232" }}>
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
              <label className="mb-2 text-[16px] " style={{ color: "#323232" }}>
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
              <label className="mb-2 text-[16px] " style={{ color: "#323232" }}>
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
              <label className="mb-2 text-[16px] " style={{ color: "#323232" }}>
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
                <option selected> ইউনিট</option>
                <option value="1">১ক</option>
              </select>
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px] "></label>
              <button
                type="button"
                className="btn w-100 text-white mt-4"
                style={{ backgroundColor: "#13007D" }}
                data-bs-toggle="modal"
                data-bs-target="#officerModal"
              >
                কর্মকর্তা যোগ করুন
              </button>
            </div>
          </div>
        </div>

        <div className="table-container" style={{ margin: "26px" }}>
          <div
            className="table-responsive"
            style={{ maxHeight: "500px", overflowY: "auto" }}
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
                    আইডি
                  </th>
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
                    মোবাইল
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    জাতীয় পরিচয়পত্র
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    ঠিকনা
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    ছবি
                  </th>

                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  ></th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}   >
                    
                    <td style={{ color: "#6C6C6C" }}>
                      {convertToBangla(item.id)}
                    </td>
                    <td style={{ color: "#6C6C6C" }}>{item.name}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.mobile}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.nid}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.address}</td>
                    <td>
                      <img
                        src={officer}
                        alt="officer"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>

                    <td>
                      <FaRegEye
                        size={20}
                        onClick={() => handleRowClick(item.id)}
                        style={{ color: "gray", cursor: "pointer" }}
                      />
                    </td>
                    <td>
                      <FaEdit
                        size={20}
                        style={{ color: "gray", cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="officerModal"
        tabIndex="-1"
        aria-labelledby="officerModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          style={{
            width: "90%", // Set the width of the modal to 70%
            height: "70%", // Set the height of the modal to 70%
            maxHeight: "90vh", // Ensure the modal's height doesn't exceed 90% of the viewport
            maxWidth: "70vw", // Ensure the modal's height doesn't exceed 90% of the viewport
            marginLeft: "auto", // Center the modal horizontally
            marginRight: "auto", // Center the modal horizontally
          }}
        >
          <div className="modal-content" style={{ padding: "30px" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="officerModalLabel">
                কর্মকর্তা তথ্য যোগ করুন
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="filter mb-4" style={{ margin: "26px" }}>
              <div className="row g-5 ">
                <div className="col-md-2 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px] "
                    style={{ color: "#323232" }}
                  >
                    পদবী
                  </label>
                  <select
                    name="title"
                    className="form-select"
                    value={formData.title}
                    onChange={handleInputChange}
                  >
                    <option value="পদবী">পদবী</option>
                    <option value="এফডব্লিউএ">এফডব্লিউএ</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px] "
                    style={{ color: "#323232" }}
                  >
                    জেলা
                  </label>
                  <select
                    name="district"
                    className="form-select"
                    value={formData.district}
                    onChange={handleInputChange}
                  >
                    <option value="জেলা">জেলা</option>
                    <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px] "
                    style={{ color: "#323232" }}
                  >
                    উপজেলা
                  </label>
                  <select
                    name="upazila"
                    className="form-select"
                    value={formData.upazila}
                    onChange={handleInputChange}
                  >
                    <option value="উপজেলা">উপজেলা</option>
                    <option value="আনোয়ারা">আনোয়ারা</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px] "
                    style={{ color: "#323232" }}
                  >
                    ইউনিয়ন
                  </label>
                  <select
                    name="union"
                    className="form-select"
                    value={formData.union}
                    onChange={handleInputChange}
                  >
                    <option value="ইউনিয়ন">ইউনিয়ন</option>
                    <option value="কুশাখালি">কুশাখালি</option>
                  </select>
                </div>
                <div className="col-md-2 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px]"
                    style={{ color: "#323232" }}
                  >
                    ইউনিট
                  </label>
                  <select
                    name="unit"
                    className="form-select"
                    value={formData.unit}
                    onChange={handleInputChange}
                  >
                    <option value="ইউনিট"> ইউনিট</option>
                    <option value="১ক">১ক</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              className="modal-body"
              style={{
                maxHeight: "60vh", // Set max-height of the modal body to 60% of the viewport
                overflowY: "auto", // Make the content scrollable if it exceeds the max height
              }}
            >
              {/* Form or content here */}
              <form onSubmit={handleFormSubmit}>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="officerName" className="form-label">
                      কর্মকর্তা নাম
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="officerName"
                      placeholder="কর্মকর্তার নাম লিখুন"
                      value={formData.officerName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="officerId" className="form-label">
                      মোবাইল
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="officerId"
                      placeholder="কর্মকর্তার মোবাইল"
                      value={formData.officerId}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="officerEmail" className="form-label">
                      জাতীয় পরিচয়পত্র
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="officerEmail"
                      placeholder="কর্মকর্তার জাতীয় পরিচয়পত্র"
                      value={formData.officerEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="address" className="form-label">
                      ঠিকানা
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="ঠিকানা লিখুন"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="image" className="form-label">
                      ছবি
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      placeholder="সংযুক্ত করুন"
                      id="image"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary text-white mt-4"
                    style={{ backgroundColor: "#13007D" }}
                  >
                    কর্মকর্তা যোগ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleInformation;


