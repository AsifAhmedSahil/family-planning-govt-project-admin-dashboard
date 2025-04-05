import Header from "../Header";
import { useEffect, useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";

const SubUnion = () => {
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    upazila: "",
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [upazilaToDelete, setUpazilaToDelete] = useState(null);
  const [upazilaToUpdate, setUpazilaToUpdate] = useState({
    id: null,
    name: "",
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
        console.log(result, "****");
        setData(result); // Update the state with fetched data
      } else {
        const errorResult = await response.json();
        console.error("Error fetching upazilas:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching upazilas:", error);
    }
  };
  

  // Fetch upazilas when the component mounts
  useEffect(() => {
    fetchUpazilas();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/add-upazila`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: formData.upazila }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        await fetchUpazilas();
        setFormData({ upazila: "" });
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
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/delete-upazila`,
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
        console.log("Upazila deleted successfully");
        await fetchUpazilas(); // Fetch the updated list of upazilas
      } else {
        const errorResult = await response.json();
        console.error("Error deleting upazila:", errorResult);
      }
    } catch (error) {
      console.error("Error deleting upazila:", error);
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

  const handleUpdateConfirmation = (id, name) => {
    console.log(name)
    setUpazilaToUpdate({ id, name });
    setShowUpdateModal(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/update-upazila`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(upazilaToUpdate),
        }
      );

      if (response.ok) {
        console.log("Upazila updated successfully");
        await fetchUpazilas(); // Fetch the updated list of upazilas
        setShowUpdateModal(false); // Close the modal
      } else {
        const errorResult = await response.json();
        console.error("Error updating upazila:", errorResult);
      }
    } catch (error) {
      console.error("Error updating upazila:", error);
    }
  };

  const handleUpdateChange = (e) => {
    const { value } = e.target;
    setUpazilaToUpdate({ ...upazilaToUpdate, name: value });
  };

  const convertToBangla = (number) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
      .toString()
      .split("")
      .map((digit) => banglaDigits[parseInt(digit)])
      .join("");
  };

  return (
    <div>
      <Header title={"উপজেলার তথ্য"} />
      <div className="dashboard p-3 " style={{ backgroundColor: "#FFFFFF" }}>
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
                  name="district"
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
                <input
                  type="text"
                  name="upazila"
                  value={formData.upazila}
                  onChange={handleChange}
                  className="form-control"
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

        <hr style={{ color: "gray" }} />

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
                  zIndex: 1,
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
                    জেলা
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
                  >ডিলিট</th>
                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#D9D9D9",
                    }}
                  >আপডেট</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
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
                          handleUpdateConfirmation(item.id, item.name)
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
          <Modal.Title>Update Upazila</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={upazilaToUpdate.name}
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

export default SubUnion;
