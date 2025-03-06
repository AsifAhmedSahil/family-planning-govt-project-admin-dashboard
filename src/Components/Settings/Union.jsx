import Header from "../Header";
import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
// import 'react-select/dist/styles.css';

const Union = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);
  console.log(unions);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [unionToUpdate, setUnionToUpdate] = useState({
    id: null,
    name: "",
    upazila_id: "",
  });

  const [formData, setFormData] = useState({
    upazila: null,
    union: "",
  });

  const fetchUpazilas = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "http://localhost:5001/api/setup/get-upazilas",
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
        setUpazilas(result); // Update the state with fetched data
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
        "http://localhost:5001/api/setup/get-unions",
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
        setUnions(result); // Update the state with fetched data
      } else {
        const errorResult = await response.json();
        console.error("Error fetching unions:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching unions:", error);
    }
  };

  // Fetch upazilas and unions when the component mounts
  useEffect(() => {
    fetchUpazilas();
    fetchUnions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        "http://localhost:5001/api/setup/add-union",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.union,
            upazila_id: formData.upazila ? formData.upazila.value : null,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        await fetchUnions();
        setFormData({ upazila: null, union: "" });
      } else {
        const errorResult = await response.json();
        console.error("Error:", errorResult);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "http://localhost:5001/api/setup/delete-union",
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
        console.log("Union deleted successfully");
        await fetchUnions(); // Fetch the updated list of unions
      } else {
        const errorResult = await response.json();
        console.error("Error deleting union:", errorResult);
      }
    } catch (error) {
      console.error("Error deleting union:", error);
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
          text: "উপজেলা ডিলিট সম্পন্ন",
          icon: "success",
        });
      }
    });
  };

  const handleUpazilaChange = (selectedOption) => {
    setFormData({
      ...formData,
      upazila: selectedOption,
    });
  };

  

  const handleUnionChange = (e) => {
    setFormData({
      ...formData,
      union: e.target.value,
    });
  };

  const handleUpdateConfirmation = (id, name, upazila_id) => {
    setUnionToUpdate({ id, name, upazila_id });
    setShowUpdateModal(true);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "http://localhost:5001/api/setup/update-union",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: unionToUpdate.id,
            name: unionToUpdate.name,
            upazila_id: unionToUpdate.upazila_id,
          }),
        }
      );

      if (response.ok) {
        console.log("Union updated successfully");
        await fetchUnions(); // Fetch the updated list of unions
        setShowUpdateModal(false); // Close the modal
      } else {
        const errorResult = await response.json();
        console.error("Error updating union:", errorResult);
      }
    } catch (error) {
      console.error("Error updating union:", error);
    }
  };

  const handleUpdateChange = (e) => {
    const { value } = e.target;
    setUnionToUpdate({ ...unionToUpdate, name: value });
  };

  const convertToBangla = (number) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
      .toString()
      .split("")
      .map((digit) => banglaDigits[parseInt(digit)])
      .join("");
  };

  const upazilaOptions = upazilas.map((upazila) => ({
    value: upazila.id,
    label: upazila.name,
  }));

  return (
    <div>
      <Header title={"ইউনিয়নের তথ্য"} />
      <div className="dashboard p-3" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <form onSubmit={handleSubmit}>
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
                  readOnly
                />
              </div>
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
              <div className="col-md-2 d-flex flex-column mb-3">
                <label
                  className="mb-2 text-[16px]"
                  style={{ color: "#323232" }}
                >
                  ইউনিয়ন
                </label>
                <input
                  type="text"
                  name="union"
                  value={formData.union}
                  onChange={handleUnionChange}
                  className="form-control"
                  placeholder="Enter Union Name"
                />
              </div>
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
                  backgroundColor: "#fff",
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
                    ক্রমিক
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    ইউনিয়ন
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    কর্মকর্তা
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    ডিলিট
                  </th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    আপডেট
                  </th>
                </tr>
              </thead>
              <tbody>
                {unions.map((item, index) => (
                  <tr key={index}>
                    <td style={{ color: "#6C6C6C" }}>
                      {convertToBangla(index + 1)}
                    </td>
                    <td style={{ color: "#6C6C6C" }}>{item.name}</td>
                    <td style={{ color: "#6C6C6C" }}>{0}</td>
                    <td>
                      <RiDeleteBin6Line
                        onClick={() => handleDeleteConfirmation(item.id)}
                        size={30}
                        style={{ color: "red", cursor: "pointer" }}
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
                            item.upazila_id
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
          <Modal.Title>Update Union</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={unionToUpdate.name}
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

export default Union;
