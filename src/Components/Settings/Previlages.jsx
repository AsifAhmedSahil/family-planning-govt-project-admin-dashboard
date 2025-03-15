import { useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";

const Previleges = () => {
  // State hooks for storing the values of the form inputs
  const [formData, setFormData] = useState({
    pageName: "",
    pageRoute: "",
  });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/setting/role");
  };

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Logs the form data to the console
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
              <button
                onClick={handleNavigate}
                style={{
                  backgroundColor: "#fff",
                  border: "0px",
                  color: "#13007D",
                }}
              >
                রাউট এসাইন করুন
              </button>
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
                    <th>নাম</th>
                    <th>রাউট</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* {attendancePeriods.map((item) => (
                            <tr key={item.id}>
                              <td>{item.name}</td>
                              <td>{convertTo24HourFormat(item.in_time)}</td>
                              <td>{item.out_time}</td>
                              <td>{item.leaveBalance}</td>
                              <td>
                                <RiDeleteBin6Line
                                  onClick={() => handleDeleteConfirmation(item.id,item.designation_id)}
                                  size={30}
                                  style={{ color: "red", cursor: "pointer" }}
                                />
                              </td>
                            </tr>
                          ))} */}
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
