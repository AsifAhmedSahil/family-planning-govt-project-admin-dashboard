import Select from "react-select"; // Ensure correct import
import { useEffect, useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import Header from "../Header";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";

const Unit = () => {
  

  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  const [units, setUnits] = useState([]);
  console.log(units);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [unitToUpdate, setUnitToUpdate] = useState({
    id: null,
    name: "",
    upazila_id: "",
    union_id:""
  });

  const [formData, setFormData] = useState({
    upazila: null,
    union: null, // Add union state
    unit: "", // Add unit name state
  });

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

  useEffect(() => {
    fetchUpazilas();
    fetchUnions();
    fetchUnits();
  }, []);

  // Mapping upazilas and unions for the dropdown options
  const upazilaOptions = upazilas.map((upazila) => ({
    value: upazila.id,
    label: upazila.name,
  }));

  const unionOptions = unions.map((union) => ({
    value: union.id,
    label: union.name,
  }));

  const handleUpazilaChange = (selectedOption) => {
    setFormData({
      ...formData,
      upazila: selectedOption,
    });
  };

  const handleUnionChange = (selectedOption) => {
    setFormData({
      ...formData,
      union: selectedOption, // Update union in formData state
    });
  };

  const handleUnitChange = (e) => {
    setFormData({
      ...formData,
      unit: e.target.value, // Update unit name in formData state
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    // Check if all fields are filled
    if (!formData.unit || !formData.upazila || !formData.union) {
      console.error("All fields are required");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}/api/setup/add-unit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.unit, // Send unit name
          upazila_id: formData.upazila ? formData.upazila.value : null, // Send upazila ID
          union_id: formData.union ? formData.union.value : null, // Send union ID
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Unit added successfully:", result);
        await fetchUnits()
        setFormData({ upazila: null, union: null, unit: "" }); // Reset form data
      } else {
        const errorResult = await response.json();
        console.error("Error adding unit:", errorResult);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/delete-unit`,
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
        console.log("unit deleted successfully");
        await fetchUnits(); // Fetch the updated list of unions
      } else {
        const errorResult = await response.json();
        console.error("Error deleting unit:", errorResult);
      }
    } catch (error) {
      console.error("Error deleting unit:", error);
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
          text: "ইউনিট ডিলিট সম্পন্ন",
          icon: "success",
        });
      }
    });
  };

  // update

  const handleUpdateConfirmation = (id, name, upazila_id,union_id) => {
    setUnitToUpdate({ id, name, upazila_id ,union_id});
    setShowUpdateModal(true);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/update-unit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: unitToUpdate.id,
            name: unitToUpdate.name,
            upazila_id: unitToUpdate.upazila_id,
            union_id: unitToUpdate.union_id,
          }),
        }
      );

      if (response.ok) {
        // console.log("Union updated successfully");
        toast.success("Unit updated successfully")
        await fetchUnits(); 
        setShowUpdateModal(false); 
      } else {
        const errorResult = await response.json();
        console.error("Error updating units:", errorResult);
      }
    } catch (error) {
      console.error("Error updating units:", error);
    }
  };

  const handleUpdateChange = (e) => {
    const { value } = e.target;
    setUnitToUpdate({ ...unitToUpdate, name: value });
  };

  return (
    <div>
      <Header title={"ইউনিটের তথ্য"} />

      <div className="dashboard p-3" style={{ backgroundColor: "#FFFFFF",marginTop:"15px" }}>
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <form onSubmit={handleSubmit}>
            {" "}
            {/* Attach handleSubmit to form */}
            <div className="row g-6">
              <div className="col-md-2 d-flex flex-column mb-3">
                <label
                  className="mb-2 text-[16px]"
                  style={{ color: "#323232" }}
                >
                  জেলা
                </label>
                <input
                  type="text"
                  value={"চট্টগ্রাম"}
                  className="form-control"
                  disabled
                />
              </div>

              {/* Upazila dropdown */}
              <div className="col-md-2 d-flex flex-column mb-3">
                <label
                  className="mb-2 text-[16px]"
                  style={{ color: "#323232" }}
                >
                  উপজেলা
                </label>
                <Select
                  options={upazilaOptions}
                  value={formData.upazila}
                  onChange={handleUpazilaChange}
                  isClearable
                  placeholder="Select Upazila"
                />
              </div>

              {/* Union dropdown */}
              <div className="col-md-2 d-flex flex-column mb-3">
                <label
                  className="mb-2 text-[16px]"
                  style={{ color: "#323232" }}
                >
                  ইউনিয়ন
                </label>
                <Select
                  options={unionOptions}
                  value={formData.union}
                  onChange={handleUnionChange}
                  isClearable
                  placeholder="Select Union"
                />
              </div>

              {/* Unit input field */}
              <div className="col-md-2 d-flex flex-column mb-3">
                <label
                  className="mb-2 text-[16px]"
                  style={{ color: "#323232" }}
                >
                  ইউনিট
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "100%" }}
                  value={formData.unit}
                  onChange={handleUnitChange} // Handle unit input change
                />
              </div>

              {/* Submit button */}
              <div className="col-md-2 d-flex flex-column mb-3">
                <label className="mb-2 text-[16px]"></label>
                <button
                  type="submit"
                  className="btn w-100 text-white mt-4"
                  style={{ backgroundColor: "#13007D" }}
                >
                  যোগ করুন
                </button>
              </div>
            </div>
          </form>
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
                    ক্রমিক
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    ইউনিট
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    কর্মকর্তা
                  </th>

                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    ডিলিট
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    আপডেট
                  </th>
                </tr>
              </thead>
              <tbody>
                {units.map((item, index) => (
                  <tr key={index}>
                    <td style={{ color: "#6C6C6C" }}>{index + 1}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.name}</td>
                    <td style={{ color: "#6C6C6C" }}>{item.employee}</td>
                    <td>
                      <RiDeleteBin6Line
                        size={30}
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleDeleteConfirmation(item.id)}
                      />
                    </td>
                    <td>
                      <RiEdit2Line
                        size={30}
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() =>
                          handleUpdateConfirmation(
                            item.id,
                            item.name,
                            item.upazila_id,
                            item.union_id
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
          <Modal.Title>ইউনিট আপডেট</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={unitToUpdate.name}
            onChange={handleUpdateChange}
            className="form-control"
          />
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

export default Unit;
