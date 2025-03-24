import { useEffect, useState } from "react";
import Header from "../Header";

import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const Previleges = () => {
  // State hooks for storing the values of the form inputs
  const [formData, setFormData] = useState({
    pageName: "",
    pageRoute: "",
  });

  const [allPages, setAllPages] = useState([]);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const requestData = {
        pageName: formData.pageName,
        pageRoute: formData.pageRoute,
      };

      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/add-page-route`,
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
        console.log("page route added successfully:", result);
        setFormData({
          pageName: "",
          pageRoute: "",
        });
        await fetchAllPages();
      } else {
        const errorResult = await response.json();
        console.error("Error:", errorResult);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAllPages = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/get-page-route`,
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
        setAllPages(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching roles:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchAllPages();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/setup/delete-page-route`,
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
        console.log("pages deleted successfully");
        await fetchAllPages();
      } else {
        const errorResult = await response.json();
        console.error("Error deleting pages:", errorResult);
      }
    } catch (error) {
      console.error("Error deleting pages:", error);
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
          text: "",
          icon: "success",
        });
      }
    });
  };

  return (
    <div style={{ height: "800px", display: "flex", flexDirection: "column" }}>
      <Header title={"প্রিভিলেজ তথ্য"} />

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
          {/* Page Name Input */}
          <div className="form-group mb-3">
            <label
              htmlFor="pageName"
              style={{
                fontWeight: "600",
                fontSize: "16px",
                color: "#565656",
                marginBottom: "20px",
              }}
            >
              পেইজের নাম
            </label>
            <input
              type="text"
              className="form-control"
              name="pageName"
              value={formData.pageName}
              onChange={handleChange}
            />
          </div>

          {/* Page Route Input */}
          <div className="form-group mb-3">
            <label
              htmlFor="pageRoute"
              style={{
                fontWeight: "600",
                fontSize: "16px",
                color: "#565656",
                marginBottom: "20px",
              }}
            >
              পেইজের রাউট
            </label>
            <input
              type="text"
              className="form-control"
              name="pageRoute"
              value={formData.pageRoute}
              onChange={handleChange}
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
            // padding: "20px",
            overflowY: "auto",
          }}
        >
          <div className="table-container" style={{ margin: "26px" }}>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ marginBottom: "15px" }}
            >
              <h1
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#323232",
                }}
              >
                রাউট সমূহ
              </h1>
            </div>

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
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#fff",
                        width: "30%",
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
                        width: "50%",
                      }}
                    >
                      রাউট
                    </th>

                    <th
                      style={{
                        color: "#323232",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#fff",
                        width: "20%",
                      }}
                    >
                      ডিলিট
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allPages.map((item) => (
                    <tr key={item.id}>
                      <td>{item.pageName}</td>

                      <td>{item.pageRoute}</td>

                      <td>
                        <RiDeleteBin6Line
                          onClick={() => handleDeleteConfirmation(item.id)}
                          size={30}
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

export default Previleges;
