import { useEffect, useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Header from "../Components/Header";
import {
  // FaRegEye,
  FaEdit,
} from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import Papa from "papaparse"; // Library for CSV parsing
import * as XLSX from "xlsx"; // Library for Excel file parsing
import toast from "react-hot-toast";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap"; // Import Bootstrap JS (includes Popper.js)

const PeopleInformation = () => {
  // const navigate = useNavigate();

  // const handleRowClick = (id) => {
  //   navigate(`/person/${id}`);
  // };

  const [designation, setDesignation] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employeeToUpdate, setEmployeeToUpdate] = useState({
    emp_id: "",
    designation_id: "",
    district: "চট্টগ্রাম",
    upazila_id: "",
    union_id: "",
    unit_id: "",
    name: "",
    mobile: "",
    nid: "",
    address: "",
    image: null,
  });
  const [filterData, setFilterData] = useState({
    designation: "", // String filter
    district: null, // ID filter
    upazila: null, // ID filter
    union: null, // ID filter
    unit: null, // ID filter
    search: "",
  });
  console.log(employeeToUpdate);

  const [uploadedData, setUploadedData] = useState([]);
  const [tab, setTab] = useState("individual");

  const convertToBangla = (number) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
      .toString()
      .split("")
      .map((digit) => banglaDigits[parseInt(digit)])
      .join("");
  };

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

  const fetchEmployees = async (designation, search = "") => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/employee/get-employee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            designation: filterData?.designation,
            search: search,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setEmployees(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching employees:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchDesignation();
    fetchUpazilas();
    fetchUnions();
    fetchUnits();
    fetchEmployees();
  }, [filterData?.designation]);

  console.log(filterData);

  const designationOptions = designation.map((desig) => ({
    id: desig.id,
    label: desig.name,
  }));

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

  const [formData, setFormData] = useState({
    emp_id: "",
    designation_id: "",
    district: "চট্টগ্রাম",
    upazila_id: "",
    union_id: "",
    unit_id: "",
    name: "",
    mobile: "",
    nid: "",
    address: "",
    image: null,
  });

  // const handleUpdateClick = (employee) => {
  //   console.log(employee)
  //   setEmployeeToUpdate(employee);
  //   console.log(employeeToUpdate)

  // };
  console.log(employeeToUpdate);

  const handleDesignationChange = (selectedOption) => {
    setFormData({
      ...formData,
      designation_id: selectedOption ? selectedOption.id : null,
    });
  };
  const handleDesignationChangeFilter = (selectedOption) => {
    setFilterData({
      ...filterData,
      designation: selectedOption ? selectedOption.label : "",
    });
  };
  const handleDesignationUpdateChange = (selectedOption) => {
    setEmployeeToUpdate({
      ...employeeToUpdate,
      designation_id: selectedOption ? selectedOption.id : null,
    });
  };

  const handleUpazilaChange = (selectedOption) => {
    setFormData({
      ...formData,
      upazila_id: selectedOption ? selectedOption.id : null,
    });
  };
  const handleUpazilaChangeFilter = (selectedOption) => {
    setFilterData({
      ...filterData,
      upazila: selectedOption ? selectedOption.id : null,
    });
  };
  const handleUpazilaUpdateChange = (selectedOption) => {
    setEmployeeToUpdate({
      ...employeeToUpdate,
      upazila_id: selectedOption ? selectedOption.id : null,
    });
  };

  const handleUnionChange = (selectedOption) => {
    setFormData({
      ...formData,
      union_id: selectedOption ? selectedOption.id : null,
    });
  };
  const handleUnionChangeFilter = (selectedOption) => {
    setFilterData({
      ...filterData,
      union: selectedOption ? selectedOption.id : null,
    });
  };
  const handleUnionUpdateChange = (selectedOption) => {
    setEmployeeToUpdate({
      ...employeeToUpdate,
      union_id: selectedOption ? selectedOption.id : null,
    });
  };

  const handleUnitChange = (selectedOption) => {
    setFormData({
      ...formData,
      unit_id: selectedOption ? selectedOption.id : null,
    });
  };
  const handleUnitChangeFilter = (selectedOption) => {
    setFilterData({
      ...filterData,
      unit: selectedOption ? selectedOption.id : null,
    });
  };
  const handleUnitUpdateChange = (selectedOption) => {
    setEmployeeToUpdate({
      ...employeeToUpdate,
      unit_id: selectedOption ? selectedOption.id : null,
    });
  };

  const handleIdChange = (e) => {
    setFormData({
      ...formData,
      emp_id: e.target.value,
    });
  };
  const handleIdUpdateChange = (e) => {
    setEmployeeToUpdate({
      ...employeeToUpdate,
      emp_id: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData.image);

    const token = localStorage.getItem("authToken");

    const formDataToSend = new FormData();
    formDataToSend.append("emp_id", formData.emp_id);
    formDataToSend.append("designation_id", formData.designation_id);
    formDataToSend.append("district", formData.district);
    formDataToSend.append("upazila_id", formData.upazila_id);
    formDataToSend.append("union_id", formData.union_id);
    formDataToSend.append("unit_id", formData.unit_id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("nid", formData.nid);
    formDataToSend.append("address", formData.address);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    console.log(formDataToSend, "**");

    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/employee/add-employee`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );
      console.log(response);

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        console.log("Employee registered successfully:", result);
        setFormData({
          emp_id: "",
          designation_id: "",
          district: "",
          upazila_id: "",
          union_id: "",
          unit_id: "",
          name: "",
          mobile: "",
          nid: "",
          address: "",
          image: null,
        });
        toast.success("Employee registered successfully");
        fetchEmployees();
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
        closeButton.click(); // Simulate a click to close the modal
      } else {
        const errorResult = await response.json();
        console.error("Error:", errorResult);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Update Form Data:", employeeToUpdate.image);

    const token = localStorage.getItem("authToken");
    console.log(token);

    try {
      // First, update employee details (excluding image)
      const employeeDetailsResponse = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/employee/update-employee`, // Ensure this URL is correct
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emp_id: employeeToUpdate.emp_id,
            designation_id: employeeToUpdate.designation_id,
            name: employeeToUpdate.name,
            mobile: employeeToUpdate.mobile,
            nid: employeeToUpdate.nid,
            address: employeeToUpdate.address,
          }),
        }
      );

      console.log(employeeDetailsResponse);

      if (employeeDetailsResponse.ok) {
        const result = await employeeDetailsResponse.json();
        console.log(result);
        console.log("Employee details updated successfully:", result);

        if (employeeToUpdate.image) {
          const formData = new FormData();
          formData.append("image", employeeToUpdate.image);

          // Ensure this is a File object (e.g., from a file input)
          for (let [key, value] of formData.entries()) {
            console.log(key, value);
          }

          const imageResponse = await fetch(
            `${import.meta.env.REACT_APP_BASE_URL}/api/employee/update-image/${
              employeeToUpdate.emp_id
            }`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );

          console.log(imageResponse, "****");

          if (imageResponse.ok) {
            const imageResult = await imageResponse.json();
            console.log("Employee image updated successfully:", imageResult);
          } else {
            const errorResult = await imageResponse.json();
            console.error("Error updating image:", errorResult);
          }
        }

        setEmployeeToUpdate({
          emp_id: "",
          designation_id: "",
          district: "চট্টগ্রাম",
          upazila_id: "",
          union_id: "",
          unit_id: "",
          name: "",
          mobile: "",
          nid: "",
          address: "",
          image: null,
        });

        fetchEmployees();
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
        closeButton.click();
      } else {
        const errorResult = await employeeDetailsResponse.json();
        console.error("Error updating employee details:", errorResult);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/employee/delete-employee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        }
      );

      if (response.ok) {
        console.log("employee deleted successfully");
        await fetchEmployees();
      } else {
        const errorResult = await response.json();
        console.error("Error deleting employee:", errorResult);
      }
    } catch (error) {
      console.error("Error deleting employeen:", error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, নিশ্চিত",
      cancelButtonText: "না",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire({
          title: "ডিলিট করা হয়েছে",
          text: "কর্মকর্তা ডিলিট সম্পন্ন",
          icon: "success",
        });
      }
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleInputUpdateChange = (e) => {
    const { id, value } = e.target;
    setEmployeeToUpdate({
      ...employeeToUpdate,
      [id]: value,
    });
  };

  const handleImageChange = (e) => {
    const { id, files } = e.target;
    setFormData({
      ...formData,
      [id]: files[0],
    });
  };
  const handleImageUpdateChange = (e) => {
    const { id, files } = e.target;

    console.log(files);

    if (files && files[0]) {
      setEmployeeToUpdate({
        ...employeeToUpdate,
        [id]: files[0],
      });
      console.log("Selected image:", files[0]);
      console.log(employeeToUpdate);
    } else {
      console.log("No file selected");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      setError(null);
      if (file.type === "text/csv") {
        parseCsvFile(file);
      } else if (
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        parseExcelFile(file);
      } else {
        setLoading(false);
        setError("Please upload a valid CSV or Excel file.");
      }
    }
  };

  const parseCsvFile = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        console.log("CSV data:", result);
        if (result.data.length === 0) {
          setLoading(false);
          setError("No data found in the CSV file.");
        } else {
          setUploadedData(result.data);
          setLoading(false);
        }
      },
      header: true,
    });
  };

  const parseExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      console.log("Excel data:", jsonData);
      if (jsonData.length === 0) {
        setLoading(false);
        setError("No data found in the Excel file.");
      } else {
        setUploadedData(jsonData);
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/employee/add-employee-bulk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ uploadedData }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("All Employee registered successfully:", result);
        fetchEmployees();
        setUploadedData([]);
        toast.success("All Employee registered successfully");
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
        closeButton.click();
      } else {
        const errorResult = await response.json();
        console.error("Error:", errorResult);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(formData);
  return (
    <div>
      <Header title={"কর্মকর্তার তথ্য"} />
      <div className="dashboard p-3 " style={{ backgroundColor: "#FFFFFF" }}>
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <div className="row g-6 ">
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px] " style={{ color: "#323232" }}>
                পদবী
              </label>
              <Select
                options={designationOptions}
                value={designationOptions.find(
                  (option) => option.label === filterData.designation
                )}
                onChange={handleDesignationChangeFilter}
                isClearable
                placeholder="Select"
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.label}
              />
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
              <Select
                options={upazilaOptions}
                value={upazilaOptions.find(
                  (option) => option.label === filterData.upazila
                )}
                onChange={handleUpazilaChangeFilter}
                isClearable
                placeholder="Select"
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.label}
              />
            </div>
            <div className="col-md-2 d-flex flex-column mb-3">
              <label className="mb-2 text-[16px] " style={{ color: "#323232" }}>
                ইউনিয়ন
              </label>
              <Select
                options={unionOptions}
                value={unionOptions.find(
                  (option) => option.label === filterData.union
                )}
                onChange={handleUnionChangeFilter}
                isClearable
                placeholder="Select"
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
                  (option) => option.label === filterData.unit
                )}
                onChange={handleUnitChangeFilter}
                isClearable
                placeholder="Select"
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.label}
              />
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
                  // zIndex: 1,
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
                {employees.map((item, index) => (
                  <tr key={index}>
                    <td style={{ color: "#6C6C6C" }}>
                      {convertToBangla(item.emp_id)}
                    </td>
                    <td style={{ color: "#6C6C6C" }}>{item.name}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.mobile}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.nid}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.address}</td>
                    <td>
                      <img
                        src={`${import.meta.env.REACT_APP_BASE_URL}/uploads/${
                          item.image
                        }`}
                        alt="officer"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    {/* <td>
                      <FaRegEye
                        size={20}
                        onClick={() => handleRowClick(item.emp_id)}
                        style={{ color: "gray", cursor: "pointer" }}
                      />
                    </td> */}
                    <td>
                      <RiDeleteBin6Line
                        onClick={() => handleDeleteConfirmation(item.emp_id)}
                        size={20}
                        style={{ color: "gray", cursor: "pointer" }}
                      />
                    </td>
                    <td>
                      <FaEdit
                        onClick={() => {
                          setEmployeeToUpdate(item);
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#updateModal"
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

      {/* modal for add people */}

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
            width: "90%",
            height: "70%",
            maxHeight: "90vh",
            maxWidth: "70vw",
            marginLeft: "auto",
            marginRight: "auto",
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

            <div className="modal-body">
              {/* Tabs */}
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${
                      tab === "individual" ? "active" : ""
                    }`}
                    id="home-tab"
                    role="tab"
                    onClick={() => setTab("individual")}
                  >
                    Add Individual
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${tab === "upload" ? "active" : ""}`}
                    id="upload-tab"
                    role="tab"
                    onClick={() => setTab("upload")}
                  >
                    Upload CSV/Excel
                  </a>
                </li>
              </ul>

              <div className="tab-content" id="myTabContent">
                {/* Tab 1: Add Individual */}
                {tab === "individual" && (
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <form onSubmit={handleFormSubmit}>
                      <div className="row g-5">
                        {/* Existing fields */}

                        <div className="row g-5">
                          {/* Employee ID */}
                          <div className="col-md-3 d-flex flex-column mb-3">
                            <label
                              className="mb-2 text-[16px]"
                              style={{ color: "#323232" }}
                            >
                              আইডি
                            </label>
                            <input
                              type="text"
                              value={formData.emp_id}
                              onChange={handleIdChange}
                              className="form-control"
                            />
                          </div>

                          {/* Name */}
                          <div className="col-md-3 d-flex flex-column mb-3">
                            <label
                              className="mb-2 text-[16px]"
                              style={{ color: "#323232" }}
                            >
                              নাম
                            </label>
                            <input
                              type="text"
                              id="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter Name"
                            />
                          </div>

                          {/* Mobile Number */}
                          <div className="col-md-3 d-flex flex-column mb-3">
                            <label
                              className="mb-2 text-[16px]"
                              style={{ color: "#323232" }}
                            >
                              মোবাইল
                            </label>
                            <input
                              type="text"
                              id="mobile"
                              value={formData.mobile}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter Mobile Number"
                            />
                          </div>

                          {/* National ID */}
                          <div className="col-md-3 d-flex flex-column mb-3">
                            <label
                              className="mb-2 text-[16px]"
                              style={{ color: "#323232" }}
                            >
                              জাতীয় পরিচয়পত্র
                            </label>
                            <input
                              type="text"
                              id="nid"
                              value={formData.nid}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter NID"
                            />
                          </div>

                          {/* Address */}
                          <div className="col-md-3 d-flex flex-column mb-3">
                            <label
                              className="mb-2 text-[16px]"
                              style={{ color: "#323232" }}
                            >
                              ঠিকানা
                            </label>
                            <input
                              type="text"
                              id="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter Address"
                            />
                          </div>

                          {/* Designation */}
                          <div className="col-md-3 d-flex flex-column mb-3">
                            <label
                              className="mb-2 text-[16px]"
                              style={{ color: "#323232" }}
                            >
                              পদবী
                            </label>
                            <Select
                              options={designationOptions}
                              value={designationOptions.find(
                                (option) =>
                                  option.id === formData.designation_id
                              )}
                              onChange={handleDesignationChange}
                              isClearable
                              placeholder="Select"
                              getOptionValue={(option) => option.id}
                              getOptionLabel={(option) => option.label}
                            />
                          </div>

                          {/* District */}
                          <div className="col-md-3 d-flex flex-column mb-3">
                            <label
                              className="mb-2 text-[16px]"
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
                              <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                            </select>
                          </div>

                          {/* Upazila */}
                          <div className="col-md-3 d-flex flex-column mb-3">
                            <label
                              className="mb-2 text-[16px]"
                              style={{ color: "#323232" }}
                            >
                              উপজেলা
                            </label>
                            <Select
                              options={upazilaOptions}
                              value={upazilaOptions.find(
                                (option) => option.id === formData.upazila_id
                              )}
                              onChange={handleUpazilaChange}
                              isClearable
                              placeholder="Select Upazila"
                              getOptionValue={(option) => option.id}
                              getOptionLabel={(option) => option.label}
                            />
                          </div>

                          {/* Union */}
                          <div className="col-md-3 d-flex flex-column mb-3">
                            <label
                              className="mb-2 text-[16px]"
                              style={{ color: "#323232" }}
                            >
                              ইউনিয়ন
                            </label>
                            <Select
                              options={unionOptions}
                              value={unionOptions.find(
                                (option) => option.id === formData.union_id
                              )}
                              onChange={handleUnionChange}
                              isClearable
                              placeholder="Select Union"
                              getOptionValue={(option) => option.id}
                              getOptionLabel={(option) => option.label}
                            />
                          </div>

                          {/* Unit */}
                          <div className="col-md-3 d-flex flex-column mb-3">
                            <label
                              className="mb-2 text-[16px]"
                              style={{ color: "#323232" }}
                            >
                              ইউনিট
                            </label>
                            <Select
                              options={unitOptions}
                              value={unitOptions.find(
                                (option) => option.id === formData.unit_id
                              )}
                              onChange={handleUnitChange}
                              isClearable
                              placeholder="Select Unit"
                              getOptionValue={(option) => option.id}
                              getOptionLabel={(option) => option.label}
                            />
                          </div>

                          {/* Image Upload */}
                          <div className="col-md-3 d-flex flex-column mb-3">
                            <label
                              className="mb-2 text-[16px]"
                              style={{ color: "#323232" }}
                            >
                              ছবি আপলোড করুন
                            </label>
                            <input
                              type="file"
                              id="image"
                              className="form-control"
                              onChange={handleImageChange}
                            />
                          </div>
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
                )}

                {/* Tab 2: Upload CSV/Excel */}
                {tab === "upload" && (
                  <div
                    className="tab-pane show active"
                    id="upload"
                    role="tabpanel"
                    aria-labelledby="upload-tab"
                  >
                    <form>
                      {/* File Upload Input */}
                      <div className="mb-3">
                        <label htmlFor="fileUpload" className="form-label mt-3">
                          Upload CSV/Excel File
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="fileUpload"
                          accept=".csv, .xlsx, .xls"
                          onChange={handleFileChange}
                        />
                      </div>
                      {loading && <div>Loading...</div>}

                      {/* Error Message */}
                      {error && <div style={{ color: "red" }}>{error}</div>}

                      {/* Display Uploaded Data */}
                      <div className="mt-4">
                        <h6>Uploaded Data:</h6>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Emp ID</th>
                              <th>Name</th>
                              <th>Mobile</th>
                              <th>NID</th>
                              <th>Address</th>
                              <th>Designation</th>
                              <th>District</th>
                              <th>Upazila</th>
                              <th>Union</th>
                              <th>Unit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {uploadedData.length > 0 ? (
                              uploadedData.map((row, index) => (
                                <tr key={index}>
                                  <td>{row.emp_id}</td>
                                  <td>{row.name}</td>
                                  <td>{row.mobile}</td>
                                  <td>{row.nid}</td>
                                  <td>{row.address}</td>
                                  <td>{row.designation_id}</td>
                                  <td>{row.district}</td>
                                  <td>{row.upazila_id}</td>
                                  <td>{row.union_id}</td>
                                  <td>{row.unit_id}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="5">No data uploaded</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-primary text-white mt-4"
                          style={{ backgroundColor: "#13007D" }}
                          onClick={handleBulkSubmit}
                        >
                          কর্মকর্তা যোগ করুন
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* update modal */}
      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        aria-labelledby="updateModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          style={{
            width: "90%",
            height: "70%",
            maxHeight: "90vh",
            maxWidth: "70vw",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="modal-content" style={{ padding: "30px" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="updateModalLabel">
                কর্মকর্তা তথ্য আপডেট করুন
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
                    আইডি
                  </label>
                  <input
                    type="text"
                    value={employeeToUpdate.emp_id}
                    onChange={handleIdUpdateChange}
                    className="form-control"
                    // disabled
                  />
                </div>
                <div className="col-md-2 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px] "
                    style={{ color: "#323232" }}
                  >
                    পদবী
                  </label>
                  <Select
                    options={designationOptions}
                    value={designationOptions.find(
                      (option) => option.id === employeeToUpdate.designation_id
                    )}
                    onChange={handleDesignationUpdateChange}
                    isClearable
                    placeholder="Select"
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.label}
                  />
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
                    value={employeeToUpdate.district}
                    onChange={handleInputUpdateChange}
                  >
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
                  <Select
                    options={upazilaOptions}
                    value={upazilaOptions.find(
                      (option) => option.id === employeeToUpdate.upazila_id
                    )}
                    onChange={handleUpazilaUpdateChange}
                    isClearable
                    placeholder="Select upazila"
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.label}
                  />
                </div>
                <div className="col-md-2 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px] "
                    style={{ color: "#323232" }}
                  >
                    ইউনিয়ন
                  </label>
                  <Select
                    options={unionOptions}
                    value={unionOptions.find(
                      (option) => option.id === employeeToUpdate.union_id
                    )}
                    onChange={handleUnionUpdateChange}
                    isClearable
                    placeholder="Select Union"
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.label}
                  />
                </div>
                <div className="col-md-2 d-flex flex-column mb-3">
                  <label
                    className="mb-2 text-[16px]"
                    style={{ color: "#323232" }}
                  >
                    ইউনিট
                  </label>
                  <Select
                    options={unitOptions}
                    value={unitOptions.find(
                      (option) => option.id === employeeToUpdate.unit_id
                    )}
                    onChange={handleUnitUpdateChange}
                    isClearable
                    placeholder="Select unit"
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.label}
                  />
                </div>
              </div>
            </div>

            <div
              className="modal-body"
              style={{
                maxHeight: "60vh",
                overflowY: "auto",
              }}
            >
              <form onSubmit={handleUpdateFormSubmit}>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="name" className="form-label">
                      কর্মকর্তা নাম
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="কর্মকর্তার নাম লিখুন"
                      value={employeeToUpdate.name}
                      onChange={handleInputUpdateChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="mobile" className="form-label">
                      মোবাইল
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      placeholder="কর্মকর্তার মোবাইল"
                      value={employeeToUpdate.mobile}
                      onChange={handleInputUpdateChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="nid" className="form-label">
                      জাতীয় পরিচয়পত্র
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nid"
                      placeholder="কর্মকর্তার জাতীয় পরিচয়পত্র"
                      value={employeeToUpdate.nid}
                      onChange={handleInputUpdateChange}
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
                      value={employeeToUpdate.address}
                      onChange={handleInputUpdateChange}
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
                      onChange={handleImageUpdateChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary text-white mt-4"
                    style={{ backgroundColor: "#13007D" }}
                  >
                    কর্মকর্তা আপডেট করুন
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
