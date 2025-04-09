import { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useUser } from "../context/UserProvider";
import toast from "react-hot-toast";
import { CDateRangePicker } from "@coreui/react-pro";

const Profile = () => {
  const { user } = useUser();
  console.log(user);

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });

  const [attendenceData, setAttendenceData] = useState([]);

  const [activeTab, setActiveTab] = useState("personal");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function getDateFromISOString(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
            emp_id: user?.emp_id,
          }),
        }
      );
      console.log(response);

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        console.log("Employee registered successfully:", result);

        toast.success("Password Changed successfully");
      } else {
        const errorResult = await response.json();
        console.error("Error:", errorResult);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAttendance = async () => {
    const token = localStorage.getItem("authToken");
    const { startDate, endDate } = formData;

    if (!startDate || !endDate) {
      console.error("Start date and end date are mandatory!");
      return;
    }

    const requestBody = {
      emp_id: user?.emp_id,

      startDate: getDateFromISOString(startDate),
      endDate: getDateFromISOString(endDate),
    };

    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}/api/attendance/get-attendance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setAttendenceData(result);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching attendance:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      fetchAttendance();
    }
  }, [formData]);

  console.log(attendenceData);

  return (
    <div style={styles.container}>
      <Header title={"প্রোফাইল"} />
      <div className=" mt-3">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div style={styles.profileCard}>
              <img
                src={`${import.meta.env.REACT_APP_BASE_URL}/uploads/${
                  user?.image
                }`}
                alt="Profile Picture"
                style={styles.profileImg}
              />
              <div style={styles.cardBody}>
                <h2 style={styles.cardTitle}>{user?.name}</h2>
                <p style={styles.cardText}>{user?.role}</p>
                <div className="tabs">
                  <ul style={styles.tabList}>
                    <li
                      style={
                        activeTab === "personal" ? styles.activeTab : styles.tab
                      }
                      onClick={() => setActiveTab("personal")}
                    >
                      Personal Info
                    </li>
                    <li
                      style={
                        activeTab === "attendance"
                          ? styles.activeTab
                          : styles.tab
                      }
                      onClick={() => setActiveTab("attendance")}
                    >
                      Attendance
                    </li>
                    <li
                      style={
                        activeTab === "security" ? styles.activeTab : styles.tab
                      }
                      onClick={() => setActiveTab("security")}
                    >
                      Security
                    </li>
                  </ul>
                </div>

                {/* Personal Info Tab */}
                {activeTab === "personal" && (
                  <div style={styles.tabContent}>
                    <div style={styles.details}>
                      <p>
                        <strong>Employee ID:</strong> {user?.emp_id}
                      </p>
                      <p>
                        <strong>Mobile:</strong> {user?.mobile}
                      </p>
                      <p>
                        <strong>NID:</strong> {user?.nid}
                      </p>
                      <p>
                        <strong>Address:</strong> {user?.address}
                      </p>
                      <p>
                        <strong>Upazila:</strong> {user?.upazila}
                      </p>
                      <p>
                        <strong>Union:</strong> {user?.unionName}
                      </p>
                      <p>
                        <strong>Unit:</strong> {user?.unitName}
                      </p>
                    </div>
                  </div>
                )}

                {/* Attendance Tab */}
                {activeTab === "attendance" && (
                  <div style={styles.tabContent}>
                    <div className="col-md-4">
                      <CDateRangePicker
                        label="তারিখ"
                        locale="en-US"
                        onStartDateChange={(date) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            startDate: date,
                          }));
                        }}
                        onEndDateChange={(date) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            endDate: date,
                          }));
                        }}
                      />
                    </div>

                    <div
                      style={{
                        width: "100%",
                        padding: "",
                        borderRight: "1px solid #ddd",
                        overflowY: "auto",
                        height: "260px",
                      }}
                    >
                      <div
                        className="table-container"
                        style={{ margin: "26px" }}
                      >
                        <div
                          className="table-responsive"
                          style={{ maxHeight: "400px" }}
                        >
                          {attendenceData && attendenceData.length > 0 ? (
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
                                      width: "20%",
                                      top: 0,
                                      backgroundColor: "#fff",
                                      zIndex: 1,
                                    }}
                                  >
                                    তারিখ
                                  </th>

                                  <th
                                    style={{
                                      color: "#323232",
                                      position: "sticky",
                                      width: "20%",
                                      top: 0,
                                      backgroundColor: "#fff",
                                    }}
                                  >
                                    প্রবেশ
                                  </th>
                                  <th
                                    style={{
                                      color: "#323232",
                                      position: "sticky",
                                      width: "60%",
                                      top: 0,
                                      backgroundColor: "#fff",
                                    }}
                                  >
                                    অবস্থান
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
                                {attendenceData?.map((item, index) => (
                                  <tr key={index} style={{ cursor: "pointer" }}>
                                    <td style={{ color: "#6C6C6C" }}>
                                      {getDateFromISOString(item.date)}
                                    </td>
                                    <td style={{ color: "#6C6C6C" }}>
                                      {item.in_time}
                                    </td>
                                    <td style={{ color: "#6C6C6C" }}>
                                      {item.location}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div
                              style={{
                                textAlign: "center",
                                padding: "20px",
                                fontSize: "18px",
                                color: "#6C6C6C",
                                fontWeight: "bold",
                              }}
                            >
                              Please select a date
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === "security" && (
                  <div style={styles.tabContentPassword}>
                    {/* Form for Password Change */}
                    <form onSubmit={handleChangePassword}>
                      <div>
                        <label style={styles.label}>Old Password</label>
                        <input
                          type="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.mt}>
                        <label style={styles.label}>New Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.mt}>
                        <button type="submit" style={styles.button}>
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    backgroundColor: "#f4f4f4",
    minHeight: "90vh",
    // padding: "20px",
  },
  profileCard: {
    borderRadius: "15px",
    overflow: "hidden",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    border: "1px solid #ddd",
  },
  profileImg: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "50%",
    border: "5px solid #333",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
    marginBottom: "20px",
  },
  cardBody: {
    padding: "20px",
  },
  cardTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "20px",
  },
  tabList: {
    display: "flex",
    listStyleType: "none",
    padding: 0,
    margin: 0,
    borderBottom: "2px solid #ddd",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#333",
    transition: "background-color 0.3s",
  },
  activeTab: {
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#333",
    borderBottom: "2px solid #333",
  },
  tabContent: {
    marginTop: "20px",
    textAlign: "left",
    display: "flex",
  },
  tabContentPassword: {
    marginTop: "20px",
    textAlign: "left",
  },
  details: {
    fontSize: "1rem",
  },
  mt: {
    marginTop: "20px",
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "50%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #d3d3d3",
    marginBottom: "15px",
    outline: "none",
    fontSize: "1rem",
    backgroundColor: "#f4f4f4",
    transition: "border-color 0.3s ease",
  },

  button: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
    fontWeight: "bold",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Profile;
