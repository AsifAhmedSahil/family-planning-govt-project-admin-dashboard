import { useEffect, useState } from "react";
import Header from "../Header";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";

const WorkType = () => {
  const [workType, setWorkType] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allWorkType, setAllWorkType] = useState([]);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  
  const [workTypeToUpdate, setWorkTypeToUpdate] = useState({
    type_id: null,
    name: "",
  });
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!workType) {
      setError("Work type name is required");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/work/add-work-type`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: workType }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        fetchWorkType();
        setWorkType("");
        toast.success("work type added successfully")
      } else {
        console.error(result);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Internal server error");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchWorkType();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/work/delete-work-type`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ type_id: id }),
        }
      );

      if (response.ok) {
        console.log("worktype deleted successfully");
        await fetchWorkType(); // Fetch the updated list of upazilas
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
          text: "কাজের ক্ষেত্র ডিলিট সম্পন্ন",
          icon: "success",
        });
      }
    });
  };

  const handleUpdateConfirmation = (type_id, name) => {
  
    setWorkTypeToUpdate({ type_id, name });
    setShowUpdateModal(true);
  };

  const handleUpdateChange = (e) => {
    const { value } = e.target;
    setWorkTypeToUpdate({ ...workTypeToUpdate, name: value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/work/update-work-type`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(workTypeToUpdate),
        }
      );

      if (response.ok) {
        
        toast.success("work type updated successfully")
        await fetchWorkType(); // Fetch the updated list of upazilas
        setShowUpdateModal(false); // Close the modal
      } else {
        const errorResult = await response.json();
        console.error("Error updating work type:", errorResult);
      }
    } catch (error) {
      console.error("Error updating work type:", error);
    }
  };

  return (
    <div>
      <Header title={"কাজের ক্ষেত্র"} />
      <div className="dashboard p-3" style={{ backgroundColor: "#FFFFFF",borderRadius:"15px",marginTop:"15px" }}>
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 d-flex flex-column mb-3">
                <label
                  className="mb-2 text-[16px]"
                  style={{ color: "#323232" }}
                >
                  কাজের ক্ষেত্র
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "100%" }}
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)} // Handle unit input change
                />
              </div>
              <div className="col-md-2 d-flex flex-column mb-3">
                <label className="mb-2 text-[16px]"></label>
                <button
                  type="submit"
                  className="btn w-100 text-white mt-4"
                  style={{ backgroundColor: "#13007D" }}
                  disabled={loading} // Disable the button while loading
                >
                  {loading ? "Adding..." : "কাজের ক্ষেত্র যোগ করুন"}
                </button>
              </div>
            </div>
          </form>

          {/* Show error message if any */}
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
                      width: "80%", // Adjust width as needed
                    }}
                  >
                    কাজের ক্ষেত্র
                  </th>

                  <th
                    style={{
                      color: "#323232",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#D9D9D9",
                      textAlign: "center",
                      width: "10%", // Adjust width as needed
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
                      textAlign: "center",
                      width: "10%", // Adjust width as needed
                    }}
                  >
                    আপডেট
                  </th>
                </tr>
              </thead>
              <tbody>
                {allWorkType.map((item, index) => (
                  <tr key={index}>
                    <td style={{ color: "#6C6C6C" }}>{item.name}</td>

                    <td>
                      <RiDeleteBin6Line
                        onClick={() => handleDeleteConfirmation(item.type_id)}
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
                          handleUpdateConfirmation(item.type_id, item.name)
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
          <Modal.Title>কাজের ক্ষেত্র আপডেট করুন</Modal.Title>
        </Modal.Header>
          
        <Modal.Body>
          <input
            type="text"
            value={workTypeToUpdate.name}
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

export default WorkType;
