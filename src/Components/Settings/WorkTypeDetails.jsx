import { useEffect, useState } from "react";
import Header from "../Header";
import Select from "react-select";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";

const WorkTypeDetails = () => {
  const [allWorkType, setAllWorkType] = useState([]);
  const [allWorkField, setAllWorkField] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    work_type_id: null,
    field: "",
    field_type: "",
    DropdownMenu: "",
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault(); // Prevent form submission
      addValue(inputValue.trim());
      setInputValue("");
    }
  };

  const addValue = (value) => {
    if (!selectedValues.includes(value)) {
      setSelectedValues([...selectedValues, value]);
    }
  };

  // Remove a value from the selected values
  const removeValue = (valueToRemove) => {
    setSelectedValues(
      selectedValues.filter((value) => value !== valueToRemove)
    );
  };

  const getValuesString = () => {
    return selectedValues.join(",");
  };

  const [workTypeToUpdate, setWorkTypeToUpdate] = useState({
    field_id: null,
    work_type_id: null,
    field: "",
    field_type: "",
  });

  const typeOptions = [
    { value: "", label: "Choose a type" },
    { value: "image", label: "Image" },
    { value: "text", label: "Text" },
    { value: "date", label: "Date" },
    { value: "dropdown", label: "Dropdown" },
  ];

  const fetchWorkType = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/work/get-work-types`,
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

  const fetchWorkField = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/work/get-work-fields`,
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
        setAllWorkField(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching all work field:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching all work type field:", error);
    }
  };

  useEffect(() => {
    fetchWorkType();
    fetchWorkField();
  }, []);

  console.log(allWorkField);

  const workTypeOptions = allWorkType.map((worktype) => ({
    value: worktype.type_id,
    label: worktype.name,
  }));

  const handleWorkTypeChange = (selectedOption) => {
    setFormData({
      ...formData,
      work_type_id: selectedOption ? selectedOption.value : null,
    });
  };

  const handleWorkTypeDetailsChange = (e) => {
    setFormData({
      ...formData,
      field: e.target.value,
    });
  };

  const handleTypeChange = (e) => {
    setFormData({
      ...formData,
      field_type: e.target.value,
    });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/work/delete-work-field`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ field_id: id }),
        }
      );

      if (response.ok) {
        console.log("workfield deleted successfully");
        await fetchWorkField();
      } else {
        const errorResult = await response.json();
        console.error("Error deleting work field:", errorResult);
      }
    } catch (error) {
      console.error("Error deleting work field:", error);
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
          text: "উপজেলা ডিলিট সম্পন্ন",
          icon: "success",
        });
      }
    });
  };

  const handleUpdateConfirmation = (
    field_id,
    work_type_id,
    field,
    field_type
  ) => {
    // Set the selected field data to the state for update
    setWorkTypeToUpdate({
      field_id,
      work_type_id,
      field,
      field_type,
    });
    setShowUpdateModal(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setWorkTypeToUpdate({
      ...workTypeToUpdate,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    const { field_id, work_type_id, field, field_type } = workTypeToUpdate;
    console.log(workTypeToUpdate);
    if (!work_type_id || !field || !field_type) {
      alert("All fields are required");
      return;
    }

    const requestBody = {
      field_id,
      work_type_id,
      field,
      field_type,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/work/update-work-field`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
      const result = await response.json();

      if (response.ok) {
        setShowUpdateModal(false);
        fetchWorkField();
      } else {
        alert(result.message || "Error updating work field");
      }
    } catch (error) {
      console.error("Error updating work field:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // const { work_type_id, field, field_type,DropdownMenu } = formData;
    // console.log(formData)

    // if (!work_type_id || !field || !field_type) {
    //   setError("All fields are required");
    //   setLoading(false);
    //   return;
    // }

    const requestBody = {
      ...formData,
      DropdownMenu: getValuesString(),
    };

    console.log(requestBody);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/work/add-work-field`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Success:", result);
        fetchWorkField();

        setLoading(false);
      } else {
        console.error("Error:", result);
        setError(result.message || "Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("Internal server error");
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title={"কাজের ক্ষেত্রের বিবরনী"} />
      <div
        className="dashboard p-3"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
      >
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <form onSubmit={handleSubmit}>
            <div className="row">
            <div className="col-md-3 d-flex flex-column mb-3">
                <label
                  className="mb-2 text-[16px]"
                  style={{ color: "#323232" }}
                >
                  কাজের ক্ষেত্র
                </label>
                <Select
                  options={workTypeOptions}
                  value={
                    formData.work_type_id
                      ? {
                          value: formData.work_type_id,
                          label: workTypeOptions.find(
                            (option) => option.value === formData.work_type_id
                          )?.label,
                        }
                      : null
                  }
                  onChange={handleWorkTypeChange}
                  isClearable
                  placeholder="Select Work Type"
                />
              </div>
              <div className="col-md-3 d-flex flex-column mb-3">
                <label
                  className="mb-2 text-[16px]"
                  style={{ color: "#323232" }}
                >
                  কাজের ক্ষেত্রের বিবরনী
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "100%" }}
                  value={formData.field}
                  onChange={handleWorkTypeDetailsChange}
                />
              </div>
              
              <div className="col-md-3 d-flex flex-column mb-3">
                <label>Select a Type</label>
                <select
                  value={formData.field_type}
                  onChange={handleTypeChange}
                  className="form-control"
                  style={{  marginTop: "10px" }}
                >
                  {typeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
              </div>
              
              <div className="col-md-3 d-flex flex-column mb-3">
                <label className="mb-2 text-[16px]"></label>
                <button
                  type="submit"
                  className="btn w-100 text-white mt-4"
                  style={{ backgroundColor: "#13007D" }}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "কাজের ক্ষেত্র যোগ করুন"}
                </button>
              </div>
              {formData.field_type === "dropdown" && (
                  <div className="row">
                    <div className="col-md-8">
                      <label htmlFor="multiInput" className="form-label">
                        Add Multiple Values
                      </label>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          id="multiInput"
                          className="form-control"
                          placeholder="Type and press Enter to add"
                          value={inputValue}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                        />
                      </div>

                      <div className="selected-values mt-2">
                        {selectedValues.map((value, index) => (
                          <span
                            key={index}
                            className="badge bg-primary me-2 mb-2 p-2"
                          >
                            {value}
                            <button
                              type="button"
                              className="btn-close btn-close-white ms-2"
                              style={{ fontSize: "0.5rem" }}
                              onClick={() => removeValue(value)}
                              aria-label="Remove"
                            ></button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </form>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>

        <hr />

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
                  backgroundColor: "#D9D9D9",
                }}
              >
                <tr>
                  <th
                    style={{
                      color: "#323232",
                      width: "40%",
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    কাজের ক্ষেত্রের বিবরনী
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      width: "40%",
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    টাইপ
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      textAlign: "center",
                      width: "10%",
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    ডিলিট
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      textAlign: "center",
                      width: "10%",
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    আপডেট
                  </th>
                </tr>
              </thead>
              <tbody>
                {allWorkField.map((item, index) => (
                  <tr key={index}>
                    <td style={{ color: "#6C6C6C" }}>{item.field}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.field_type}</td>
                    <td>
                      <RiDeleteBin6Line
                        onClick={() => handleDeleteConfirmation(item.field_id)}
                        size={30}
                        style={{
                          color: "red",
                          cursor: "pointer",
                          textAlign: "center",
                          width: "100%",
                        }}
                      />
                    </td>
                    <td>
                      <RiEdit2Line
                        size={30}
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          textAlign: "center",
                          width: "100%",
                        }}
                        onClick={() =>
                          handleUpdateConfirmation(
                            item.field_id,
                            item.work_type_id,
                            item.field,
                            item.field_type
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>কাজের ক্ষেত্রের বিবরনী আপডেট করুন</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Work Type</label>
            <Select
              options={workTypeOptions}
              value={
                workTypeToUpdate.work_type_id
                  ? {
                      value: workTypeToUpdate.work_type_id,
                      label: workTypeOptions.find(
                        (option) =>
                          option.value === workTypeToUpdate.work_type_id
                      )?.label,
                    }
                  : null
              }
              onChange={(option) =>
                setWorkTypeToUpdate({
                  ...workTypeToUpdate,
                  work_type_id: option.value,
                })
              }
              isClearable
              placeholder="Select Work Type"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Work Field</label>
            <input
              type="text"
              className="form-control"
              style={{ width: "100%" }}
              value={workTypeToUpdate.field}
              onChange={handleUpdateChange}
              name="field"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Field Type</label>
            <select
              value={workTypeToUpdate.field_type}
              onChange={handleUpdateChange}
              name="field_type"
              className="form-control"
              style={{ width: "200px", marginTop: "10px" }}
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WorkTypeDetails;
