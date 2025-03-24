import { useEffect, useState } from "react";
import Header from "../Components/Header";

const HomePage = () => {
  const [designationWiseTodayPresent, setDesignationWiseTodayPresent] =
    useState([]);
  const [pairedData, setPairedData] = useState([]);
  
  const [topAttendance, setTopAttendance] = useState({
    todayPresent: 0,
    todayLate: 0,
    todayEarlyLeave: 0,
    todayOnLeave: 0,
  });
  const [topRight, setTopRight] = useState({
    district: 0,
    upazila: 0,
    unit: 0,
    unionData: 0,
  });
  const [lastSubmittedWork, setLastSubmittedWork] = useState([]);
  const [lastNotice, setLastNotice] = useState({});

  const glassmorphism = {
    background: "rgba(70, 42, 42, 0.25)",
    height: "125px",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "15px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
  };

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${
          import.meta.env.REACT_APP_BASE_URL
        }/api/dashboard/get-dashboard-data`,
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

        // Set designation-wise present data
        setDesignationWiseTodayPresent(result.designationWiseTodayPresent);

        // Set top attendance data
        if (result.topAttendance && result.topAttendance.length > 0) {
          const {
            today_present,
            today_late,
            today_early_leave,
            today_on_leave,
          } = result.topAttendance[0];
          setTopAttendance({
            todayPresent: today_present,
            todayLate: today_late,
            todayEarlyLeave: today_early_leave,
            todayOnLeave: today_on_leave,
          });
        }

        // Set top-right data
        if (result.topRight && result.topRight.length > 0) {
          const { unit, unionData, upazila, district } = result.topRight[0];
          setTopRight({
            district,
            upazila,
            unit,
            unionData,
          });
        }

        // Set last submitted work
        setLastSubmittedWork(result.lastSubmittedWork);
        setLastNotice(result.lastNotice);
      } else {
        const errorResult = await response.json();
        console.error("Error fetching dashboard data:", errorResult);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const pairData = () => {
      const paired = [];
      for (let i = 0; i < designationWiseTodayPresent.length; i += 2) {
        paired.push(designationWiseTodayPresent.slice(i, i + 2));
      }
      setPairedData(paired);
    };

    pairData();
  }, [designationWiseTodayPresent]);

  const convertToBangla = (number) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
      .toString()
      .split("")
      .map((digit) => banglaDigits[parseInt(digit)])
      .join("");
  };

  console.log(lastNotice);

  return (
    <div>
      <Header title={"ড্যাসবোর্ড"} />
      <div className="row mb-4 mt-3">
        <div className="col-md-2 mb-3 ">
          <div className="card text-end p-3" style={{ height: "105px" }}>
            <h2 className="mb-0" style={{ color: "#3B3B3B" }}>
              {convertToBangla(topAttendance.todayPresent)} জন
            </h2>
            <p className="mb-0 " style={{ color: "#515151" }}>
              আজ মোট উপস্থিত
            </p>
          </div>
        </div>
        <div className="col-md-2 mb-3 ">
          <div className="card text-end p-3" style={{ height: "105px" }}>
            <h2 className="mb-0" style={{ color: "#3B3B3B" }}>
              {convertToBangla(topAttendance.todayLate)} জন
            </h2>
            <p className="mb-0 " style={{ color: "#515151" }}>
              আজ দেরীতে উপস্থিত
            </p>
          </div>
        </div>
        <div className="col-md-2 mb-3 ">
          <div className="card text-end p-3" style={{ height: "105px" }}>
            <h2 className="mb-0" style={{ color: "#3B3B3B" }}>
              {convertToBangla(topAttendance.todayEarlyLeave)} জন
            </h2>
            <p className="mb-0 " style={{ color: "#515151" }}>
              আজ অগ্রীম প্রস্থান
            </p>
          </div>
        </div>
        <div className="col-md-2 mb-3 ">
          <div className="card text-end p-3" style={{ height: "105px" }}>
            <h2 className="mb-0" style={{ color: "#3B3B3B" }}>
              {convertToBangla(topAttendance.todayOnLeave)} জন
            </h2>
            <p className="mb-0 " style={{ color: "#515151" }}>
              আজ ছুটিতে আছেন
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 card" style={{ height: "105px" }}>
            <div className="d-flex justify-content-evenly mb-3">
              <div className="d-flex">
                <p className="me-2 mb-1">জেলা</p>
                <h5 className="mb-1">{convertToBangla(topRight.district)}</h5>
              </div>
              <div className="d-flex">
                <p className="me-2 mb-1">ইউনিয়ন</p>
                <h5 className="mb-1">{convertToBangla(topRight.unionData)}</h5>
              </div>
            </div>
            <div className="d-flex justify-content-evenly">
              <div className="d-flex">
                <p className="me-2 mb-0">উপজেলা</p>
                <h5 className="mb-0">{convertToBangla(topRight.upazila)}</h5>
              </div>
              <div className="d-flex">
                <p className="me-2 mb-0">ইউনিট</p>
                <h5 className="mb-0">{convertToBangla(topRight.unit)}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 mb-3">
          <h5 className="mb-4">সর্বশেষের উপস্থিতি তালিকা</h5>
          <div
            className="p-4"
            style={{ height: "530px", backgroundColor: "white" }}
          >
            {pairedData.map((pair, rowIndex) => (
              <div className="row mb-3" key={rowIndex}>
                {pair.map((item, colIndex) => (
                  <div className="col-md-6" key={colIndex}>
                    <p className="mb-1">{item.designation_name}</p>
                    <div
                      className="progress"
                      style={{ height: "25px", backgroundColor: "#D9D9D9" }}
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${
                            (item.present_today / item.total_employees) * 100
                          }%`,
                          backgroundColor:
                            item.present_today === item.total_employees
                              ? "#4cd964"
                              : "#63E680",
                          color: "#565656",
                        }}
                        aria-valuenow={
                          (item.present_today / item.total_employees) * 100
                        }
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        {`${item.present_today
                          .toString()
                          .padStart(2, "0")}/${item.total_employees
                          .toString()
                          .padStart(2, "0")}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <h5 className="mb-4">সর্বশেষ নোটিশ</h5>
          <div
            style={{
              ...glassmorphism,
              padding: "20px",
              backgroundColor: "#fff",
            }}
          >
            <div className="mb-3 ">
              <p className="mb-1 fw-bold ">{lastNotice?.notice_name?.slice(0,50)}</p>
              <p className="text-muted small">
                {lastNotice.notice_description &&
                  lastNotice.notice_description.slice(0, 160) + "....."}
                <span
                  data-bs-toggle="modal"
                  data-bs-target="#updateModal"
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Read more
                </span>
              </p>
            </div>
          </div>
          <h5 className="mb-4 mt-4">সর্বশেষ কাজের বিবরণ</h5>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "0px 10px",
            }}
          >
            <div
              style={{
                maxHeight: "340px",
                overflowY: "auto",
                overflowX: "hidden",
                borderRadius: "20px",
              }}
            >
              {lastSubmittedWork.map((item) => (
                <div
                  key={item}
                  // className="mb-3"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <div
                    className="card-body "
                    style={{
                      border: "1px solid rgba(178, 189, 187, 0.38)",
                      padding: "15px",
                      borderRadius: "10px",
                    }}
                  >
                    <div className="d-flex align-items-start">
                      <div
                        className="d-flex justify-content-center align-items-center me-3"
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          backgroundColor: "#f0f1ff",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="#6366f1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <div className="d-flex align-items-center">
                            <span
                              className="fw-medium"
                              style={{ fontSize: "15px", color: "#333" }}
                            >
                              {item.name}
                            </span>
                            <span className="mx-2 text-muted">•</span>
                            <span
                              className="text-muted"
                              style={{ fontSize: "14px" }}
                            >
                              {item.work_type}
                            </span>
                          </div>
                          {/* <span className="text-muted" style={{ fontSize: "14px" }}>
                      {new Date(item.date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span> */}
                        </div>

                        {/* Display tags dynamically from upazila, unionName, and unit */}
                        <div className="d-flex gap-2 mt-2">
                          {item.upazila && (
                            <span
                              className="px-3 py-1"
                              style={{
                                backgroundColor: "#e6e1ff", // You can customize this color
                                color: "#6f42c1", // You can customize this text color
                                borderRadius: "20px",
                                fontSize: "13px",
                                fontWeight: "500",
                              }}
                            >
                              {item.upazila}
                            </span>
                          )}
                          {item.unionName && (
                            <span
                              className="px-3 py-1"
                              style={{
                                backgroundColor: "#d7f8e8", // You can customize this color
                                color: "#20c997", // You can customize this text color
                                borderRadius: "20px",
                                fontSize: "13px",
                                fontWeight: "500",
                              }}
                            >
                              {item.unionName}
                            </span>
                          )}
                          {item.unit && (
                            <span
                              className="px-3 py-1"
                              style={{
                                backgroundColor: "#ffe9d9", // You can customize this color
                                color: "#fd7e14", // You can customize this text color
                                borderRadius: "20px",
                                fontSize: "13px",
                                fontWeight: "500",
                              }}
                            >
                              {item.unit}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* update modal */}
      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        aria-labelledby="updateModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          style={{
            width: "50%",
            height: "70%",
            maxHeight: "90vh",
            maxWidth: "70vw",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="modal-content" style={{ padding: "30px" }}>
            <div className="modal-header">
              <h5
                className="modal-title"
                id="updateModalLabel"
                style={{ fontSize: "25px" }}
              >
                সর্বশেষ নোটিশ
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div
              className="modal-body"
              style={{
                maxHeight: "60vh",
                overflowY: "auto",
              }}
            >
              {/* <label>নোটিশের নাম</label> */}
              <p style={{ fontWeight: "600" }}>{lastNotice.notice_name}</p>
              <label>নোটিশ: </label>
              <p>{lastNotice.notice_description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
