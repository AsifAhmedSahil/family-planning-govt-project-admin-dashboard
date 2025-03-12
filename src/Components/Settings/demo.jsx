import { useEffect, useState } from "react";
import Header from "../Header";
import Select from "react-select"; // Import react-select

const WorkAssign = () => {
  // State for form data
  const [formData, setFormData] = useState({
    designation: null, // For Designation (with react-select)
    workTypes: [],      // For Work Types (Multi-select)
  });
  const [message, setMessage] = useState(""); // For showing response message
  const [loading, setLoading] = useState(false); // To show loading state
  const [designations, setDesignations] = useState([]); // For storing designations fetched from API
  const [allWorkTypes, setAllWorkType] = useState([]); // For storing work types fetched from API

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data before making the API call
    if (!formData.designation || formData.workTypes.length === 0) {
      setMessage("Please select both a designation and at least one work type.");
      return;
    }

    // Prepare the request body based on the API documentation
    const assignData = formData.workTypes.map((workTypeId) => ({
      designation_id: formData.designation.value,
      work_type_id: workTypeId.value,
    }));

    const requestBody = {
      assignData: JSON.stringify(assignData),
    };

    console.log(requestBody);

    setLoading(true);
    setMessage(""); // Reset message before submitting

    // try the API call (commented out for now)
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

  // Handle change for Designation (using react-select)
  const handleDesignationChange = (selectedOption) => {
    setFormData({
      ...formData,
      designation: selectedOption, // Update the designation field in formData
    });
  };

  // Handle change for multi-select dropdown with react-select for Work Types
  const handleWorkTypesChange = (selectedOptions) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      workTypes: selectedOptions || [], // Update the workTypes field with selected work types
    }));
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
        console.error("Error fetching designation:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching designation:", error);
    }
  };

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
        setAllWorkType(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching all work types:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching all work types:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchDesignation();
    fetchWorkTypes();
  }, []);

  // Map API response to react-select format
  const designationOptions = designations.map((designation) => ({
    value: designation.id,
    label: designation.name,
  }));

  const workTypeOptions = allWorkTypes.map((workType) => ({
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
          {/* react-select for Designation */}
          <div className="form-group mb-3">
            <label htmlFor="dropdown1">Select Designation:</label>
            <Select
              options={designationOptions} // Options for Designation
              value={formData.designation} // Current value (selected option)
              onChange={handleDesignationChange} // Update on change
              isClearable // Allow clearing the selection
              placeholder="Select Designation" // Placeholder
            />
          </div>

          {/* react-select for Work Types (Multi-select) */}
          <div className="form-group mb-3">
            <label htmlFor="dropdown2">Select Multiple Work Types:</label>
            <Select
              isMulti // Enable multiple selections
              options={workTypeOptions} // Options for Work Types
              value={formData.workTypes} // Current selected work types
              onChange={handleWorkTypesChange} // Update on change
              placeholder="Select Work Types" // Placeholder
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>

          {/* Message display */}
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
          {/* You can add any content here for the right section */}
          <p>Right Section Content</p>
        </div>
      </div>
    </div>
  );
};

export default WorkAssign;
