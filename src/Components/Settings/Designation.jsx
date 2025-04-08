import TimePicker from "react-time-picker";
import Header from "../Header";
import { useEffect, useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

const Designation = () => {
  const [attendancePeriods, setAttendancePeriods] = useState([]);
  const [employeeToUpdate, setEmployeeToUpdate] = useState({
    id: "",
    designation_id: "",
    name: "",
    inTime: "09:00 AM",
    outTime: "05:00 PM",
    leaveBalance: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/setting/workassign");
  };

  const [formData, setFormData] = useState({
    designationName: "",
    inTime: "09:00 AM",
    outTime: "05:00 PM",
    leaveBalance: "",
  });

  // Convert 12-hour time format to 24-hour format (HH:MM:SS)
  const convertTo24HourFormat = (time12hr) => {
    const [time, modifier] = time12hr.split(" ");
    const [hours, minutes] = time.split(":");

    let hours24 = parseInt(hours);
    if (modifier === "PM" && hours24 < 12) {
      hours24 += 12;
    }
    if (modifier === "AM" && hours24 === 12) {
      hours24 = 0;
    }

    const minutesFormatted = minutes.length === 1 ? `0${minutes}` : minutes;
    return `${hours24}:${minutesFormatted}:00`; // Add seconds to match MySQL's format
  };

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputUpdateChange = (e) => {
    const { id, value } = e.target;
    setEmployeeToUpdate({
      ...employeeToUpdate,
      [id]: value,
    });
  };

  const handleTimeChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleTimeChangeUpdate = (field, value) => {
    setEmployeeToUpdate({
      ...employeeToUpdate,
      [field]: value,
    });
  };

  console.log(attendancePeriods);

  // Handle submitting the form (Adding new designation)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    // Convert inTime and outTime to 24-hour format before sending to the backend
    const inTime24 = convertTo24HourFormat(formData.inTime);
    const outTime24 = convertTo24HourFormat(formData.outTime);

    // Step 1: Add Designation
    const designationResponse = await fetch(
      `${import.meta.env.REACT_APP_BASE_URL}/api/setup/add-designation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.designationName,
        }),
      }
    );

    if (!designationResponse.ok) {
      const errorResult = await designationResponse.json();
      console.error("Error adding designation:", errorResult);
      return;
    }

    const designationResult = await designationResponse.json();
    const designationId = designationResult.id; // Get the designation_id from response

    // Step 2: Add Attendance Period using the designation_id
    const attendanceResponse = await fetch(
      `${
        import.meta.env.REACT_APP_BASE_URL
      }/api/attendance/add-attendance-period`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          designation_id: designationId,
          in_time: inTime24,
          out_time: outTime24,
          leaveBalance: parseInt(formData.leaveBalance),
        }),
      }
    );

    if (!attendanceResponse.ok) {
      const errorResult = await attendanceResponse.json();
      console.error("Error adding attendance period:", errorResult);
      return;
    }

    const attendanceResult = await attendanceResponse.json();
    console.log("Attendance Period Added successfully:", attendanceResult);
    await fetchAttendancePeriods();

    // Optionally, reset the form or handle success feedback
    setFormData({
      designationName: "",
      inTime: "09:00 AM",
      outTime: "05:00 PM",
      leaveBalance: "",
    });
  };

  // Update designation and attendance period:
  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    // Convert inTime and outTime to 24-hour format before sending to the backend
    const inTime24 = convertTo24HourFormat(employeeToUpdate.inTime);
    const outTime24 = convertTo24HourFormat(employeeToUpdate.outTime);

    // Step 1: Update Designation
    const designationResponse = await fetch(
      `${import.meta.env.REACT_APP_BASE_URL}/api/setup/update-designation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: employeeToUpdate.designation_id,
          name: employeeToUpdate.name,
        }),
      }
    );

    if (!designationResponse.ok) {
      const errorResult = await designationResponse.json();
      console.error("Error updating designation:", errorResult);
      return;
    }

    const designationResult = await designationResponse.json();
    console.log("Designation updated successfully:", designationResult);

    // Step 2: Update Attendance Period
    const attendanceResponse = await fetch(
      `${
        import.meta.env.REACT_APP_BASE_URL
      }/api/attendance/update-attendance-period`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: employeeToUpdate.id,
          designation_id: employeeToUpdate.designation_id,
          in_time: inTime24,
          out_time: outTime24,
          leaveBalance: parseInt(employeeToUpdate.leaveBalance),
        }),
      }
    );

    if (!attendanceResponse.ok) {
      const errorResult = await attendanceResponse.json();
      console.error("Error updating attendance period:", errorResult);
      return;
    }

    const attendanceResult = await attendanceResponse.json();
    console.log("Attendance Period updated successfully:", attendanceResult);
    await fetchAttendancePeriods();
    const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
    closeButton.click(); // Simulate a click to close the modal
    toast.success("Attendance Period updated successfully");

    // Optionally, reset the form or handle success feedback
    setEmployeeToUpdate({
      id: "",
      designation_id: "",
      name: "",
      inTime: "09:00 AM",
      outTime: "05:00 PM",
      leaveBalance: "",
    });
  };

  // Fetch attendance periods from the API
  const fetchAttendancePeriods = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${
          import.meta.env.REACT_APP_BASE_URL
        }/api/attendance/get-attendance-period`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch attendance periods");
      }

      const data = await response.json();
      setAttendancePeriods(data); // Update state with fetched data
    } catch (error) {
      setError(error.message); // Set error state if fetch fails
    }
  };
  console.log(error);

  // Call fetchAttendancePeriods when the component mounts
  useEffect(() => {
    fetchAttendancePeriods();
  }, []);

  const handleDelete = async (id, designation_id) => {
    const token = localStorage.getItem("authToken");

    try {
      // Step 1: Delete the Designation
      const designationResponse = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/delete-designation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: designation_id }),
        }
      );

      // Check if the designation deletion was successful
      if (!designationResponse.ok) {
        const designationErrorResult = await designationResponse.json();
        console.error("Error deleting designation:", designationErrorResult);
        return; // Exit if designation deletion failed
      }

      const designationData = await designationResponse.json();
      console.log(designationData.message); // You can log this message if needed
      await fetchAttendancePeriods();

      // Step 2: Delete the Attendance Period only after designation deletion is successful
      const attendanceResponse = await fetch(
        `${
          import.meta.env.REACT_APP_BASE_URL
        }/api/attendance/delete-attendance-period`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        }
      );

      // Check if the attendance period deletion was successful
      if (attendanceResponse.ok) {
        console.log("Attendance period deleted successfully");
        await fetchAttendancePeriods(); // Fetch the updated list of attendance periods
      } else {
        const errorResult = await attendanceResponse.json();
        console.error("Error deleting attendance period:", errorResult);
      }
    } catch (error) {
      console.error("Error deleting designation or attendance period:", error);
    }
  };

  const handleDeleteConfirmation = (id, designation_id) => {
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
        handleDelete(id, designation_id);
        Swal.fire({
          title: "ডিলিট করা হয়েছে",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <Header title={"পদবীর তথ্য"} />

      <div className="dashboard p-3" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <form onSubmit={handleSubmit}>
            <div className="row g-6">
              {/* Designation Name */}
              <div className="col-md-2 d-flex flex-column mb-3">
                <label
                  className="mb-2 text-[16px]"
                  style={{ color: "#323232" }}
                >
                  পদবীর নাম
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="designationName"
                  value={formData.designationName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* In Time */}
              <div className="col-md-2 d-flex flex-column mb-3">
                <label
                  className="mb-2 text-[16px]"
                  style={{ color: "#323232" }}
                >
                  উপস্থিতির সময়
                </label>
                <TimePicker
                  onChange={(value) => handleTimeChange("inTime", value)}
                  value={formData.inTime}
                  className="form-control"
                />
              </div>

              {/* Out Time */}
              <div className="col-md-2 d-flex flex-column mb-3">
                <label
                  className="mb-2 text-[16px]"
                  style={{ color: "#323232" }}
                >
                  প্রস্থানের সময়
                </label>
                <TimePicker
                  onChange={(value) => handleTimeChange("outTime", value)}
                  value={formData.outTime}
                  className="form-control"
                />
              </div>

              {/* Leave Balance */}
              <div className="col-md-2 d-flex flex-column mb-3">
                <label
                  className="mb-2 text-[16px]"
                  style={{ color: "#323232" }}
                >
                  মোট ছুটি
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="leaveBalance"
                  value={formData.leaveBalance}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="col-md-2 d-flex flex-column mb-3">
                <button
                  type="submit"
                  className="btn w-100 text-white mt-4"
                  style={{ backgroundColor: "#13007D" }}
                >
                  পদবী যোগ করুন
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Data Table */}
        <div className="table-container" style={{ margin: "26px" }}>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ marginBottom: "15px" }}
          >
            <h1
              style={{ fontSize: "16px", fontWeight: "500", color: "#323232" }}
            >
              পদবী সমূহ
            </h1>
            <button
              onClick={handleNavigate}
              style={{
                backgroundColor: "#fff",
                border: "0px",
                color: "#13007D",
              }}
            >
              কাজ এসাইন করুন
            </button>
          </div>

          <div
            className="table-responsive"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <table className="table" style={{ width: "100%" }}>
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#D9D9D9",
                }}
              >
                <tr>
                  <th>পদবী</th>
                  <th>উপস্থিতির সময়</th>
                  <th>প্রস্থানের সময়</th>
                  <th>মোট ছুটি</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {attendancePeriods.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{convertTo24HourFormat(item.in_time)}</td>
                    <td>{item.out_time}</td>
                    <td>{item.leaveBalance}</td>
                    <td>
                      <RiDeleteBin6Line
                        onClick={() =>
                          handleDeleteConfirmation(item.id, item.designation_id)
                        }
                        size={30}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </td>
                    <td>
                      <FaEdit
                        onClick={() => {
                          setEmployeeToUpdate({
                            id: item.id,
                            designation_id: item.designation_id,
                            name: item.name,
                            inTime: item.in_time,
                            outTime: item.out_time,
                            leaveBalance: item.leaveBalance,
                          });
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
      {/* Update modal */}
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
                পদবীর তথ্য আপডেট করুন
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
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
                      পদবীর নাম
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="পদবীর নাম লিখুন"
                      value={employeeToUpdate.name}
                      onChange={handleInputUpdateChange}
                    />
                  </div>
                  <div className="col-md-4 d-flex flex-column">
                    <label htmlFor="inTime" className="form-label">
                      উপস্থিতির সময়
                    </label>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChangeUpdate("inTime", value)
                      }
                      value={employeeToUpdate.inTime}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 d-flex flex-column">
                    <label htmlFor="outTime" className="form-label">
                      প্রস্থানের সময়
                    </label>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChangeUpdate("outTime", value)
                      }
                      value={employeeToUpdate.outTime}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="leaveBalance" className="form-label">
                      মোট ছুটি
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="leaveBalance"
                      placeholder="মোট ছুটি"
                      value={employeeToUpdate.leaveBalance}
                      onChange={handleInputUpdateChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary text-white mt-4"
                    style={{ backgroundColor: "#13007D" }}
                  >
                    আপডেট করুন
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

export default Designation;
