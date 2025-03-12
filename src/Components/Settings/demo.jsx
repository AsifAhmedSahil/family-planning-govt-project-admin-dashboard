import { useEffect, useState } from "react";
import Header from "../Header";

const WorkAssign = () => {
  // State for the form data (for Designation and Work Types with checkboxes)
  const [formData, setFormData] = useState({
    designation: null, // For Designation (react-select or select)
    workTypes: [],     // For selected work types (checkboxes)
  });
  const [message, setMessage] = useState(""); // For showing response message
  const [loading, setLoading] = useState(false); // To show loading state
  const [designations, setDesignations] = useState([]); // For storing designations fetched from API
  const [workTypes, setWorkTypes] = useState([]); // For storing work types

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data before making the API call
    if (!formData.designation || formData.workTypes.length === 0) {
      setMessage("Please select a designation and at least one work type.");
      return;
      
    }

    // Prepare the request body based on the API documentation
    const assignData = formData.workTypes.map((workTypeId) => ({
      designation_id: formData.designation.value,
      work_type_id: workTypeId,
    }));

    const requestBody = {
      assignData: JSON.stringify(assignData),
    };

    console.log(requestBody);

    setLoading(true);
    setMessage(""); // Reset message before submitting

    // Try API call (commented out for now)
    // try {
    //   const response = await fetch("/api/work/assign-workType", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(requestBody),
    //   });

    //   const data = await response.json();

    //   if (response.status === 201) {
    //     setMessage("Assignments added successfully");
    //   } else if (response.status === 400) {
    //     setMessage(data.message || "Invalid data");
    //   } else if (response.status === 500) {
    //     setMessage("Internal server error. Please try again later.");
    //   }
    // } catch (error) {
    //   setMessage("An error occurred while submitting the form.");
    // } finally {
    //   setLoading(false);
    // }
  };

  // Handle change for Designation
  const handleDesignationChange = (selectedOption) => {
    setFormData({
      ...formData,
      designation: selectedOption, // Update the designation field
    });
  };

  // Handle change for multi-select checkboxes for Work Types
  const handleWorkTypeChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData((prevFormData) => {
      const newWorkTypes = prevFormData.workTypes.includes(value)
        ? prevFormData.workTypes.filter((item) => item !== value)
        : [...prevFormData.workTypes, value];

      return {
        ...prevFormData,
        workTypes: newWorkTypes,
      };
    });
  };

  // Fetch designations from API
  const fetchDesignation = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "http://localhost:5001/api/setup/get-designations",
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
        setDesignations(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching designations:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  console.log(workTypes)

  // Fetch work types from API
  const fetchWorkTypes = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "http://localhost:5001/api/work/get-work-types",
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
        setWorkTypes(result); // Store the work types
      } else {
        const errorResult = await response.json();
        console.error("Error fetching work types:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching work types:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchDesignation();
    fetchWorkTypes();
  }, []);

  // Map API response to checkbox options
  const designationOptions = designations.map((designation) => ({
    value: designation.id,
    label: designation.name,
  }));

  const workTypeOptions = workTypes.map((workType) => ({
    value: workType.id,
    label: workType.name,
  }));

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header title={"Work Assign"} />
      <div
        className="dashboard p-3"
        style={{
          backgroundColor: "#FFFFFF",
          display: "flex",
          flex: 1,
        }}
      >
        {/* Left Section */}
        <form
          onSubmit={handleSubmit}
          style={{
            width: "30%",
            padding: "20px",
            borderRight: "1px solid #ddd",
            overflowY: "auto",
            height: "100%",
          }}
        >
          {/* Designation Select */}
          <div className="form-group mb-3">
            <label htmlFor="designation">Select Designation:</label>
            <select
              id="designation"
              className="form-control"
              value={formData.designation ? formData.designation.value : ""}
              onChange={(e) =>
                handleDesignationChange({
                  value: e.target.value,
                  label: e.target.options[e.target.selectedIndex].text,
                })
              }
            >
              <option value="">Select...</option>
              {designationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Work Types Multi-Select (Checkboxes) */}
          <div className="form-group mb-3">
  <label htmlFor="dropdown2">Select Multiple Work Types:</label>
  <div
    id="dropdown2"
    className="form-control"
    style={{
      minHeight: "100px",
      overflowY: "auto",
      padding: "10px",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {workTypeOptions.map((workType) => (
      <label key={workType.value} style={{ marginBottom: "5px" }}>
        <input
          type="checkbox"
          value={workType.value}
          checked={formData.workTypes.includes(workType.value)}
          onChange={handleWorkTypeChange}
        />
        {workType.label}
      </label>
    ))}
  </div>
</div>


          {/* Submit Button */}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>

          {/* Message Display */}
          {message && (
            <div className="mt-3">
              <p
                className={
                  message.includes("successfully") ? "text-success" : "text-danger"
                }
              >
                {message}
              </p>
            </div>
          )}
        </form>

        {/* Right Section */}
        <div
          style={{
            width: "70%",
            height: "100%",
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <p>Right Section Content</p>
        </div>
      </div>
    </div>
  );
};

export default WorkAssign;
