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
  const [modalNotice, setModalNotice] = useState({});

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
      .map((digit) => banglaDigits[parseInt(digit)]).join("");
  };

  // Function to open the modal and set the notice data
  const handleReadMore = (notice) => {
    setModalNotice(notice);
    window.$("#noticeModal").modal("show"); // Open modal using jQuery (Bootstrap 4/5)
  };

  return (
    <div>
      <Header title={"ড্যাসবোর্ড"} />
      {/* Your other components */}

      <div className="row">
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
              <p className="mb-1 fw-bold">{lastNotice.notice_name}</p>
              <p className="text-muted small">
                {lastNotice.notice_description.length > 100
                  ? lastNotice.notice_description.slice(0, 100) + "..."
                  : lastNotice.notice_description}
              </p>
              {lastNotice.notice_description.length > 100 && (
                <button
                  className="btn btn-link p-0"
                  onClick={() => handleReadMore(lastNotice)}
                  style={{ fontSize: "13px", color: "#6366f1" }}
                >
                  Read More
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="noticeModal"
        tabIndex="-1"
        aria-labelledby="noticeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="noticeModalLabel">
                {modalNotice.notice_name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{modalNotice.notice_description}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
