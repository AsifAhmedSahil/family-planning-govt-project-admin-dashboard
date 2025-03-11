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
  const navigate = useNavigate()

  const handleNavigate = () =>{
    navigate("/setting/workassign")
  }

 

  const [formData, setFormData] = useState({
    designationName: "", // Designation name
    inTime: "09:00 AM", // Start time
    outTime: "05:00 PM", // End time
    leaveBalance: "", // Leave balance
  });

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12; // Convert hour 0 to 12 for AM
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes; // Add leading 0 for minutes if necessary
    return `${hours12}:${minutesFormatted} ${ampm}`;
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
    setEditingValue(value); // Update the editing value
    setFormData({
      ...formData,
      [field]: value, // Update the specific field (inTime or outTime)
    });
  };

  // Handle submitting the form (Adding new designation)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    console.log(formData)

    // Step 1: Add Designation
    const designationResponse = await fetch(
      "http://localhost:5001/api/setup/add-designation",
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
      "http://localhost:5001/api/attendance/add-attendance-period",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          designation_id: designationId,
          in_time: formData.inTime, // In time from form state
          out_time: formData.outTime, // Out time from form state
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
      inTime: "09:00",
      outTime: "05:00",
      leaveBalance: "",
    });
  };

  // Fetch attendance periods from the API
  const fetchAttendancePeriods = async () => {
    const token = localStorage.getItem("authToken"); // Assuming you use a token for authorization

    try {
      const response = await fetch(
        "http://localhost:5001/api/attendance/get-attendance-period",
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
  }, []); // Empty dependency array ensures it runs only once after the initial render

   const handleDelete = async (id) => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch(
          "http://localhost:5001/api/attendance/delete-attendance-period",
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
          console.log("attendence period deleted successfully");
          await fetchAttendancePeriods(); // Fetch the updated list of unions
        } else {
          const errorResult = await response.json();
          console.error("Error deleting attendence period:", errorResult);
        }
      } catch (error) {
        console.error("Error deleting attendence period:", error);
      }
    };
  
    const handleDeleteConfirmation = (id) => {
      Swal.fire({
        title: "আপনি কি নিশ্চিত?",
        // text: "You won't be able to revert this!",
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
            text: "",
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
                  value={formData.inTime} // Convert Bengali digits to Arabic digits
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
                  value={formData.outTime} // Convert Bengali digits to Arabic digits
                  className="form-control"
                  style={{ width: "100%" }}
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
                  style={{ width: "100%" }}
                  name="leaveBalance"
                  value={formData.leaveBalance}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="col-md-2 d-flex flex-column mb-3">
                <label className="mb-2 text-[16px]"></label>
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
        <div className="d-flex justify-content-between align-items-center " style={{marginBottom:"15px"}}>
          <div>
            <h1 style={{fontSize:"16px",fontWeight:"500",color:"#323232"}}>পদবী সমূহ</h1>
          </div>
          <div >
            <button onClick={handleNavigate} style={{backgroundColor:"#fff",border:"0px",color:"#13007D"}}>কাজ এসাইন করুন</button>
          </div>
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
                  // zIndex: 1,
                }}
              >
                <tr>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    পদবী
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    উপস্থিতির সময়
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    প্রস্থানের সময়
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    মোট ছুটি
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
                {attendancePeriods.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{convertTo12HourFormat(item.in_time)}</td>{" "}
                    {/* Convert in_time to 12-hour format */}
                    <td>{item.out_time}</td>{" "}
                    {/* Convert out_time to 12-hour format */}
                    <td>{item.leaveBalance}</td>
                    <td>
                      <RiDeleteBin6Line
                        onClick={() => handleDeleteConfirmation(item.id)}
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
