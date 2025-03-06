import TimePicker from "react-time-picker";
import Header from "../Header";
import { useEffect, useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { RiDeleteBin6Line } from "react-icons/ri";

// Function to convert Bengali digits to Arabic numerals


const Designation = () => {
  const [attendancePeriods, setAttendancePeriods] = useState([]);
    const [error, setError] = useState(null);

  const [data, setData] = useState([
    {
      id: 1,
      name: "অফিস স্টাফ",
      in_time: "০৯:০০", // Bengali time
      out_time: "০৫:০০", // Bengali time
      leaveBalance: "20 দিন",
    },
    {
      id: 2,
      name: "ফার্মাসিস্ট",
      in_time: "০৯:০০", // Bengali time
      out_time: "০৫:০০", // Bengali time
      leaveBalance: "10 দিন",
    },
    // Add more data objects as needed
  ]);

  const [formData, setFormData] = useState({
    designationName: "", // Designation name
    inTime: "09:00", // Start time
    outTime: "05:00", // End time
    leaveBalance: "", // Leave balance
  });

  // Track which field is being edited
  const [editingField, setEditingField] = useState(null);
  const [editingValue, setEditingValue] = useState("");

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
    setEditingValue(value);  // Update the editing value
    setFormData({
      ...formData,
      [field]: value, // Update the specific field (inTime or outTime)
    });
  };

  // Handle submitting the form (Adding new designation)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

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
    await fetchAttendancePeriods()

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
        const response = await fetch("http://localhost:5001/api/attendance/get-attendance-period", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch attendance periods");
        }
  
        const data = await response.json();
        setAttendancePeriods(data); // Update state with fetched data
  
      } catch (error) {
        setError(error.message); // Set error state if fetch fails
      }
    };
    // console.log(attendancePeriods)
  
    // Call fetchAttendancePeriods when the component mounts
    useEffect(() => {
      fetchAttendancePeriods();
    }, []); // Empty dependency array ensures it runs only once after the initial render
  

  // Edit table fields when clicked
  const handleEditField = (field, value, id) => {
    setEditingField({ field, id });
    setEditingValue(value);
  };

  const handleBlur = (id) => {
    // Save the changes when the input field loses focus
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, [editingField.field]: editingValue };
      }
      return item;
    });
    setData(updatedData);
    setEditingField(null);
  };

  const handleChange = (e) => {
    setEditingValue(e.target.value);
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
                  value={formData.inTime} // Convert Bengali digits to Arabic digits
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
                  value={formData.outTime} // Convert Bengali digits to Arabic digits
                  className="form-control"
                  style={{ width: "100%" }}
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
                    পদবী
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    উপস্থিতির সময়
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    প্রস্থানের সময়
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    মোট ছুটি
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
                {attendancePeriods.map((item) => (
                  <tr key={item.id}>
                    <td onClick={() => handleEditField("name", item.name, item.id)}>
                      {editingField && editingField.id === item.id && editingField.field === "name" ? (
                        <input
                          type="text"
                          value={editingValue}
                          onChange={handleChange}
                          onBlur={() => handleBlur(item.id)}
                          autoFocus
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td onClick={() => handleEditField("in_time", item.in_time, item.id)}>
                      {editingField && editingField.id === item.id && editingField.field === "in_time" ? (
                        <TimePicker
                          onChange={(value) => handleTimeChange("in_time", value)}
                          value={editingValue} // Convert Bengali digits to Arabic digits
                          onBlur={() => handleBlur(item.id)}
                        />
                      ) : (
                        item.in_time
                      )}
                    </td>
                    <td onClick={() => handleEditField("out_time", item.out_time, item.id)}>
                      {editingField && editingField.id === item.id && editingField.field === "out_time" ? (
                        <TimePicker
                          onChange={(value) => handleTimeChange("out_time", value)}
                          value={editingValue} // Convert Bengali digits to Arabic digits
                          onBlur={() => handleBlur(item.id)}
                        />
                      ) : (
                        item.out_time
                      )}
                    </td>
                    <td onClick={() => handleEditField("leaveBalance", item.leaveBalance, item.id)}>
                      {editingField && editingField.id === item.id && editingField.field === "leaveBalance" ? (
                        <input
                          type="text"
                          value={editingValue}
                          onChange={handleChange}
                          onBlur={() => handleBlur(item.id)}
                          autoFocus
                        />
                      ) : (
                        item.leaveBalance
                      )}
                    </td>
                    <td>
                      <RiDeleteBin6Line
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
