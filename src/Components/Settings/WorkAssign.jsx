import { useState, useEffect } from "react";
import Header from "../Header";
import { MultiSelect } from "react-multi-select-component";

const WorkAssign = () => {
  const [formData, setFormData] = useState({
    designation: [], // Array to hold selected designations
    workTypes: [],   // Array to hold selected work types
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [designations, setDesignations] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.designation.length === 0 || formData.workTypes.length === 0) {
      setMessage("Please select at least one designation and one work type.");
      return;
    }

    const assignData = formData.workTypes.flatMap((workType) =>
      formData.designation.map((designationId) => ({
        designation_id: designationId,
        work_type_id: workType.value,
      }))
    );

    const requestBody = {
      assignData: JSON.stringify(assignData),
    };

    console.log(requestBody);

    setLoading(true);
    setMessage("");

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

  // Handle designation selection change
  const handleDesignationChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      designation: options, // Update designation with selected option values
    });
  };

  // Handle work type selection change (MultiSelect)
  const handleWorkTypeChange = (selectedWorkTypes) => {
    setFormData((prevFormData) => {
      // Only update the workTypes field with the newly selected work types
      return {
        ...prevFormData,
        workTypes: selectedWorkTypes,  // Add selected work types (this is automatically handled by MultiSelect)
      };
    });
  };
  

  // Fetch designations from the API
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

  // Fetch work types from the API
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
        setWorkTypes(result.map((wt) => ({ label: wt.name, value: wt.id })));
      } else {
        const errorResult = await response.json();
        console.error("Error fetching work types:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching work types:", error);
    }
  };

  // Run API calls on component mount
  useEffect(() => {
    fetchDesignation();
    fetchWorkTypes();
  }, []);

  const designationOptions = designations.map((designation) => ({
    value: designation.id,
    label: designation.name,
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
          {/* Designation Dropdown */}
          <div className="form-group mb-3">
            <label htmlFor="designation">Select Designations:</label>
            <select
              id="designation"
              className="form-control"
              multiple
              value={formData.designation}
              onChange={handleDesignationChange}
            >
              {designationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Work Types Multi-Select */}
          <div className="form-group mb-3">
            <label htmlFor="workTypes">Select Multiple Work Types:</label>
            <MultiSelect
              options={workTypes}
              value={formData.workTypes}
              onChange={handleWorkTypeChange}
              labelledBy="Select Work Types"
            />
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
