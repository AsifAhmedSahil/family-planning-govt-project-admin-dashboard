/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../Components/Header";

import Select from "react-select";
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

import { CDateRangePicker } from "@coreui/react-pro";
import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import { FaLongArrowAltRight } from "react-icons/fa";

const Attendence = () => {
  const [designation, setDesignation] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  const [units, setUnits] = useState([]);
  const [attendenceData, setAttendenceData] = useState([]);
  const [attendanceDetails, setAttendanceDetails] = useState(null);
  const [employeeName, setEmployeeName] = useState(null);

  const [formData, setFormData] = useState({
    designation_name: "",
    district: "",
    upazila_name: "",
    union_name: "",
    unit_name: "",
    startDate: null,
    endDate: null,
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
      upazila_name: selectedOption ? selectedOption.id : null,
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
      union_name: selectedOption ? selectedOption.id : null,
    });
  };

  const handleUnitChange = (selectedOption) => {
    setFormData({
      ...formData,
      unit_name: selectedOption ? selectedOption.id : null,
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
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    try {
      const response = await fetch(
        `${
          import.meta.env.REACT_APP_BASE_URL
        }/api/report/get-Attendance-with-filter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setAttendenceData(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching attendance:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      fetchAttendance();
    }
  }, [formData]);

  const handleRowClick = (attendanceDetails, name) => {
    setAttendanceDetails(JSON.parse(attendanceDetails));
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

  console.log(attendanceDetails, employeeName);

  return (
    <div>
      <Header title={"উপস্থিতি"} />
      <div className="dashboard p-3">
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <div className="row g-6">
            <div className="col-md-2 d-flex flex-column mb-3">
              <div>
                <CDateRangePicker
                  label="তারিখ"
                  locale="en-US"
                  onStartDateChange={(date) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      startDate: date,
                    }));
                  }}
                  onEndDateChange={(date) => {
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
                  (option) => option.id === formData.upazila_name
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
                  (option) => option.id === formData.union_name
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
                  (option) => option.id === formData.unit_name
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
            borderRadius: "12px",
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
                {attendenceData && attendenceData.length > 0 ? (
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
                          মোট উপস্থিতি
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
                      {attendenceData?.map((item, index) => (
                        <tr
                          key={index}
                          onClick={() =>
                            handleRowClick(item.attendanceDetails, item.name)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <td style={{ color: "#6C6C6C" }}>{item.name}</td>
                          <td style={{ color: "#6C6C6C" }}>
                            {convertToBangla(item.totalPresentDays)}
                          </td>

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
                {attendanceDetails && attendanceDetails.length > 0 ? (
                  <table className="table" style={{ width: "100%" }}>
                    <thead
                      style={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#D9D9D9",
                        zIndex: 1,
                      }}
                    >
                      <tr>
                        <th
                          style={{
                            color: "#323232",
                            position: "sticky",
                            width: "20%",
                            top: 0,
                            backgroundColor: "#D9D9D9",
                          }}
                        >
                          তারিখ
                        </th>
                        <th
                          style={{
                            color: "#323232",
                            position: "sticky",
                            top: 0,
                            width: "15%",
                            backgroundColor: "#D9D9D9",
                          }}
                        >
                          ইন
                        </th>
                        <th
                          style={{
                            color: "#323232",
                            position: "sticky",
                            top: 0,
                            width: "15%",
                            backgroundColor: "#D9D9D9",
                          }}
                        >
                          আউট
                        </th>
                        <th
                          style={{
                            color: "#323232",
                            position: "sticky",
                            top: 0,
                            width: "50%",
                            backgroundColor: "#D9D9D9",
                          }}
                        >
                          স্ট্যাটাস
                        </th>

                        <th
                          style={{
                            color: "#323232",
                            position: "sticky",
                            top: 0,
                            backgroundColor: "#D9D9D9",
                          }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceDetails?.map((item, index) => (
                        <tr key={index}>
                          <td style={{ color: "#6C6C6C" }}>{item.date}</td>
                          <td style={{ color: "#6C6C6C" }}>{item.in_time}</td>
                          <td style={{ color: "#6C6C6C" }}>{item.out_time}</td>
                          <td style={{ color: "#6C6C6C" }}>{item.location}</td>
                        </tr>
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
                    Choose which person attendence you want to view
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendence;
