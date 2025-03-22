import { useEffect, useState } from "react";
import Header from "../Components/Header";

const HomePage = () => {
  const [designationWiseTodayPresent, setDesignationWiseTodayPresent] = useState([]);
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
        `${import.meta.env.REACT_APP_BASE_URL}/api/dashboard/get-dashboard-data`,
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
          const { today_present, today_late, today_early_leave, today_on_leave } = result.topAttendance[0];
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
          <div className="p-4" style={{ height: "530px", backgroundColor: "white" }}>
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
                          width: `${(item.present_today / item.total_employees) * 100}%`,
                          backgroundColor: item.present_today === item.total_employees ? "#4cd964" : "#63E680",
                          color: "#565656",
                        }}
                        aria-valuenow={(item.present_today / item.total_employees) * 100}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        {`${item.present_today.toString().padStart(2, '0')}/${item.total_employees.toString().padStart(2, '0')}`}
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
          <div style={{ ...glassmorphism, padding: "20px", backgroundColor: "#fff" }}>
            <div className="mb-3 ">
              <p className="mb-1 fw-bold">পরিচালক</p>
              <p className="text-muted small">
                সকল কর্মকর্তা-কর্মচারীদের অবগতির জন্য জানানো যাচ্ছে যে, পরিবার
                পরিকল্পনা সম্পর্কিত যে সেবা বিষয়ে পরামর্শের জন্য নিকটস্থ
                স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন
              </p>
            </div>
          </div>
          <h5 className="mb-4 mt-4">সর্বশেষ কাজের বিবরণ</h5>
          <div style={{ backgroundColor: "white" }}>
            <div
              style={{
                maxHeight: "340px",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="mb-3"
                  style={{
                    background: "rgba(255, 255, 255, 0.3)",
                    borderRadius: "10px",
                    padding: "15px",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <div className="d-flex align-items-center mb-2">
                    <div className="me-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="mb-0">ফারহানা খানম - স্টাফ পরিবর্তন</p>
                      <p className="text-muted mb-0">০৮:৩৫</p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <span
                      className="badge me-2"
                      style={{ backgroundColor: "rgba(13, 110, 253, 0.7)" }}
                    >
                      এপ্রুভড
                    </span>
                    <span
                      className="badge me-2"
                      style={{ backgroundColor: "rgba(13, 202, 240, 0.7)" }}
                    >
                      নিউ
                    </span>
                    <span
                      className="badge"
                      style={{ backgroundColor: "rgba(255, 193, 7, 0.7)" }}
                    >
                      রিজেক্টেড
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
