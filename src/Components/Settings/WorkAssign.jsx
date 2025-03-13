import { useState, useEffect } from "react";
import Header from "../Header";

import Select from "react-select";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const WorkAssign = () => {
  const [formData, setFormData] = useState({
    designation: [], // Array to hold selected designations
    workTypes: [], // Array to hold selected work types
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [designations, setDesignations] = useState([]);
  const [workType, setWorkType] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [assignedWorkTypes, setAssignedWorkTypes] = useState([]);

  const handleChangeWorktype = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    console.log(selectedOptions)
    setFormData((prevFormData) => {
      // Only update the workTypes field with the newly selected work types
      return {
        ...prevFormData,
        workTypes: selectedOptions, // Add selected work types (this is automatically handled by MultiSelect)
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (formData.designation.length === 0 || formData.workTypes.length === 0) {
    //   setMessage("Please select at least one designation and one work type.");
    //   return;
    // }

    console.log(formData)
    const assignData = formData.workTypes.flatMap((workType) => ({
      designation_id: formData.designation.value,  // Access value of the single designation
      work_type_id: workType.value,  // Access value of the work type
    }));
    console.log(assignData)

    const requestBody = {
      assignData: JSON.stringify(assignData),
    };

    console.log(requestBody);

    setLoading(true);
    setMessage("");

   
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5001/api/work/assign-workType", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
  
      if (response.status === 201) {
        setMessage("work asign added successfully");
        console.log("work asign added successfully");
        await fetchAssignedWorkTypes(requestBody.designation_id)
      } else if (response.status === 400) {
        setMessage(data.message || "Invalid data");
      } else if (response.status === 500) {
        setMessage("Internal server error. Please try again later.");
      }
    } catch (error) {
      setMessage("An error occurred while submitting the form.",error);
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  // Handle designation selection change
  const handleDesignationChange = (selectedOption) => {
    setFormData({
      ...formData,
      designation: selectedOption, // Update designation with selected option values
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
        setWorkType(
          result.map((wt) => ({ label: wt.name, value: wt.type_id }))
        );
        
        // setWorkType(result)
      } else {
        const errorResult = await response.json();
        console.error("Error fetching work types:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching work types:", error);
    }
  };

  const fetchAssignedWorkTypes = async () => {

  
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5001/api/work/get-assign-workType", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      
      });

      console.log(response)
  
     
  
      const data = await response.json();
      if (response.ok) {
        // Successfully retrieved the assigned work types
        console.log("Assigned Work Types:", data);
        console.log(data)
        setAssignedWorkTypes(data);
        await fetchAssignedWorkTypes()
      } else if (response.status === 400) {
        setMessage(data.message || "Designation ID is required");
      } else if (response.status === 500) {
        setMessage("Internal server error. Please try again later.");
      }
    } catch (error) {
      setMessage("An error occurred while fetching the assigned work types.");
      console.error("Error fetching assigned work types:", error);
    }
  };
  
  const groupedData = assignedWorkTypes.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = [];
    }
    acc[item.name].push(item);
    return acc;
  }, {});

  console.log(groupedData)
  // Run API calls on component mount
  useEffect(() => {
    fetchDesignation();
    fetchWorkTypes();
    fetchAssignedWorkTypes()
    
    
  }, []);

  const designationOptions = designations.map((designation) => ({
    value: designation.id,
    label: designation.name,
  }));

  const handleDelete = async (id) => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch(
          "http://localhost:5001/api/work/delete-assign-workType",
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
          console.log("work type deleted successfully");
          await fetchAssignedWorkTypes(); // Fetch the updated list of unions
        } else {
          const errorResult = await response.json();
          console.error("Error deleting work type:", errorResult);
        }
      } catch (error) {
        console.error("Error deleting work type:", error);
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
            <Select
              options={designationOptions}
              value={formData.designation}
              onChange={handleDesignationChange}
            >
              {designationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Work Types Multi-Select */}
          <div className="form-group mb-3">
            <label htmlFor="workTypes">Select Multiple Work Types:</label>
            {/* <MultiSelect
              options={workTypes}
              value={formData.workTypes}
              onChange={handleWorkTypeChange}
              labelledBy="Select Work Types"
            /> */}
            <Select
              options={workType}
              value={selectedOptions}
              onChange={handleChangeWorktype}
              isMulti={true}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-100 text-white mt-4"
            style={{ backgroundColor: "#13007D" }}
          >
            কাজের ক্ষেত্র যোগ করুন
          </button>

          {/* Message Display */}
          {message && (
            <div className="mt-3">
              <p
                className={
                  message.includes("successfully")
                    ? "text-success"
                    : "text-danger"
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
                          }}
                        >
                          <tr>
                            <th
                              style={{
                                color: "#323232",
                                position: "sticky",
                                top: 0,
                                width:"30%",
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
                              কাজের ক্ষেত্র
                            </th>
                            
                         
                            
                          </tr>
                        </thead>
                        <tbody>
                        {Object.keys(groupedData).map((name) => {
        const items = groupedData[name];
        return (
          <tr key={name}>
            <td style={{ color: "#6C6C6C" }}>{name}</td>
            <td style={{ color: "#6C6C6C" }}>
              {items.map((item, index) => (
                 <div key={index} style={{ marginBottom: "5px", display: "flex", alignItems: "center" }}>
                 {/* Fixed width for the span */}
                 <span style={{ display: "inline-block", width: "500px" }}>{item.work_type}</span>
                 {/* The delete button is in line with work_type text */}
                 <RiDeleteBin6Line
                   onClick={() => handleDeleteConfirmation(item.id)} // Add delete functionality here
                   size={20}
                   style={{ color: "red", cursor: "pointer", marginLeft: "10px" }}
                 />
               </div>
                
              ))}
            </td>
            
          </tr>
        );
      })}
                        </tbody>
                      </table>
                    </div>
                  </div>
        </div>
      </div>
    </div>
  );
};

export default WorkAssign;
