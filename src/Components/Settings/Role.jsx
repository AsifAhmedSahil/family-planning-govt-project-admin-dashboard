import { useEffect, useState } from "react";
import Header from "../Header";
import { Modal, Button } from "react-bootstrap";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import Swal from "sweetalert2";

const Role = () => {
  const [role, setRole] = useState("");
  const [allRole, setAllRole] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
    
    const [roleToUpdate, setRoleToUpdate] = useState({
      role_id: null,
      role: "",
      create_privilege: "",
      read_privilege: "",
      edit_privilege: "",
      delete_privilege: ""
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      setError("role name is required");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/role/add-role`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            role: role,
            create_privilege: "",
            read_privilege: "",
            edit_privilege: "",
            delete_privilege: ""
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        console.log("role added successfully");
        fetchAllRole()
        setRole("");
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

  const fetchAllRole = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/role/get-role`,
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
        setAllRole(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching all role:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching all role:", error);
    }
  };

  useEffect(()=>{
    fetchAllRole()
  },[])

  const handleDelete = async (id) => {
     const token = localStorage.getItem("authToken");
     try {
       const response = await fetch(
         `${import.meta.env.REACT_APP_BASE_URL}/api/role/delete-role`,
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
           body: JSON.stringify({ role_id: id }),
         }
       );
 
       if (response.ok) {
         console.log("role deleted successfully");
         await fetchAllRole(); 
       } else {
         const errorResult = await response.json();
         console.error("Error deleting work role:", errorResult);
       }
     } catch (error) {
       console.error("Error deleting work role:", error);
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
           text: " ",
           icon: "success",
         });
       }
     });
   };

   const handleUpdateConfirmation = (role_id, role) => {
    setRoleToUpdate({ role_id, role });
    setShowUpdateModal(true);
  };

  const handleUpdateChange = (e) => {
    const { value } = e.target;
    setRoleToUpdate({ ...roleToUpdate, role: value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/role/update-role`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(roleToUpdate),
        }
      );

      if (response.ok) {
        console.log("role updated successfully");
        await fetchAllRole(); 
        setShowUpdateModal(false); 
      } else {
        const errorResult = await response.json();
        console.error("Error updating role:", errorResult);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div>
      <Header title={"রোল"} />
      <div
        className="dashboard p-3"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
      >
        <div className="filter mb-4" style={{ margin: "26px" }}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 d-flex flex-column mb-3">
                <label
                  className="mb-2 text-[16px]"
                  style={{ color: "#323232" }}
                >
                  রোল
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "100%" }}
                  value={role}
                  onChange={(e) => setRole(e.target.value)} 
                />
              </div>
              <div className="col-md-2 d-flex flex-column mb-3">
                <label className="mb-2 text-[16px]"></label>
                <button
                  type="submit"
                  className="btn w-100 text-white mt-4"
                  style={{ backgroundColor: "#13007D" }}
                  disabled={loading} 
                >
                  {loading ? "Adding..." : "রোল যোগ করুন"}
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
                    রোল সমূহ
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
                {allRole.map((item, index) => (
                  <tr key={index}>
                    <td style={{ color: "#6C6C6C" }}>{item.role}</td>

                    <td>
                      <RiDeleteBin6Line
                        onClick={() => handleDeleteConfirmation(item.role_id)}
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
                          handleUpdateConfirmation(item.role_id, item.role)
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
      
          <Modal.Title>রোল আপডেট করুন</Modal.Title>
        </Modal.Header>
          
        <Modal.Body>
          <input
            type="text"
            value={roleToUpdate.field}
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

export default Role;
