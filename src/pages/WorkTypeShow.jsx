import Header from "../Components/Header";

import Select from "react-select";
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css"; // Importing DatePicker styles

import { CDateRangePicker } from "@coreui/react-pro";
import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const WorkTypeShow = () => {
  const [designation, setDesignation] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  const [units, setUnits] = useState([]);
  const [workTypeData, setWorkTypeData] = useState([]);
  const [workLists, setWorkLists] = useState(null);
  const [employeeName, setEmployeeName] = useState(null);
  

  const [modalItem, setModalItem] = useState([]);
 

  const [formData, setFormData] = useState({
    designation_name: "",
    district: "",
    upazila_name: "",
    union_name: "",
    unit_name: "",
    startDate: null, // Store start date
    endDate: null, // Store end date
  });

  const fetchDesignation = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/get-designations`,
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
        setDesignation(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching designation:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching designation:", error);
    }
  };

  const fetchUpazilas = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/get-upazilas`,
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
        setUpazilas(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching upazilas:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching upazilas:", error);
    }
  };

  const fetchUnions = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/get-unions`,
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
        setUnions(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching unions:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching unions:", error);
    }
  };

  const fetchUnits = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/get-units`,
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
        setUnits(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching units:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  useEffect(() => {
    fetchDesignation();
    fetchUpazilas();
    fetchUnions();
    fetchUnits();
  }, []);

  const designationOptions = designation.map((desig) => ({
    id: desig.id,
    label: desig.name,
  }));

  const handleDesignationChange = (selectedOption) => {
    setFormData({
      ...formData,
      designation_name: selectedOption ? selectedOption.label : null,
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleUpazilaChange = (selectedOption) => {
    setFormData({
      ...formData,
      upazila_name: selectedOption ? selectedOption.label : null,
    });
  };
  const upazilaOptions = upazilas.map((upazila) => ({
    id: upazila.id,
    label: upazila.name,
  }));

  const unionOptions = unions.map((union) => ({
    id: union.id,
    label: union.name,
  }));

  const unitOptions = units.map((unit) => ({
    id: unit.id,
    label: unit.name,
  }));

  const handleUnionChange = (selectedOption) => {
    setFormData({
      ...formData,
      union_name: selectedOption ? selectedOption.label : null,
    });
  };

  const handleUnitChange = (selectedOption) => {
    setFormData({
      ...formData,
      unit_name: selectedOption ? selectedOption.label : null,
    });
  };

  const fetchAttendance = async () => {
    const token = localStorage.getItem("authToken");
    const {
      startDate,
      endDate,
      designation_name,
      district,
      upazila_name,
      union_name,
      unit_name,
    } = formData;

    // Ensure both startDate and endDate are selected
    if (!startDate || !endDate) {
      console.error("Start date and end date are mandatory!");
      return;
    }

    const requestBody = {
      designation: designation_name,
      district: district,
      upazila: upazila_name,
      union: union_name,
      unit: unit_name,
      search: "",
      startDate: startDate.toISOString(), // Send startDate as ISO string
      endDate: endDate.toISOString(), // Send endDate as ISO string
    };

    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/report/get-work-with-filter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log(response);
      if (response.ok) {
        const result = await response.json();
        console.log(result); // Handle the response data here
        setWorkTypeData(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching attendance:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  // Trigger API call when filter is changed
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      fetchAttendance(); // Call the API when the formData is updated and both dates are set
    }
  }, [formData]);

  console.log(workTypeData);

  //   import { useState } from 'react';
  const handleWorkClick = async (workId) => {
    console.log("handleWorkClick called with workId:", workId);
    // console.log("Item:", item);

    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${
          import.meta.env.REACT_APP_BASE_URL
        }/api/report/get-work-info-with-id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            work_id: workId,
          }),
        }
      );

      console.log(response);
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        const extractedData = result.map((item) => ({
          work_field: item.work_field,
          value: item.value,
          
        }));

        setModalItem(extractedData);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching designation:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching designation:", error);
    }
  };

  console.log(modalItem);

  // Function to handle the row click event
  const handleRowClick = (workList, name) => {
    // Parse the attendanceDetails from JSON if it's a string
    setWorkLists(JSON.parse(workList));
    
    setEmployeeName(name);
  };

  console.log(formData);

  const cardHeaderStyle = {
    padding: "10px",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#13007D",
  };

  const convertToBangla = (number) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
      .toString()
      .split("")
      .map((digit) => banglaDigits[parseInt(digit)])
      .join("");
  };

  // Function to extract time from the createDate field in 12-hour format with AM/PM
  const getTimeFromCreateDate = (createDate) => {
    const date = new Date(createDate);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // This ensures the time is in 12-hour format with AM/PM
    });
  };

  return (
    <div>
      <Header title={"কাজের ক্ষেত্র"} />
      <div className="dashboard p-3">
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <div className="row g-6">
            <div className="col-md-2 d-flex flex-column mb-3">
              {/* <label className="mb-2 text-[16px]">তারিখ</label> */}
              <div>
                <CDateRangePicker
                  label="তারিখ"
                  locale="en-US"
                  onStartDateChange={(date) => {
                    // Updating formData with the selected start date
                    setFormData((prevData) => ({
                      ...prevData,
                      startDate: date,
                    }));
                  }}
                  onEndDateChange={(date) => {
                    // Updating formData with the selected end date
                    setFormData((prevData) => ({ ...prevData, endDate: date }));
                  }}
                />
              </div>
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                পদবী
              </label>
              <Select
                options={designationOptions}
                value={designationOptions.find(
                  (option) => option.label === formData.designation_name
                )}
                onChange={handleDesignationChange}
                isClearable
                placeholder="Select"
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.label}
              />
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                জেলা
              </label>
              <select
                name="district"
                className="form-select"
                value={formData.district}
                onChange={handleInputChange}
              >
                <option value="চট্টগ্রাম">চট্টগ্রাম</option>
              </select>
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                উপজেলা
              </label>
              <Select
                options={upazilaOptions}
                value={upazilaOptions.find(
                  (option) => option.label === formData.upazila_name
                )}
                onChange={handleUpazilaChange}
                isClearable
                placeholder="Select upazila"
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.label}
              />
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                ইউনিয়ন
              </label>
              <Select
                options={unionOptions}
                value={unionOptions.find(
                  (option) => option.label === formData.union_name
                )}
                onChange={handleUnionChange}
                isClearable
                placeholder="Select Union"
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.label}
              />
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
                ইউনিট
              </label>
              <Select
                options={unitOptions}
                value={unitOptions.find(
                  (option) => option.label === formData.unit_name
                )}
                onChange={handleUnitChange}
                isClearable
                placeholder="Select unit"
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.label}
              />
            </div>
          </div>
        </div>
        <hr />

        <div style={cardHeaderStyle}>উপস্থিতি তালিকা</div>
        <div
          className="dashboard p-3"
          style={{
            backgroundColor: "#FFFFFF",
            display: "flex",
            flex: 1,
            borderRadius:"12px"
          }}
        >
          {/* left side */}
          <div
            style={{
              width: "30%",
              padding: "20px",
              borderRight: "1px solid #ddd",
              overflowY: "auto",
              height: "500px",
            }}
          >
            <div className="table-container" style={{ margin: "26px" }}>
              <div
                className="table-responsive"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                {workTypeData && workTypeData.length > 0 ? (
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
                            width: "50%",
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
                          মোট কাজের ক্ষেত্র
                        </th>

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
                      {workTypeData?.map((item, index) => (
                        <tr
                          key={index}
                          onClick={() =>
                            handleRowClick(item.workList, item.name)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <td style={{ color: "#6C6C6C" }}>{item.name}</td>
                          <td style={{ color: "#6C6C6C" }}>
                            {convertToBangla(item.totalworks)}
                          </td>
                          {/* <td style={{ color: "#6C6C6C" }}>{item.role}</td> */}

                          <td>
                            <FaLongArrowAltRight
                              size={20}
                              style={{ color: "gray", cursor: "pointer" }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      fontSize: "18px",
                      color: "#6C6C6C",
                      fontWeight: "bold",
                    }}
                  >
                    Please select a date
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* right side */}
          <div
            style={{
              width: "70%",
              height: "500px",
              // padding: "20px",
              overflowY: "auto",
            }}
          >
            <div className="table-container" style={{ margin: "26px" }}>
              <div
                className="table-responsive"
                style={{ maxHeight: "500px", overflowY: "auto" }}
              >
                {employeeName && (
                  <label
                    style={{
                      fontWeight: "600",
                      color: "#565656",
                      paddingBottom: "20px",
                    }}
                  >
                    {employeeName}
                  </label>
                )}
                {workLists && workLists.length > 0 ? (
                  <table className="table" style={{ width: "100%" }}>
                    <tbody>
                      {workLists?.map((item) => (
                        <div
                          key={item.work_id}
                          className="card"
                          style={{
                            borderRadius: "16px",
                            backgroundColor: "#fff",
                            border: "1px solid #ddd", // Adjust border color for a lighter appearance
                            marginBottom: "15px", // Add margin between cards for better separation
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for better emphasis
                          }}
                        >
                          <div className="card-body p-3" style={{borderRadius:"14px",}}> 
                            <div className="d-flex align-items-center">
                              {/* Profile Icon Section */}
                              <div
                                className="d-flex justify-content-center align-items-center me-3"
                                style={{
                                  width: "36px",
                                  height: "36px",
                                  borderRadius: "50%",
                                  
                                  backgroundColor: "#f0f1ff",
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  fill="#6366f1"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                </svg>
                              </div>

                              {/* Work Type and Time Section */}
                              <div className="flex-grow-1">
                                <div
                                  className="fw-medium"
                                  style={{ fontSize: "15px", color: "#333" }}
                                >
                                  {item.work_type}
                                </div>
                                <div
                                  className="text-muted"
                                  style={{ fontSize: "14px" }}
                                >
                                  সময়: {getTimeFromCreateDate(item.createDate)}
                                </div>
                              </div>

                              {/* Icon Section */}
                              <div
                                data-bs-toggle="modal"
                                data-bs-target="#officerModal"
                              >
                                <FaRegEye
                                  size={20}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleWorkClick(item.work_id)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </tbody>
                  </table>
                ) : ( 
                  <div
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      marginTop: "20px",
                      fontSize: "18px",
                      color: "#6C6C6C",
                      fontWeight: "bold",
                    }}
                  >
                    Choose which person work you want to view 
                  </div>
                )}
              </div>
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
                {modalItem.map((item, index) => (
                  <div className="col-md-3 d-flex flex-column mb-3" key={index}>
                    <label
                      className="mb-2 text-[16px]"
                      style={{ color: "#13007D" }}
                    >
                      {item.work_field}
                    </label>

                    {/* Check if the work_field is 'ছবি' and render image accordingly */}
                    {item.work_field === "ছবি" ? (
                      <img
                        src={`${import.meta.env.REACT_APP_BASE_URL}/uploads/${
                          item.value.split("/").pop()
                        }`}
                        // src={item.value}
                        alt={item.work_field}
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }} // Adjust image size
                      />
                    ) : (
                      <p>{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkTypeShow;
