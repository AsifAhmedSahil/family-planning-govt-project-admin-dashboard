import { useEffect, useState } from "react";
import Select from "react-select";
import Header from "../Header";

import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const Registration = () => {
  const [formData, setFormData] = useState({
    userType: { value: "admin", label: "Admin" }, // Default value
    empId: "", // Initialize empId
    password: "", // Initialize password
    roleId: null, // Initialize roleId
  });

  const [roles, setRoles] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  console.log(roles);

  // Options for react-select
  const userTypeOptions = [
    { value: "admin", label: "Admin" },
    { value: "employee", label: "Employee" },
  ];
  const roleTypeOptions = roles.map((role) => ({
    value: role.role_id,
    label: role.role,
  }));

  const handleRoleChange = (selectedOption) => {
    setFormData({
      ...formData,
      roleId: selectedOption,
    });
  };

  // Handle change for react-select
  const handleChange = (selectedOption) => {
    setFormData({
      ...formData,
      userType: selectedOption, // Set the selected option
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const requestData = {
        user_type: formData.userType.value,
        emp_id: formData.empId,
        password: formData.password,
        role_id: formData.roleId.value,
      };

      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        await fetchAllUsers();
      } else {
        const errorResult = await response.json();
        console.error("Error:", errorResult);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchRoles = async () => {
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
        setRoles(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching roles:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };
  const fetchAllUsers = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/auth/get-user`,
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
        setAllUsers(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching roles:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  console.log(allUsers);

  useEffect(() => {
    fetchRoles();
    fetchAllUsers();
  }, []);

  const convertToBangla = (number) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
      .toString()
      .split("")
      .map((digit) => banglaDigits[parseInt(digit)])
      .join("");
  };
  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/auth/delete-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ user_id: id }),
        }
      );

      if (response.ok) {
        console.log("user deleted successfully");
        await fetchAllUsers(); // Fetch the updated list of upazilas
      } else {
        const errorResult = await response.json();
        console.error("Error deleting user:", errorResult);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    console.log(id);
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
          text: "",
          icon: "success",
        });
      }
    });
  };

  return (
    <div style={{ height: "800px", display: "flex", flexDirection: "column" }}>
      <Header title={"নিবন্ধন তথ্য"} />

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
          {/* User Type Select */}
          <div className="form-group mb-3">
            <label
              htmlFor="userType"
              style={{
                fontWeight: "600",
                fontSize: "16px",
                color: "#565656",
                marginBottom: "20px",
              }}
            >
              ইউজার টাইপ
            </label>
            <Select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              options={userTypeOptions}
            />
          </div>

          {/* Employee ID Input */}
          <div className="form-group mb-3">
            <label
              htmlFor="empId"
              style={{
                fontWeight: "600",
                fontSize: "16px",
                color: "#565656",
                marginBottom: "20px",
              }}
            >
              আইডি
            </label>
            <input
              type="text"
              className="form-control"
              name="empId"
              value={formData.empId}
              onChange={handleInputChange}
            />
          </div>

          {/* Password Input */}
          <div className="form-group mb-3">
            <label
              htmlFor="password"
              style={{
                fontWeight: "600",
                fontSize: "16px",
                color: "#565656",
                marginBottom: "20px",
              }}
            >
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Role ID Input */}
          <div className="form-group mb-3">
            <label
              htmlFor="roleId"
              style={{
                fontWeight: "600",
                fontSize: "16px",
                color: "#565656",
                marginBottom: "20px",
              }}
            >
              রোল
            </label>
            <Select
              name="roleId"
              value={formData.roleId}
              onChange={handleRoleChange}
              options={roleTypeOptions}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#13007D",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            যোগ করুন
          </button>
        </form>

        {/* Right Section */}
        <div
          style={{
            width: "70%",
            height: "100%",
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
                    zIndex: 1,
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
                      আইডি
                    </th>
                    <th
                      style={{
                        color: "#323232",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#fff",
                      }}
                    >
                      নাম
                    </th>
                    <th
                      style={{
                        color: "#323232",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#fff",
                      }}
                    >
                      ইউজার টাইপ
                    </th>
                    <th
                      style={{
                        color: "#323232",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#fff",
                      }}
                    >
                      রোল
                    </th>

                    <th
                      style={{
                        color: "#323232",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#fff",
                      }}
                    ></th>
                    
                    
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((item, index) => (
                    <tr key={index}>
                      <td style={{ color: "#6C6C6C" }}>
                        {convertToBangla(item.emp_id)}
                      </td>
                      <td style={{ color: "#6C6C6C" }}>{item.name}</td>
                      <td style={{ color: "#6C6C6C" }}>{item.user_type}</td>
                      <td style={{ color: "#6C6C6C" }}>{item.role}</td>

                      <td >
                        <RiDeleteBin6Line
                          onClick={() => handleDeleteConfirmation(item.userId)}
                          size={20}
                          style={{ color: "red", cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
