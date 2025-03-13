import TimePicker from "react-time-picker";
import Header from "../Header";
import { useEffect, useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Designation = () => {
  const [attendancePeriods, setAttendancePeriods] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/setting/workassign");
  };

  const [formData, setFormData] = useState({
    designationName: "", // Designation name
    inTime: "09:00 AM", // Start time
    outTime: "05:00 PM", // End time
    leaveBalance: "", // Leave balance
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

  // Handle time changes (start time, end time)
  const handleTimeChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value, // Update the specific field (inTime or outTime)
    });
  };

  console.log(attendancePeriods)

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
      `${import.meta.env.REACT_APP_BASE_URL}/api/attendance/add-attendance-period`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          designation_id: designationId,
          in_time: inTime24, // Use 24-hour formatted in_time
          out_time: outTime24, // Use 24-hour formatted out_time
          leaveBalance: parseInt(formData.leaveBalance), // Leave balance from form state
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

  

  // Fetch attendance periods from the API
  const fetchAttendancePeriods = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/attendance/get-attendance-period`,
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
      await fetchAttendancePeriods()
  
      // Step 2: Delete the Attendance Period only after designation deletion is successful
      const attendanceResponse = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/attendance/delete-attendance-period`,
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
  

  const handleDeleteConfirmation = (id,designation_id) => {
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
        handleDelete(id,designation_id);
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
                <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
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
                <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
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
                <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
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
                <label className="mb-2 text-[16px]" style={{ color: "#323232" }}>
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
          <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: "15px" }}>
            <h1 style={{ fontSize: "16px", fontWeight: "500", color: "#323232" }}>পদবী সমূহ</h1>
            <button onClick={handleNavigate} style={{ backgroundColor: "#fff", border: "0px", color: "#13007D" }}>
              কাজ এসাইন করুন
            </button>
          </div>

          <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
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
                        onClick={() => handleDeleteConfirmation(item.id,item.designation_id)}
                        size={30}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Designation;
